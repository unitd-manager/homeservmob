import React, { useLayoutEffect } from 'react';
import { Image, Platform, SafeAreaView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { WIDTH } from '../components/config';
import { ScrollView } from 'react-native-gesture-handler';
import { appColorsType } from '../redux/types/types';
type RootStackParamList = {
  Settings: undefined;
};
interface IProps {
  navigation: StackNavigationProp<RootStackParamList>;
  theme: appColorsType;
  reduxLang: any;
}

const PrivacyPolicyScreen = ({ navigation, theme, reduxLang }: IProps) => {
  // Header Settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: reduxLang.BlogDetails,
      headerStyle: {
        backgroundColor: theme.secondryBackgroundColor,
        shadowColor: 'transparent',
      },
      headerTintColor: theme.textColor,
    });
  }, [
    navigation,
    reduxLang.PrivacyPolice,
    reduxLang.TermAndCondition,
    theme.secondryBackgroundColor,
    theme.textColor,
  ]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.primaryBackgroundColor },
      ]}>
      <ScrollView>
        <Image
          source={require('../images/shirtsTwo/Banner8.png')}
          resizeMode={'cover'}
          style={[styles.imageBackground, {
            backgroundColor: theme.backgroundImageColor
          }]} />

        <Text style={[styles.headingText, {
          color: theme.textColor,
          fontSize: theme.appFontSize.largeSize + 6,
          fontFamily: theme.appFontSize.fontFamily,
        }]}>
          {reduxLang.WebSiteTourist}
        </Text>
        <Text style={[styles.bodyText, {
          color: theme.textColor,
          fontSize: theme.appFontSize.mediumSize,
          fontFamily: theme.appFontSize.fontFamily,
        }]}>
          {reduxLang.GlobalText}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  headingText: {
    padding: 10,
    fontWeight: 'bold',
    textAlign: Platform.OS === 'ios' ? 'left' : 'auto',
  },
  bodyText: {
    padding: 10,
    textAlign: 'left',
    paddingTop: 0,
  },
  imageBackground: {
    height: 200,
    width: WIDTH * 0.95,
    margin: 6,
    marginTop: 10,
    borderRadius: 8,
    alignSelf: 'center'
  },
});

const mapStateToProps = (state: any) => ({
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang,
});


export default connect(
  mapStateToProps,
  null,
)(PrivacyPolicyScreen);
