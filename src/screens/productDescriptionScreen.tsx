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

const ProductDescription = ({ navigation, theme, reduxLang }: IProps) => {
  // Header Settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: reduxLang.ProductDescription,
      headerStyle: {
        backgroundColor: theme.secondryBackgroundColor,
        shadowColor: 'transparent',
      },
      headerTintColor: theme.textColor,
    });
  }, [
    navigation,
    reduxLang.ProductDescription,
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
          fontSize: theme.appFontSize.largeSize + 4,
          fontFamily: theme.appFontSize.fontFamily,
        }]}>
          {reduxLang.Frequency}
        </Text>
        <Text style={[styles.bodyText, {
          color: theme.textColor,
          fontSize: theme.appFontSize.largeSize,
          fontFamily: theme.appFontSize.fontFamily,
        }]}>
          {'SIM1: GSM 850 / 900 / 1800 / 1900  '}
        </Text>
        <Text style={[styles.headingText, {
          color: theme.textColor,
          fontSize: theme.appFontSize.largeSize + 4,
          fontFamily: theme.appFontSize.fontFamily,
        }]}>
          {reduxLang.Processor}
        </Text>
        <Text style={[styles.bodyText, {
          color: theme.textColor,
          fontSize: theme.appFontSize.largeSize,
          fontFamily: theme.appFontSize.fontFamily,
        }]}>
          {'CPU	Octa-core (1 x 3.09 GHz Kryo 585 & 3x2.40 GHz Kryo 585 + 4 x 1.80 GHz Kryo 585)  '}
        </Text>
        <Text style={[styles.headingText, {
          color: theme.textColor,
          fontSize: theme.appFontSize.largeSize + 4,
          fontFamily: theme.appFontSize.fontFamily,
        }]}>
          {reduxLang.Display}
        </Text>
        <Text style={[styles.bodyText, {
          color: theme.textColor,
          fontSize: theme.appFontSize.largeSize,
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
)(ProductDescription);
