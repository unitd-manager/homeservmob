import React, { useLayoutEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  I18nManager
} from 'react-native';
import Slider from '@react-native-community/slider';
import { connect } from 'react-redux';
import PopUpModal from '../components/popupModal';
import CustomBtn from '../components/customBtn';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RNRestart from 'react-native-restart'; // Import package from node modules

import {
  setThemeColor, setModeValue,
  setSliderValue,
  setBorderRadusValue,
  setCardStyleValue,
  setHomeStyleValue,
  setRtl
} from '../redux/actions/actions';
import { StackNavigationProp } from '@react-navigation/stack';
import { appColorsType, fontSizeType } from '../redux/types/types';
import { appFontSize, darkTheme, lightTheme, WIDTH, HEADER_IOS_HEIGHT, HEADER_ANDROID_HEIGHT } from '../components/config';
type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
};
interface IProps {
  navigation: StackNavigationProp<RootStackParamList>;
  theme: appColorsType;
  setRtl(value: boolean): void;
  rtl: boolean;
  reduxLang: any;
  isDarkMode: boolean;
  setModeValue(value: boolean): void;
  setThemeColor: (arg0: appColorsType, arg1: appColorsType) => void;
  sliderInitialValue: number;
  setSlider: (value: number) => void;
  setBorderRadus: (value: number) => void;
  borderRadiusValue: number;
  cardStyleValue: number;
  setCardStyle: (value: number) => void;
  homeStyleValue: number;
  setHomeStyle: (value: number) => void;
}

