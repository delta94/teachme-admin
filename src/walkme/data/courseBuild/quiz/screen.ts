import {
  WalkMeDataQuizScreen,
  QuizScreen,
  QUIZ_ITEM_TYPES,
  DISPLAYER_ID,
  QUIZ_TEMPLATE_IDS,
  QUIZ_COMPONENTS_IDS,
} from '@walkme/types';
import defaults from '../defaults';

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
    default:
      throw new Error(`Unknown quiz screen type ${type}`);
  }
}

export class BuildQuizScreen implements QuizScreen {
  public title: string;
  public description: string;
  public buttons: Array<{ text: string; id: string }>;

  constructor(private _screen: WalkMeDataQuizScreen) {
    this.title = _screen.Title;
    this.description = _screen.Description;
    this.buttons = [{ text: _screen.ButtonText, id: `${_screen.Type}-0` }];
  }

  toDataModel = () => toDataModel(this, this._screen);

  isValid = () => !!this.title && !!this.buttons[0].text;
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
