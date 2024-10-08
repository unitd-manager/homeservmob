import { appColorsType } from "../types/types";

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const ADD_VALUE = 'ADD_VALUE';
export const SUB_VALUE = 'SUB_VALUE';

export const IS_LOADING = 'IS_LOADING';
export const SET_RTL = 'SET_RTL';
export const GET_LANG = 'GET_LANG';
export const SET_INTRO_SCREEN = 'SET_INTRO_SCREEN';
export const SET_MODE = 'SET_MODE';
export const GET_MODE = 'GET_MODE';
export const SET_THEME = 'SET_THEME';
export const SET_SLIDER_VALUE = 'SET_SLIDER_VALUE';
export const SET_BORDER_RADIUS_VALUE = 'SET_BORDER_RADIUS_VALUE';
export const SET_CARD_STYLE = 'SET_CARD_STYLE';
export const SET_HOME_STYLE = 'SET_HOME_STYLE';

export const ADD_SEARCH_VALUE = 'ADD_SEARCH_VALUE';
export const EMPTY_SEARCH_LIST = 'EMPTY_SEARCH_LIST';

export function addSearchValue(value: string) {
  return {
    type: ADD_SEARCH_VALUE,
    value: value,
  };
}

export function emptySearchList() {
  return {
    type: EMPTY_SEARCH_LIST,
  };
}


export function getModeValue() {
  return {
    type: GET_MODE,
  };
}

export function setThemeColor(lightTheme: appColorsType, darkTheme: appColorsType) {
  return {
    type: SET_THEME,
    lightTheme,
    darkTheme,
  };
}

export function setModeValue(value: boolean) {
  return {
    type: SET_MODE,
    isDarkMode: value,
  };
}

export function setBorderRadusValue(value: number) {
  return {
    type: SET_BORDER_RADIUS_VALUE,
    borderInitialValue: value,
  };
}

export function setCardStyleValue(value: number) {
  return {
    type: SET_CARD_STYLE,
    payload: value,
  };
}

export function setHomeStyleValue(value: number) {
  return {
    type: SET_HOME_STYLE,
    payload: value,
  };
}

export function setSliderValue(value: number) {
  return {
    type: SET_SLIDER_VALUE,
    sliderInitialValue: value,
  };
}

export function setIntroScreen(value: boolean) {
  return {
    type: SET_INTRO_SCREEN,
    value: value,
  };
}

export function getRtl() {
  return {
    type: GET_LANG,
  };
}

export function setRtl(rtl: boolean) {
  return {
    type: SET_RTL,
    rtl: rtl,
  };
}

export function isLoading(isloading: boolean) {
  return {
    type: IS_LOADING,
    isloading: !isloading,
  };
}

export function increment(counter: number) {
  return {
    type: ADD_VALUE,
    counter,
  };
}

export function decrement(counter: number) {
  return {
    type: SUB_VALUE,
    counter,
  };
}