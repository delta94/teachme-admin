import { WalkMeDataQuizScreen, QuizScreen } from '@walkme/types';

export function toUIModel(screen: WalkMeDataQuizScreen): QuizScreen {
  return {
    title: screen.Title,
    description: screen.Description,
    buttons: [{ text: screen.ButtonText, id: `${screen.Type}-0` }],
  };
}

export function toDataModel(
  screen: QuizScreen,
  dataScreen: WalkMeDataQuizScreen,
): WalkMeDataQuizScreen {
  return {
    ...dataScreen,
    ButtonText: screen.buttons[0].text,
    Description: screen.description,
    Title: screen.title,
  };
}