const colorsArr = [
  { primary: '#3498db', primaryDark: '#246a99', primaryLight: '#5cace2', backgroundImageColor: '#dcdcdc', lightTextColor: '#000000', darkTextColor: '#ffffff', primaryTextColor: '#ffffff' },
  { primary: '#FFB757', primaryDark: '#b2803c', primaryLight: '#ffc578', backgroundImageColor: '#dcdcdc', lightTextColor: '#000000', darkTextColor: '#ffffff', primaryTextColor: '#000000' },
  { primary: '#344955', primaryDark: '#F9AA33', primaryLight: '#4A6572', backgroundImageColor: '#dcdcdc', lightTextColor: '#000000', darkTextColor: '#ffffff', primaryTextColor: '#ffffff' },
  { primary: '#F15A24', primaryDark: '#a83e19', primaryLight: '#f37b4f', backgroundImageColor: '#dcdcdc', lightTextColor: '#000000', darkTextColor: '#ffffff', primaryTextColor: '#ffffff' },
  { primary: '#6200EE', primaryDark: '#4400a6', primaryLight: '#8133f1', backgroundImageColor: '#dcdcdc', lightTextColor: '#000000', darkTextColor: '#ffffff', primaryTextColor: '#ffffff' },

  { primary: '#3E87E7', primaryDark: '#2b5ea1', primaryLight: '#649feb', backgroundImageColor: '#dcdcdc', lightTextColor: '#000000', darkTextColor: '#ffffff', primaryTextColor: '#ffffff' },
  { primary: '#d65a31', primaryDark: '#953e22', primaryLight: '#de7b5a', backgroundImageColor: '#dcdcdc', lightTextColor: '#000000', darkTextColor: '#ffffff', primaryTextColor: '#ffffff' },

  { primary: '#E85C9E', primaryDark: '#a2406e', primaryLight: '#ec7cb1', backgroundImageColor: '#dcdcdc', lightTextColor: '#000000', darkTextColor: '#ffffff', primaryTextColor: '#ffffff' },

  { primary: '#004FBD', primaryDark: '#003784', primaryLight: '#3372ca', backgroundImageColor: '#dcdcdc', lightTextColor: '#000000', darkTextColor: '#ffffff', primaryTextColor: '#ffffff' },
  { primary: '#F6BB45', primaryDark: '#ac8230', primaryLight: '#f7c86a', backgroundImageColor: '#dcdcdc', lightTextColor: '#000000', darkTextColor: '#ffffff', primaryTextColor: '#ffffff' },
  { primary: '#186CDA', primaryDark: '#104b98', primaryLight: '#4689e1', backgroundImageColor: '#dcdcdc', lightTextColor: '#000000', darkTextColor: '#ffffff', primaryTextColor: '#ffffff' },
  { primary: '#BF69EA', primaryDark: '#8549a3', primaryLight: '#cb87ee', backgroundImageColor: '#dcdcdc', lightTextColor: '#000000', darkTextColor: '#ffffff', primaryTextColor: '#ffffff' },
  { primary: '#5D1049', primaryDark: '#E30425', primaryLight: '#720D5D', backgroundImageColor: '#dcdcdc', lightTextColor: '#000000', darkTextColor: '#ffffff', primaryTextColor: '#ffffff' },
  { primary: '#ff8a80', primaryDark: '#b26059', primaryLight: '#ffa199', backgroundImageColor: '#dcdcdc', lightTextColor: '#000000', darkTextColor: '#ffffff', primaryTextColor: '#000000' },
  { primary: '#b22222', primaryDark: '#7c1717', primaryLight: '#c14e4e', backgroundImageColor: '#dcdcdc', lightTextColor: '#000000', darkTextColor: '#ffffff', primaryTextColor: '#ffffff' },
  { primary: '#8b0000', primaryDark: '#610000', primaryLight: '#a23333', backgroundImageColor: '#dcdcdc', lightTextColor: '#000000', darkTextColor: '#ffffff', primaryTextColor: '#ffffff' },
]
const changeBorderRadius = (
  borderRadius: number,
  setBorderRadus: (value: number) => void) => {
  setBorderRadus(borderRadius)
};
const changeFontFun = (sliderInitialValue: number, small: number, medium: number,
  large: number, family: string,
  setThemeColor: (arg0: appColorsType, arg1: appColorsType,) => void,
  setSlider: (value: number) => void,theme: appColorsType) => {

  let appFontSize: fontSizeType = {
    smallSize: small,
    mediumSize: medium,
    largeSize: large,
    fontFamily: family,
  };
  let lightThemeTemp: appColorsType = {
    StatusBarColor: lightTheme.StatusBarColor,
    barStyle: lightTheme.barStyle, // dark-content, default
    primaryDark: theme.primaryDark,
    primaryLight: theme.primaryLight,
    primary: theme.primary,
    secondry: theme.secondry,
    backgroundImageColor: theme.backgroundImageColor,
    primaryBackgroundColor: lightTheme.primaryBackgroundColor, //2b2024
    secondryBackgroundColor: lightTheme.secondryBackgroundColor, //full black
    textColor: theme.textColor,
    secondryTextColor: lightTheme.secondryTextColor,
    primaryTextColor: theme.primaryTextColor,
    appFontSize: appFontSize
  };


  let darkThemeTemp: appColorsType = {
    StatusBarColor: darkTheme.StatusBarColor,
    barStyle: darkTheme.barStyle, // dark-content, default
    primaryDark: theme.primaryDark,
    primary: theme.primary,
    primaryLight: theme.primaryLight,
    secondry: theme.secondry,
    backgroundImageColor: theme.backgroundImageColor,
    primaryBackgroundColor: darkTheme.primaryBackgroundColor, //2b2024
    secondryBackgroundColor: darkTheme.secondryBackgroundColor, //full black
    textColor: theme.textColor,
    secondryTextColor: darkTheme.secondryTextColor,
    primaryTextColor: theme.primaryTextColor,
    appFontSize: appFontSize,
  };
  setSlider(sliderInitialValue)
  setThemeColor(lightThemeTemp, darkThemeTemp)
};

