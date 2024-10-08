import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Dimensions,
  TouchableOpacity,
  I18nManager,
  StatusBar
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { setIntroScreen } from '../redux/actions/actions';
import { appColorsType } from '../redux/types/types';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
};
interface IProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  // any other props that come into the component
  setIntroScreen(value: boolean): void;
  theme: appColorsType;
  reduxLang: any;
}

const IntroScreen = ({ setIntroScreen, theme, navigation, reduxLang }: IProps) => {
  const [, setShowRealApp] = useState(true);
  const slides = [
    {
      key: 1,
      title: reduxLang.OnlineShopping,
      text: reduxLang.OnlineShoppingText,
      image2: require('../images/IntroShop.png'),
      backgroundColor: '#febe29',
    },
    {
      key: 2,
      title: reduxLang.ProductSearch,
      text: reduxLang.ProductSearchText,
      image2: require('../images/IntroSearch.png'),
      backgroundColor: '#febe29',
    },
    {
      key: 3,
      title: reduxLang.LiveFilters,
      text: reduxLang.LiveFilterText,
      image2: require('../images/IntroNoti.png'),
      backgroundColor: '#22bcb5',
    },
  ];
  function _renderItem({ item }: any) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: theme.primaryBackgroundColor },
        ]}>
        <TouchableOpacity
          onPress={() => {
            navigation !== undefined ? navigation.pop() : setIntroScreen(false);
          }}
          style={styles.skipBtnStyle}>
          <Text style={[styles.skipTextStyle, {
            color: theme.secondry,
            fontSize: theme.appFontSize.largeSize + 3,
            fontFamily: theme.appFontSize.fontFamily
          }]}>
            {'Skip'}
          </Text>
        </TouchableOpacity>

        <Image
          resizeMode={'contain'}
          style={[
            styles.centerImageStyle,
            {
              marginLeft:
                item.key === 3
                  ? !I18nManager.isRTL
                    ? WIDTH * 0.15
                    : WIDTH * -0.12
                  : 0,
            },
          ]}
          source={item.image2}
        />

        <Text style={[styles.storyTitleStyle, {
          color: theme.textColor,
          fontSize: theme.appFontSize.largeSize + 10,
          fontFamily: theme.appFontSize.fontFamily
        }]}>
          {item.title}
        </Text>
        <Text style={[styles.descriptionTextStyle, {
          color: theme.textColor,
          fontSize: theme.appFontSize.mediumSize,
          fontFamily: theme.appFontSize.fontFamily
        }]}>
          {item.text}
        </Text>
      </View>
    );
  }

  function _renderNextButton() {
    return (
      <View
        style={[
          styles.buttonCircle,
          { backgroundColor: theme.primary, shadowColor: theme.secondryTextColor },
        ]}>
        <Ionicons
          name={!I18nManager.isRTL ? 'md-arrow-forward' : 'md-arrow-back'}
          style={{ color: theme.primaryBackgroundColor }}
          size={24}
        />
      </View>
    );
  }
  function _renderDoneButton() {
    return (
      <View
        style={[
          styles.buttonCircle,
          { backgroundColor: theme.primary, shadowColor: theme.secondryTextColor },
        ]}>
        <Ionicons
          name="md-checkmark"
          style={{ color: theme.primaryBackgroundColor }}
          size={24}
        />
      </View>
    );
  }
  function _onDone() {
    if (navigation !== undefined) {
      navigation.pop();
    } else {
      setShowRealApp(false);
      setIntroScreen(false);
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={theme.barStyle} backgroundColor={theme.StatusBarColor} />


      <AppIntroSlider
        dotStyle={{
          backgroundColor: theme.secondry,
          marginTop:
            navigation !== undefined
              ? Platform.OS === 'ios'
                ? HEIGHT * 0.436
                : HEIGHT * 0.2
              : Platform.OS === 'ios'
                ? HEIGHT * 0.3
                : HEIGHT * 0.05,
        }}
        activeDotStyle={{
          backgroundColor: theme.primary,
          marginTop:
            navigation !== undefined
              ? Platform.OS === 'ios'
                ? HEIGHT * 0.436
                : HEIGHT * 0.2
              : Platform.OS === 'ios'
                ? HEIGHT * 0.3
                : HEIGHT * 0.05,
        }}
        keyExtractor={(item) => item.key.toString()}
        bottomButton={true}
        renderItem={_renderItem}
        data={slides}
        renderDoneButton={_renderDoneButton}
        renderNextButton={_renderNextButton}
        onDone={_onDone}
      />
    </View>
  );
  // }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden', // doesn't do anything
  },
  skipBtnStyle: {
    position: 'absolute',
    left: WIDTH * 0.84,
    top: HEIGHT * 0.07,
  },
  skipTextStyle: {
    textDecorationLine: 'underline',
  },
  centerImageBackground: {
    height: 295,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? HEIGHT * 0.15 : HEIGHT * 0.1,
  },
  centerImageStyle: {
    marginTop: Platform.OS === 'ios' ? HEIGHT * 0.15 : HEIGHT * 0.1,
    height: HEIGHT * 0.4,
    width: '80%',
  },
  storyTitleStyle: {
    width: WIDTH * 0.8,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: Platform.OS === 'ios' ? HEIGHT * 0.06 : HEIGHT * 0.02,
  },
  descriptionTextStyle: {
    width: WIDTH * 0.93,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: Platform.OS === 'ios' ? HEIGHT * 0.04 : HEIGHT * 0.03,
  },
  buttonCircle: {
    marginTop: Platform.OS === 'ios' ? HEIGHT * 0.18 : HEIGHT * 0.09,
    width: 45,
    height: 45,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    left: '84%',
    bottom: HEIGHT * 0.02,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
});
const mapStateToProps = (state: any) => ({
  counter: state.configReducer.counter,
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang
});

const mapDispatchToProps = (dispatch: any) => ({
  setIntroScreen: (value: boolean) => dispatch(setIntroScreen(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IntroScreen);
