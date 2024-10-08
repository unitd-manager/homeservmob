import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import Accordion from '../components/dropDownList/Accordion';
import { appColorsType } from '../redux/types/types';

interface IProp {
  navigation?: any;
  theme: appColorsType;
  reduxLang?: any;
}
const App = ({ navigation, theme, reduxLang }: IProp) => {
  return (
    <SafeAreaView
      style={
        (styles.container, { backgroundColor: theme.primaryBackgroundColor })
      }>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainerStyle}
        showsVerticalScrollIndicator={false}>
        <Accordion
          theme={theme}
          navigation={navigation}
          reduxLang={reduxLang}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContainerStyle: {
    paddingBottom: 5,
  },
});

const mapStateToProps = (state: any) => ({
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang,
});

export default connect(mapStateToProps, null)(App);
