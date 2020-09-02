import { WalkMeDataQuizAnswer, QuizAnswer, NewAnswerData } from '@walkme/types';
import { Container } from '../../itemsContainer';
import defaults from '../../defaults';

export function toUIModel(answersData: Array<WalkMeDataQuizAnswer>): Array<QuizAnswer> {
  return answersData.map((answersData) => ({
    id: answersData.Id,
    isCorrect: answersData.IsCorrect,
    text: answersData.Text,
  }));
}

export function toDataModel(
  answers: Array<QuizAnswer>,
  dataAnswers: Array<WalkMeDataQuizAnswer>,
): Array<WalkMeDataQuizAnswer> {
  return answers.map<WalkMeDataQuizAnswer>(
    (answer, index): WalkMeDataQuizAnswer => ({
      Id: answer.id > 0 ? -(index + 1) : answer.id,
      IsCorrect: answer.isCorrect,
      OrderIndex: index,
      Text: answer.text,
    }),
  );
}

export function newDataModel(OrderIndex: number, data?: NewAnswerData): WalkMeDataQuizAnswer {
  return {
    Id: -1 - OrderIndex,
    Text: data?.text ?? defaults.NEW_ANSWER_TEXT,
    IsCorrect: data?.isCorrect ?? defaults.NEW_ANSWER_IS_CORRECT,
    OrderIndex,
  };
}

export const getQuizAnswers = (answersData: Array<WalkMeDataQuizAnswer>) =>
  new Container<BuildQuizAnswer, NewAnswerData, WalkMeDataQuizAnswer>(
    answersData,
    (data) => new BuildQuizAnswer(data),
    newDataModel,
  );

export class BuildQuizAnswer implements QuizAnswer {
  public id: number;
  public isCorrect: boolean;
  public text: string;

  constructor(private _answer: WalkMeDataQuizAnswer) {
    this.id = _answer.Id;
    this.isCorrect = _answer.IsCorrect;
    this.text = _answer.Text;
  }

  public toDataModel(index: number): WalkMeDataQuizAnswer {
    return {
        Id: this.id > 0 ? -(index + 1) : this.id,
        IsCorrect: this.isCorrect,
        OrderIndex: index,
        Text: this.text,
    };
  }

  isValid(): boolean {
    return !!this.text;
  }
}
