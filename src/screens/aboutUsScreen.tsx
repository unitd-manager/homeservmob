import React, { useLayoutEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  I18nManager,
  ScrollView,
  View,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import { decrement, increment } from '../redux/actions/actions';
import { StackNavigationProp } from '@react-navigation/stack';
import { appColorsType } from '../redux/types/types';
import { HEADER_IOS_HEIGHT, HEADER_ANDROID_HEIGHT } from '../components/config';

type RootStackParamList = {
};
export interface IProps {
  navigation: StackNavigationProp<RootStackParamList>;
  theme: appColorsType;
  reduxLang: any;
  route: any;
}
const commonViewFun = (
  theme: appColorsType,
  iconName: string,
  text: string,
  backgroundColor: string,
  selectedValue: string,
) => (
  <View style={[styles.listLabelView, { backgroundColor: backgroundColor }]}>
    <View style={styles.listLabelIconView}>
      <Ionicons
        style={[
          styles.labelIcon,
          {
            color: theme.secondry,
            fontSize: theme.appFontSize.largeSize + 1,
          },
        ]}
        name={iconName}
      />
      <Text style={[styles.listLabelText, {
        color: theme.textColor,
        fontSize: theme.appFontSize.mediumSize - 1,
        fontFamily: theme.appFontSize.fontFamily,
      }]}>
        {text}
      </Text>
    </View>
    <View style={styles.commonViewTextIconStyle}>
      <Text style={[styles.selectedText, {
        color: theme.textColor,
        fontSize: theme.appFontSize.mediumSize,
        fontFamily: theme.appFontSize.fontFamily
      }]}>
        {selectedValue}
      </Text>
      <Ionicons
        style={
          {
            color: theme.secondry,
            fontSize: theme.appFontSize.smallSize - 2,
          }}
        name={!I18nManager.isRTL ? 'chevron-right' : 'chevron-left'}
      />
    </View>
  </View>
);

const labelViewFun = (
  theme: appColorsType,
  iconName: string,
  text: string,
  selectedValue: string,
  navigation: any,
  navScreen: string,
) => (
  <TouchableOpacity
    onPress={() => {
      if (navScreen !== '') {
        navigation.navigate(navScreen);
      }
    }}>
    {commonViewFun(
      theme,
      iconName,
      text,
      theme.secondryBackgroundColor,
      selectedValue,
    )}
  </TouchableOpacity>
);

const PrivacyPolicyScreen = ({ navigation, theme, reduxLang }: IProps) => {
  // Header Settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: reduxLang.AboutUs,
      headerStyle: {
        backgroundColor: theme.secondryBackgroundColor,
        shadowColor: 'transparent',
      },
      headerTintColor: theme.textColor,
    });
  }, [
    navigation,
    reduxLang.AboutUs,
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
          {reduxLang.APolicy}
        </Text>
        <Text style={[styles.bodyText, {
          color: theme.textColor,
          fontSize: theme.appFontSize.mediumSize,
          fontFamily: theme.appFontSize.fontFamily,
        }]}>
          {reduxLang.GlobalText}
        </Text>

        {labelViewFun(
          theme,
          'user-circle',
          reduxLang.PrivacyPolice,
          '',
          navigation,
          'PrivacyPolicy',
        )}

        {labelViewFun(
          theme,
          'file',
          reduxLang.TermAndCondition,
          '',
          navigation,
          'TermsAndCond',
        )}
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
  listLabelView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    margin: 0,
    marginTop: 5,
    marginBottom: 1,
  },
  listLabelIconView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelIcon: {
    height: Platform.OS === 'ios' ? HEADER_IOS_HEIGHT * 0.25 :
      HEADER_ANDROID_HEIGHT * 0.32,
    width: Platform.OS === 'ios' ? HEADER_IOS_HEIGHT * 0.28 :
      HEADER_ANDROID_HEIGHT * 0.34,
  },
  listLabelText: {
    marginLeft: 12,
    textAlign: 'center',
    marginBottom: 3,
  },
  commonViewTextIconStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  selectedText: { marginRight: 5, marginLeft: 5 },
});

const mapStateToProps = (state: any) => ({
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang,
});

const mapDispatchToProps = (dispatch: any) => ({
  counterIncrement: (id: number) => dispatch(increment(id)),
  counterDecrement: (id: number) => dispatch(decrement(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivacyPolicyScreen);