const storeData = (color: {
  primary: string, primaryLight: string, primaryDark: string, backgroundImageColor: string, lightTextColor: string,
  darkTextColor: string, primaryTextColor: string
},
  setThemeColor: (arg0: appColorsType, arg1: appColorsType) => void,
  theme: appColorsType) => {
  let lightThemeTemp: appColorsType = {
    StatusBarColor: lightTheme.StatusBarColor,
    barStyle: lightTheme.barStyle, // dark-content, default
    primaryDark: color.primaryDark,
    primary: color.primary,
    primaryLight: color.primaryLight,
    secondry: lightTheme.secondry,
    backgroundImageColor: color.backgroundImageColor,
    primaryBackgroundColor: lightTheme.primaryBackgroundColor, //2b2024
    secondryBackgroundColor: lightTheme.secondryBackgroundColor, //full black
    textColor: color.lightTextColor,
    secondryTextColor: lightTheme.secondryTextColor,
    primaryTextColor: color.primaryTextColor,
    appFontSize: theme.appFontSize
  };


  let darkThemeTemp: appColorsType = {
    StatusBarColor: darkTheme.StatusBarColor,
    barStyle: darkTheme.barStyle, // dark-content, default
    primaryDark: color.primaryDark,
    primary: color.primary,
    primaryLight: color.primaryLight,
    secondry: darkTheme.secondry,
    backgroundImageColor: color.backgroundImageColor,
    primaryBackgroundColor: darkTheme.primaryBackgroundColor, //2b2024
    secondryBackgroundColor: darkTheme.secondryBackgroundColor, //full black
    textColor: color.darkTextColor,
    secondryTextColor: darkTheme.secondryTextColor,
    primaryTextColor: color.primaryTextColor,
    appFontSize: theme.appFontSize,
  };
  setThemeColor(lightThemeTemp, darkThemeTemp)
};
const colorItemFun = (setThemeColor: (arg0: appColorsType, arg1: appColorsType) => void,
  color: { primary: string, primaryLight: string, primaryDark: string, backgroundImageColor: string, lightTextColor: string, darkTextColor: string, primaryTextColor: string }, theme: appColorsType) => (
  <TouchableOpacity
    onPress={() => {
      storeData(color, setThemeColor, theme);
    }}
    style={[styles.colorStlye, {
      backgroundColor: color.primary,
    }]}
  />
)

const oneColumnColorsFun = (setThemeColor: (arg0: appColorsType, arg1: appColorsType) => void,
  colorOne: { primary: string, primaryLight: string, primaryDark: string, backgroundImageColor: string, lightTextColor: string, darkTextColor: string, primaryTextColor: string },
  colorTwo: { primary: string, primaryLight: string, primaryDark: string, backgroundImageColor: string, lightTextColor: string, darkTextColor: string, primaryTextColor: string },
  colorThree: { primary: string, primaryLight: string, primaryDark: string, backgroundImageColor: string, lightTextColor: string, darkTextColor: string, primaryTextColor: string }
  , colorFour: { primary: string, primaryLight: string, primaryDark: string, backgroundImageColor: string, lightTextColor: string, darkTextColor: string, primaryTextColor: string }, theme: appColorsType) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: '100%',
      marginBottom: 30
    }}>
    {
      colorItemFun(setThemeColor, colorOne, theme)
    }
    {
      colorItemFun(setThemeColor, colorTwo, theme)
    }
    {
      colorItemFun(setThemeColor, colorThree, theme)
    }
    {
      colorItemFun(setThemeColor, colorFour, theme)
    }


  </View>
)

