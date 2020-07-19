import { WalkMeDataQuizScreen, QuizScreen, QUIZ_ITEM_TYPES } from '@walkme/types';

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

export function newDataModel(type: QUIZ_ITEM_TYPES): WalkMeDataQuizScreen {
  switch (type) {
    case QUIZ_ITEM_TYPES.FailSummeryPage:
      return getQuizFailScreen();
    case QUIZ_ITEM_TYPES.SuccessSummeryPage:
      return getQuizSuccessScreen();
    case QUIZ_ITEM_TYPES.WelcomePage:
      return getQuizWelcomeScreen();
  }
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
