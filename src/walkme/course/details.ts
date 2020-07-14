import {
  WalkMeDataCourse,
  Course,
  CourseItem,
  WalkMeDataQuiz,
  Quiz,
  BuildCourse,
  TypeName,
  QuizScreen,
  WalkMeDataQuizScreen,
  TypeId,
  BooleanStringOption,
  WalkMeDataQuizQuestion,
  QuizQuestion,
  WalkMeDataQuizSettings,
  BuildQuizQuestionSettings,
  WalkMeDataQuizQuestionSettings,
  BuildQuizQuestion,
  WalkMeDataQuizAnswer,
  QuizAnswer,
} from '@walkme/types';
import { getData } from '../data';
import { mapItem } from '../item';

export async function getCourseData(
  id: number,
  environmentId: number,
): Promise<BuildCourse | null> {
  const [course] = (await getData(TypeName.Course, environmentId, [id])) as Array<WalkMeDataCourse>;
  if (!course) return null;
  return mapToFullCourse(course, environmentId);
}

function getQuizScreen(screen: WalkMeDataQuizScreen): QuizScreen {
  return {
    title: screen.Title,
    description: screen.Description,
    buttons: [{ text: screen.ButtonText, id: `${screen.Type}-0` }],
  };
}

function getQuestionSettings(
  settings?: WalkMeDataQuizQuestionSettings,
): BuildQuizQuestionSettings | undefined {
  if (!settings) return;
  return {
    hasExplanation: settings.hasExplanation == BooleanStringOption.TRUE,
  };
}
function getAnswers(answersData: Array<WalkMeDataQuizAnswer>): Array<QuizAnswer> {
  return answersData.map(createAnswer);
}
function createAnswer(answersData: WalkMeDataQuizAnswer): QuizAnswer {
  return {
    id: answersData.Id,
    isCorrect: answersData.IsCorrect,
    text: answersData.Text,
  };
}
function getQuestion(question: WalkMeDataQuizQuestion): BuildQuizQuestion {
  return {
    id: question.Id,
    answers: getAnswers(question.Answers),
    description: question.Description,
    title: question.Question,
    type: question.QuestionType,
    explanation: question.Explanation,
    properties: getQuestionSettings(question.Settings),
  };
}

export async function mapToFullCourse(
  course: WalkMeDataCourse,
  environmentId: number,
): Promise<BuildCourse> {
  const courseItem = await mapItem(course, TypeName.Course, environmentId);
  return {
    id: courseItem.id as number,
    title: courseItem.title,
    items: courseItem.childNodes as CourseItem[],
    quiz: {
      welcomeScreen: getQuizScreen(course.Quiz.WelcomePage),
      failScreen: getQuizScreen(course.Quiz.FailSummeryPage),
      successScreen: getQuizScreen(course.Quiz.SuccessSummeryPage),
      id: course.Quiz.Id,
      properties: {
        forceCourseCompletion: course.Quiz.Settings.isLimited == BooleanStringOption.TRUE,
        passmark: course.Quiz.Passmark,
        randQuestions: course.Quiz.Settings.randQuestions == BooleanStringOption.TRUE,
        randAnswers: course.Quiz.Settings.randAnswers == BooleanStringOption.TRUE,
        showSummary: course.Quiz.Settings.isQuizResults == BooleanStringOption.TRUE,
      },
      questions: course.Quiz.Questions.map(getQuestion),
    },
    properties: {
      enableIfPreviousDone: course.Settings.onlyPreviousDone == BooleanStringOption.TRUE,
      enforceOrder: course.Settings.enforceOrder == BooleanStringOption.TRUE,
    },
  };
}
