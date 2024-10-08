import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { appColorsType } from '../redux/types/types';
import HomeOne from './homes/homeScreenOne';
import HomeTwo from './homes/homeScreenTwo';
import HomeThree from './homes/homeScreenThree';
import HomeFour from './homes/homeScreenFour';
import HomeFive from './homes/homeScreenFive';
import HomeSix from './homes/homeScreenSix';
import HomeSeven from './homes/homeScreenSeven';
import HomeEight from './homes/homeScreenEight';
import HomeNine from './homes/homeScreenNine';
import HomeTen from './homes/homeScreenTen';

interface IProps {
  homeStyle: number;
  theme: appColorsType;
}
const App = ({
  homeStyle, theme
}: IProps) => {

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.primaryBackgroundColor },
      ]}
    >
      {homeStyle === 1 ?
        <HomeOne theme={theme} />
        : homeStyle === 2 ?
          <HomeTwo theme={theme} />

          : homeStyle === 3 ?
            <HomeThree theme={theme} />
            : homeStyle === 4 ?
              <HomeFour theme={theme} />
              :
              homeStyle === 5 ?
                <HomeFive theme={theme} />
                :
                homeStyle === 6 ?
                <HomeSix theme={theme} />
                :
                homeStyle === 7 ?
                <HomeSeven theme={theme} />
                :
                homeStyle === 8 ?
                <HomeEight theme={theme} />
                :
                homeStyle === 9 ?
                <HomeNine theme={theme} />
                :
                homeStyle === 10 ?
                <HomeTen theme={theme} />
                :
                <HomeTwo theme={theme} />
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

const mapStateToProps = (state: any) => ({
  homeStyle: state.configReducer.homeStyle,
  theme: state.configReducer.theme,
});

export default connect(mapStateToProps, null)(App);
