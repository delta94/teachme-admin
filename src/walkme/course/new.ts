import { getGuid } from '../guid';
import {
  GroupType,
  WalkMeDataQuizQuestion,
  WalkMeDataQuizAnswer,
  WalkMeDataQuizScreen,
  DISPLAYER_ID,
  QUIZ_ITEM_TYPES,
  QUIZ_COMPONENTS_IDS,
  QUIZ_TEMPLATE_IDS,
  WalkMeDataQuiz,
  WalkMeDataQuizSettings,
  BooleanStringOption,
  WalkMeDataNewLesson,
  TypeId,
  WalkMeDataNewCourse,
} from '@walkme/types';
import defaults from './defaults';

export function getNewCourse(index: number): WalkMeDataNewCourse {
  return {
    Id: -1,
    Name: defaults.COURSE_NAME,
    OrderIndex: index,
    PublishStatus: 0,
    IsModified: false,
    Settings: {},
    LinkedDeployables: [],
    GroupType: GroupType.Course,
    Quiz: getNewQuiz(),
    Guid: getGuid(),
    ResourceId: getGuid(),
    deployableType: TypeId.Course,
  };
}

export function getNewLesson(index: number): WalkMeDataNewLesson {
  return {
    GroupType: GroupType.Lesson,
    Guid: null,
    Id: -index - 1,
    IsModified: true,
    LinkedDeployables: [],
    Name: `Lesson ${index}`,
    OrderIndex: index,
    PublishStatus: 0,
    ResourceId: getGuid(),
    Settings: {},
    deployableType: TypeId.Lesson,
    Description: '',
  };
}

export function getNewQuestion(index: number): WalkMeDataQuizQuestion {
  return {
    Id: -index - 1,
    Question: defaults.QUESTION_TEXT,
    Description: defaults.QUESTION_DESCRIPTION,
    Answers: [
      getNewAnswer(defaults.CORRECT_ANSWER_TEXT, true, 0),
      getNewAnswer(defaults.INCORRECT_ANSWER_TEXT, false, 1),
    ],
    QuestionType: defaults.QUESTION_TYPE,
    OrderIndex: index,
  };
}

function getNewAnswer(Text: string, IsCorrect: boolean, OrderIndex: number): WalkMeDataQuizAnswer {
  return {
    Id: -1,
    Text,
    IsCorrect,
    OrderIndex,
  };
}

function getNewQuiz(): WalkMeDataQuiz {
  return {
    IsEnabled: defaults.QUIZ_IS_ENABLED,
    Passmark: defaults.QUIZ_PASSMARK,
    Questions: [],
    FailSummeryPage: getQuizFailScreen(),
    SuccessSummeryPage: getQuizSuccessScreen(),
    WelcomePage: getQuizWelcomeScreen(),
    Settings: getQuizSettings(),
    UITemplateId: QUIZ_TEMPLATE_IDS.Quiz,
    DisplayerId: DISPLAYER_ID.POPUP_DISPLAYER_ID,
    UiComponentId: QUIZ_COMPONENTS_IDS.Quiz,
    UiComponentVersion: 1,
    UITemplateVersion: 1,
  };
}

function getQuizSettings(): WalkMeDataQuizSettings {
  return { overlay: {}, position: 8, isQuizResults: BooleanStringOption.TRUE };
}

function getQuizWelcomeScreen(): WalkMeDataQuizScreen {
  return getQuizScreen(
    defaults.QUIZ_WELCOME_SCREEN_BUTTON_TEXT,
    defaults.QUIZ_WELCOME_SCREEN_DESCRIPTION,
    defaults.QUIZ_WELCOME_SCREEN_TITLE,
    DISPLAYER_ID.POPUP_DISPLAYER_ID,
    QUIZ_ITEM_TYPES.WelcomePage,
    QUIZ_TEMPLATE_IDS.WelcomePage,
    QUIZ_COMPONENTS_IDS.QuizAnnouncement,
  );
}

function getQuizSuccessScreen(): WalkMeDataQuizScreen {
  return getQuizScreen(
    defaults.QUIZ_SUCCESS_SCREEN_BUTTON_TEXT,
    defaults.QUIZ_SUCCESS_SCREEN_DESCRIPTION,
    defaults.QUIZ_SUCCESS_SCREEN_TITLE,
    DISPLAYER_ID.POPUP_DISPLAYER_ID,
    QUIZ_ITEM_TYPES.SuccessSummeryPage,
    QUIZ_TEMPLATE_IDS.SuccessSummeryPage,
    QUIZ_COMPONENTS_IDS.QuizAnnouncement,
  );
}

function getQuizFailScreen(): WalkMeDataQuizScreen {
  return getQuizScreen(
    defaults.QUIZ_FAIL_SCREEN_BUTTON_TEXT,
    defaults.QUIZ_FAIL_SCREEN_DESCRIPTION,
    defaults.QUIZ_FAIL_SCREEN_TITLE,
    DISPLAYER_ID.POPUP_DISPLAYER_ID,
    QUIZ_ITEM_TYPES.FailSummeryPage,
    QUIZ_TEMPLATE_IDS.FailSummeryPage,
    QUIZ_COMPONENTS_IDS.QuizAnnouncement,
  );
}

function getQuizScreen(
  ButtonText: string,
  Description: string,
  Title: string,
  DisplayerId: DISPLAYER_ID,
  Type: QUIZ_ITEM_TYPES,
  UITemplateId: QUIZ_TEMPLATE_IDS,
  UiComponentId: QUIZ_COMPONENTS_IDS,
): WalkMeDataQuizScreen {
  return {
    ButtonText,
    Description,
    Title,
    DisplayerId,
    Type,
    UITemplateId,
    UiComponentId,
    UITemplateVersion: 1,
    UiComponentVersion: 1,
  };
}
