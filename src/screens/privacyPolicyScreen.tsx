import React, { useLayoutEffect } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
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
      headerTitle: reduxLang.PrivacyPolice,
      headerStyle: {
        backgroundColor: theme.secondryBackgroundColor,
        shadowColor: 'transparent',
      },
      headerTintColor: theme.textColor,
    });
  }, [
    navigation,
    reduxLang.PrivacyPolice,
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
        <Text style={[styles.headingText, {
          color: theme.textColor,
          fontSize: theme.appFontSize.largeSize + 6,
          fontFamily: theme.appFontSize.fontFamily,
        }]}>
          {reduxLang.APolicy}
        </Text>
        <Text style={[styles.bodyText, {
          color: theme.textColor,
          fontSize: theme.appFontSize.mediumSize,
          fontFamily: theme.appFontSize.fontFamily,
        }]}>
          {reduxLang.GlobalText}
        </Text>
        <Text style={[styles.headingText, {
          color: theme.textColor,
          fontSize: theme.appFontSize.largeSize + 6,
          fontFamily: theme.appFontSize.fontFamily,
        }]}>
          {reduxLang.WebsitePolicy}
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
});

const mapStateToProps = (state: any) => ({
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang,
});

export default connect(
  mapStateToProps,
  null,
)(PrivacyPolicyScreen);