const textHeadingFun = (theme: appColorsType, reduxLang: any,
  text: string) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',

      width: '100%',
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: theme.secondryBackgroundColor,
      padding: 10
    }}>
    <Text style={{
      marginLeft: 20, fontSize: theme.appFontSize.largeSize + 3,
      color: theme.textColor, fontFamily: theme.appFontSize.fontFamily,
      fontWeight: 'bold'
    }}>{text}</Text>
  </View>
)
const CustomizeTheme = ({ navigation, theme, reduxLang,
  setThemeColor,
  setModeValue,
  setCardStyle,
  sliderInitialValue,
  setSlider, setBorderRadus, borderRadiusValue,
  cardStyleValue, homeStyleValue,
  setRtl,
  rtl,
  setHomeStyle }: IProps) => {
  // Header Settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: reduxLang.CustomizeTheme,
      headerStyle: {
        backgroundColor: theme.secondryBackgroundColor,
        shadowColor: 'transparent',
      },
      headerTintColor: theme.textColor,
    });
  }, [
    navigation,
    reduxLang.Profile,
    theme.secondryBackgroundColor,
    theme.textColor,
  ]);

  const [isFontModalVisible, setFontModalVisibles] = useState(false);
  const [isCardModalVisible, setCardModalVisibles] = useState(false);
  const [isHomeModalVisible, setHomeModalVisibles] = useState(false);
  const [isLangModalVisible, setLangModalVisibles] = useState(false);

  const [fontFamilyArray, setfontFamilyArray] = useState([
    { value: Platform.OS === 'android' ? 'Arial' : 'Arial', index: 0 },
    { value: Platform.OS === 'android' ? 'Roboto' : 'Arial Hebrew', index: 1 },
    { value: Platform.OS === 'android' ? 'monospace' : 'Avenir', index: 2 },
    { value: Platform.OS === 'android' ? 'sans-serif-light' : 'Al Nile', index: 3 },
    { value: Platform.OS === 'android' ? 'sans-serif-thin' : 'AlNile-Bold', index: 4 },
    { value: Platform.OS === 'android' ? 'sans-serif-condensed' : 'American Typewriter', index: 5 },
    { value: Platform.OS === 'android' ? 'sans-serif-medium' : 'Baskerville', index: 6 },
    { value: Platform.OS === 'android' ? 'serif' : 'Didot', index: 7 },
    { value: Platform.OS === 'android' ? 'notoserif' : 'Symbol', index: 8 },
    { value: Platform.OS === 'android' ? 'sans-serif' : 'Verdana', index: 9 },
  ]);

  const [cardStyleArray, setCardStyleArray] = useState([
    { value: 'Card One', index: 1 },
    { value: 'Card Two', index: 2 },
    { value: 'Card Three', index: 3 },
    { value: 'Card Four', index: 4 },
    { value: 'Card Five', index: 5 },
    { value: 'Card Six', index: 6 },
    { value: 'Card Seven', index: 7 },
    { value: 'Card Eight', index: 8 },
    { value: 'Card Nine', index: 9 },
    { value: 'Card Ten', index: 10 }

  ]);

  const [homeStyleArray, setHomeStyleArray] = useState([
    { value: 'Home One', index: 1 },
    { value: 'Home Two', index: 2 },
    { value: 'Home Three', index: 3 },
    { value: 'Home Four', index: 4 },
    { value: 'Home Five', index: 5 },
    { value: 'Home Six', index: 6 },
    { value: 'Home Seven', index: 7 },
    { value: 'Home Eight', index: 8 },
    { value: 'Home Nine', index: 9 },
    { value: 'Home Ten', index: 10 }
  ]);

  const [languageArray, setLanguageArray] = useState([
    { value: reduxLang.English, status: rtl ? true : false, index: 0 },
    { value: reduxLang.Arabic, status: rtl ? false : true, index: 1 },
  ]);

  const showLangModal = () => setLangModalVisibles(true);
  const hideLangModal = () => setLangModalVisibles(false);

  const showFontModal = () => setFontModalVisibles(true);
  const hideFontModal = () => setFontModalVisibles(false);

  const showCardModal = () => setCardModalVisibles(true);
  const hideCardModal = () => setCardModalVisibles(false);

  const showHomeModal = () => setHomeModalVisibles(true);
  const hideHomeModal = () => setHomeModalVisibles(false);

  function selectLanguageMode(index: number) {
    let newArr = [...languageArray];
    newArr.forEach((item) => {
      item.status = false
    })
    if (index === 0) {
      newArr[1].status = true;
      I18nManager.forceRTL(false);
      setRtl(false);
      setLanguageArray(newArr);
      hideLangModal();
      setTimeout(() => {
        RNRestart.Restart();
      }, 100);
    } else {
      newArr[0].status = true;
      I18nManager.forceRTL(true);
      setRtl(true);
      setLanguageArray(newArr);
      hideLangModal();
      setTimeout(() => {
        RNRestart.Restart();
      }, 100);
    }
    setLanguageArray(newArr);
  }

  const modalFun = (modalValue: boolean, dismissFun: () => void,
    Heading: string, arr: { value: string, index: number }[],
    funValue: string) => (
    <PopUpModal visible={modalValue} dismiss={dismissFun}>
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            {
              backgroundColor: theme.primaryBackgroundColor,
            },
          ]}>
          <Text style={[styles.modalText, {
            color: theme.primary,
            fontSize: theme.appFontSize.largeSize,
            fontFamily: theme.appFontSize.fontFamily
          }]}>
            {Heading}
          </Text>

          {arr.map((item: any) => (
            <TouchableOpacity
              key={item.index}
              onPress={() => {
                if (funValue === 'font') {
                  changeFontFun(sliderInitialValue, theme.appFontSize.smallSize,
                    theme.appFontSize.mediumSize,
                    theme.appFontSize.largeSize, item.value, setThemeColor,
                    setSlider, theme)
                } else if (funValue === 'card') {
                  setCardStyle(item.index)
                } else if (funValue === 'home')
                  setHomeStyle(item.index)
                else if (funValue === 'Lang')
                  selectLanguageMode(item.index)
              }}
              style={[
                styles.picketTouchAbleStyle,
                {
                  backgroundColor: theme.primaryBackgroundColor,
                },
              ]}>


              <View style={styles.selectedViewStyle}>
                <IoniconsIcon
                  name={
                    funValue === 'font' ?
                      theme.appFontSize.fontFamily !== item.value ? 'square-outline' : 'checkbox-outline'
                      : funValue === 'card' ?
                        cardStyleArray[cardStyleValue - 1].value !== item.value ? 'square-outline' : 'checkbox-outline'
                        : funValue === 'Lang' ?
                          languageArray[!languageArray[0].status
                            ? languageArray[0].index
                            : languageArray[1].index].index !== item.index ? 'square-outline' : 'checkbox-outline'
                          :
                          homeStyleArray[homeStyleValue - 1].index !== item.index ? 'square-outline' : 'checkbox-outline'

                  }
                  //light
                  style={{ fontSize: theme.appFontSize.largeSize + 4 }}
                  color={theme.textColor}
                />
                <Text
                  style={[
                    styles.pickerTextStyle,
                    {
                      color: theme.textColor,
                      fontSize: theme.appFontSize.mediumSize,
                      fontFamily: theme.appFontSize.fontFamily,
                    },
                  ]}>
                  {item.value}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </PopUpModal>
  )

  const selectValueFun = (heading: string, showModal: () => void
    , text: string) => (
    <View>
      {textHeadingFun(theme, reduxLang, heading)}

      <TouchableOpacity
        style={{
          width: WIDTH, flexDirection: 'row',
          alignItems: 'center', justifyContent: 'space-between',
          padding: 5,
          paddingHorizontal: 30
        }}
        onPress={() => {
          showModal()
        }}>
        <Text style={{
          fontSize: theme.appFontSize.largeSize,
          fontFamily: theme.appFontSize.fontFamily,
          color: theme.textColor, alignSelf: 'center'
        }}>
          {text}
        </Text>

        <FontAwesome
          style={
            {
              color: theme.secondry,
              fontSize: theme.appFontSize.smallSize
            }}
          name={"chevron-down"}
        />
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.primaryBackgroundColor },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainerStyle}
      >
        <StatusBar barStyle={theme.barStyle} backgroundColor={theme.StatusBarColor} />

        {modalFun(isFontModalVisible, hideFontModal,
          reduxLang.ChangeFontFamily, fontFamilyArray, 'font')}

        {modalFun(isLangModalVisible, hideLangModal,
          reduxLang.SelectLanguage, languageArray, 'Lang')}

        {modalFun(isCardModalVisible, hideCardModal,
          reduxLang.cardStyle, cardStyleArray, 'card')}

        {modalFun(isHomeModalVisible, hideHomeModal,
          reduxLang.homeStyle, homeStyleArray, 'home')}

        {textHeadingFun(theme, reduxLang, reduxLang.SelectyourSpecificColor)}

        {oneColumnColorsFun(setThemeColor, colorsArr[0], colorsArr[1], colorsArr[2], colorsArr[3],
          theme)}
        {oneColumnColorsFun(setThemeColor, colorsArr[4], colorsArr[5], colorsArr[6], colorsArr[7], theme)}
        {oneColumnColorsFun(setThemeColor, colorsArr[8], colorsArr[9], colorsArr[10], colorsArr[11], theme)}
        {oneColumnColorsFun(setThemeColor, colorsArr[12], colorsArr[13], colorsArr[14], colorsArr[15], theme)}

        {/* // theme Color */}

        {textHeadingFun(theme, reduxLang, reduxLang.SelectyourSpecificTheme)}

        <View style={{
          flexDirection: 'row',
          alignItems: 'center', justifyContent: 'space-evenly',
          width: '100%'
        }}>
          <TouchableOpacity
            onPress={() => {
              setModeValue(true)
            }}
            style={[styles.colorStlye, {
              backgroundColor: darkTheme.secondryBackgroundColor,
            }]}
          />
          <TouchableOpacity
            onPress={() => {
              setModeValue(false)
            }}
            style={[styles.colorStlye, {
              backgroundColor: lightTheme.secondryBackgroundColor,
            }]}
          />
        </View>

        {selectValueFun(reduxLang.SelectLanguage, showLangModal
          , !languageArray[0].status
            ? languageArray[0].value
            : languageArray[1].value)
        }

        {/* // Font Size */}

        {textHeadingFun(theme, reduxLang, reduxLang.ChanegFontSize)}

        <Slider
          style={{ width: 200, height: 40, alignSelf: 'center' }}
          minimumValue={0}
          maximumValue={3}
          step={1}
          value={sliderInitialValue}
          minimumTrackTintColor={theme.primary}
          maximumTrackTintColor={theme.secondryBackgroundColor}
          onValueChange={(value) => {
            changeFontFun(value, value + appFontSize.smallSize,
              value + appFontSize.mediumSize,
              value + appFontSize.largeSize, appFontSize.fontFamily, setThemeColor,
              setSlider,theme)
          }}
        />

        {textHeadingFun(theme, reduxLang, reduxLang.borderRadius)}

        <Slider
          style={{
            width: 200, height: 40, alignSelf: 'center',
            marginBottom: 20
          }}
          minimumValue={10}
          maximumValue={22}
          step={3}
          value={sliderInitialValue}
          minimumTrackTintColor={theme.primary}
          maximumTrackTintColor={theme.secondryBackgroundColor}
          onValueChange={(value) => {
            changeBorderRadius(value,
              setBorderRadus)
          }}
        />

        <CustomBtn width={WIDTH}
          onPressFun={() => {
          }} theme={theme} bold={true}
          textSize={theme.appFontSize.mediumSize}
          title={reduxLang.BtnStyle} />

        <View style={{ marginVertical: 10 }} />
        {selectValueFun(reduxLang.ChangeFontFamily, showFontModal
          , theme.appFontSize.fontFamily)
        }

        {selectValueFun(reduxLang.cardStyle, showCardModal
          , cardStyleArray[cardStyleValue - 1].value)
        }

        {selectValueFun(reduxLang.homeStyle, showHomeModal
          , homeStyleArray[homeStyleValue - 1].value)
        }

      </ScrollView>

    </SafeAreaView>
  );
};


