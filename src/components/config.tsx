import {Dimensions} from 'react-native';
import {appColorsType, fontSizeType, configType} from '../redux/types/types';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const HEADER_ANDROID_HEIGHT = Dimensions.get('window').height * 0.07;
const HEADER_IOS_HEIGHT = Dimensions.get('window').height * 0.097;
////
const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number) => width / guidelineBaseWidth * size;
const verticalScale = (size: number) => height / guidelineBaseHeight * size;
const moderateScale = (size: number, factor = 0.5) => size + ( scale(size) - size ) * factor;
////////////////////////////////////
const config: configType = {
  isDarkMode: false,
  borderRadius: 10,
  cardStyle: 1,
  homeStyle: 1
};

const appFontSize: fontSizeType = {
  smallSize: moderateScale(11),
  mediumSize: moderateScale(13),
  largeSize: moderateScale(15),
  fontFamily: 'arial',
};
const lightTheme: appColorsType = {
  StatusBarColor: '#F4F4F4',
  barStyle:'dark-content', // dark-content, default
  primaryDark: '#953e22',
  primary: '#d65a31',
  primaryLight: '#de7b5a',
  secondry: '#959595',
  primaryBackgroundColor: '#F4F4F4', //2b2024
  secondryBackgroundColor: '#E8E8E8', //full black
  backgroundImageColor: '#dcdcdc',
  // primaryBackgroundColor: '#E8E8E8', //2b2024
  // secondryBackgroundColor: '#F4F4F4',
  textColor: '#000000',
  secondryTextColor: '#ffffff',
  primaryTextColor: '#ffffff',
  appFontSize: appFontSize,
};
const darkTheme: appColorsType = {
  StatusBarColor: '#282828',
  barStyle: 'light-content', // dark-content, default
  primaryDark: '#953e22',
  primary: '#d65a31',
  primaryLight: '#de7b5a',
  secondry: '#878787',
  // secondry:'#959595',
  primaryBackgroundColor: '#282828', //
  secondryBackgroundColor: '#141414', // white
  backgroundImageColor: '#dcdcdc',
  // primaryBackgroundColor: '#141414', //
  // secondryBackgroundColor: '#282828',
  // textColor: '#878787',
  textColor: '#ffffff',
  primaryTextColor: '#ffffff',
  secondryTextColor: '#000000',
  appFontSize: appFontSize,
};

export {
  lightTheme,
  darkTheme,
  appFontSize,
  config,
  WIDTH,
  HEIGHT,
  HEADER_IOS_HEIGHT,
  HEADER_ANDROID_HEIGHT,
};
