
export type fontSizeType = {
  smallSize: number;
  mediumSize: number;
  largeSize: number;
  fontFamily: string;
};

export type appColorsType = {
  StatusBarColor: string;
  barStyle: any; // dark-content, default
  primaryDark: string;
  primary: string;
  primaryLight: string;
  backgroundImageColor: string;
  secondry: string;
  primaryBackgroundColor: string;
  secondryBackgroundColor: string;
  textColor: string;
  secondryTextColor: string;
  primaryTextColor: string;
  appFontSize: fontSizeType;
};



export type configType = {
  isDarkMode: boolean;
  borderRadius: number;
  cardStyle: number;
  homeStyle: number;
};


export type AddNumber = {
  type: string;
  counter: number;
};
export type SubNumber = {
  type: string;
  counter: number;
};
export type searchList = {
  type: string;
  value: string;
  counter: number;
};
export type ConfigAction = {
  type: string;
  counter: number;
  isloading: boolean;
  lang: object;
  rtl: boolean;
  value: boolean;
  isDarkMode: boolean;
  lightTheme: appColorsType,
  darkTheme: appColorsType,
  sliderInitialValue: number,
  borderInitialValue: number;
  payload: number;
};


export type ListAction = AddNumber | SubNumber | ConfigAction | searchList;