const mapStateToProps = (state: any) => ({
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang,
  sliderInitialValue: state.configReducer.sliderInitialValue,
  borderRadiusValue: state.configReducer.borderRadius,
  cardStyleValue: state.configReducer.cardStyle,
  homeStyleValue: state.configReducer.homeStyle,
  rtl: state.configReducer.rtl
});

const mapDispatchToProps = (dispatch: any) => ({
  setModeValue: (id: boolean) => dispatch(setModeValue(id)),
  setRtl: (value: boolean) => dispatch(setRtl(value)),
  setSlider: (id: number) => dispatch(setSliderValue(id)),
  setBorderRadus: (value: number) => dispatch(setBorderRadusValue(value)),
  setCardStyle: (value: number) => dispatch(setCardStyleValue(value)),
  setHomeStyle: (value: number) => dispatch(setHomeStyleValue(value)),
  setThemeColor: (light: appColorsType, dark: appColorsType) => dispatch(setThemeColor(light, dark)),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  colorStlye: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Platform.OS === 'ios' ? HEADER_IOS_HEIGHT * 0.37 :
      HEADER_ANDROID_HEIGHT * 0.6,
    borderRadius: 8,
    paddingHorizontal: Platform.OS === 'ios' ? HEADER_IOS_HEIGHT * 0.37 :
      HEADER_ANDROID_HEIGHT * 0.6,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContainerStyle: {
    paddingBottom: 20,
    justifyContent: 'center'
  },
  pickerTextStyle: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  picketTouchAbleStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    padding: 10,
    paddingLeft: 0,
    paddingRight: 80,
  }, selectedViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomizeTheme);
