import {
  ADD_VALUE,
  IS_LOADING,
  SET_RTL,
  SUB_VALUE,
  GET_LANG,
  SET_INTRO_SCREEN,
  SET_MODE,
  GET_MODE,
  SET_THEME,
  SET_SLIDER_VALUE,
  SET_BORDER_RADIUS_VALUE,
  SET_CARD_STYLE,
  SET_HOME_STYLE
} from '../actions/actions';
import { ConfigAction, appColorsType, fontSizeType } from '../types/types';
import { arLang, engLang } from '../../components/gLJson';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appFontSize, config, darkTheme, lightTheme } from '../../components/config';

type initialStateProp = {
  counter: number;
  isloading: boolean;
  lang: object;
  rtl: boolean;
  showIntroScreen: boolean;
  isDarkMode: boolean;
  theme: appColorsType;
  darkTheme: appColorsType;
  lightTheme: appColorsType;
  appFontSize: fontSizeType;
  sliderInitialValue: number;
  borderRadius: number;
  cardStyle: number,
  homeStyle: number
};

const initialState: initialStateProp = {
  counter: 2,
  isloading: true,
  lang: engLang,
  rtl: false,
  showIntroScreen: true,
  isDarkMode: config.isDarkMode,
  theme: config.isDarkMode ? darkTheme : lightTheme,
  darkTheme: darkTheme,
  lightTheme: lightTheme,
  appFontSize: appFontSize,
  sliderInitialValue: 0,
  borderRadius: config.borderRadius,
  cardStyle: config.cardStyle,
  homeStyle: config.homeStyle
};

function configReducer(state = initialState, action: ConfigAction) {
  switch (action.type) {
    case ADD_VALUE:
      state.counter = state.counter + action.counter;
      return { ...state };
    case SUB_VALUE:
      state.counter = state.counter - action.counter;
      return { ...state };

    case IS_LOADING:
      state.isloading = action.isloading;
      return { ...state };

    case SET_CARD_STYLE:
      state.cardStyle = action.payload;
      return { ...state };

    case SET_HOME_STYLE:
      state.homeStyle = action.payload;
      return { ...state };

    case SET_RTL:
      state.rtl = action.rtl;
      if (state.rtl) {
        state.lang = arLang;
      } else {
        state.lang = engLang;
      }
      return { ...state };

    case GET_LANG:
      if (state.rtl) {
        state.lang = arLang;
      } else {
        state.lang = engLang;
      }
      return { ...state };

    case SET_MODE:
      state.isDarkMode = action.isDarkMode;
      state.darkTheme = state.darkTheme;
      state.lightTheme = state.lightTheme;

      if (state.isDarkMode) {
        state.theme = state.darkTheme;
      } else {
        state.theme = state.lightTheme;
      }
      return { ...state };
    case GET_MODE:
      if (state.isDarkMode) {
        state.theme = state.darkTheme;
      } else {
        state.theme = state.lightTheme;
      }
      return { ...state };

    //
    case SET_THEME:
      state.darkTheme = action.darkTheme;
      state.lightTheme = action.lightTheme;
      if (state.isDarkMode) {
        state.theme = action.darkTheme;
      } else {
        state.theme = action.lightTheme;
      }
      return { ...state };
    case SET_SLIDER_VALUE:
      state.sliderInitialValue = action.sliderInitialValue;
      return { ...state };

    case SET_BORDER_RADIUS_VALUE:
      state.borderRadius = action.borderInitialValue;
      return { ...state };

    case SET_INTRO_SCREEN:
      state.showIntroScreen = action.value;
      return { ...state };

    default:
      return state;
  }
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['counter', 'rtl', 'isDarkMode', 'showIntroScreen',
    'theme',
    'darkTheme',
    'lightTheme',
    'sliderInitialValue', 'borderRadius', 'cardStyle',
    'homeStyle'], // will be persisted
};
export default persistReducer(persistConfig, configReducer);
