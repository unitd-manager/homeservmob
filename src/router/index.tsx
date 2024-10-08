import React from 'react';
import IntroSliderScreen from '../screens/introSliderScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { enableScreens } from 'react-native-screens';
import { connect } from 'react-redux';
import { isLoading, getRtl, getModeValue } from '../redux/actions/actions';
import MyTabs from './bottomTabs';
import DrawerContent from './drawerContent';
import SplashScreenStart from 'react-native-splash-screen';
import { appColorsType } from '../redux/types/types';
import { RootDrawerParamList } from './RootParams';

interface RoutesProps {
  navigation?: any;
  setLoading?(isloading: boolean): void;
  getRtl(): void;
  getModeValue(): void;
  reduxState?: any;
  Tabs?: undefined;
  theme?: appColorsType;
}

const Drawer = createDrawerNavigator<RootDrawerParamList>();

enableScreens();

function MyDrawer({ theme }: any) {

  return (
    <Drawer.Navigator
    screenOptions ={{headerShown: false,
      drawerHideStatusBarOnOpen: true,
      drawerStatusBarAnimation: 'fade',
      drawerStyle:{
        backgroundColor: theme.primaryBackgroundColor
      }}}
      initialRouteName={'Tabs'}
      drawerContent={(props) => <DrawerContent theme={theme} {...props} />}>
      <Drawer.Screen name={'Tabs'} component={MyTabs} />
    </Drawer.Navigator>
  );
}

const NavigatorApp: React.FC<RoutesProps> = ({
  navigation,
  reduxState,
  setLoading,
  getRtl,
  getModeValue,
  theme,
}) => {
  React.useEffect(() => {
    getRtl();
    getModeValue();
    SplashScreenStart.hide();
  }, [getModeValue, getRtl, setLoading]);

  if (reduxState.configReducer.showIntroScreen) {
    return (
      <NavigationContainer>
        <IntroSliderScreen navigation={navigation} />
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer >
      <MyDrawer theme={theme} />
    </NavigationContainer>
  );
};
const mapStateToProps = (state: any) => ({
  reduxState: state,
  theme: state.configReducer.theme,
});
const mapDispatchToProps = (dispatch: any) => ({
  setLoading: (id: boolean) => dispatch(isLoading(id)),
  getModeValue: () => dispatch(getModeValue()),
  getRtl: () => dispatch(getRtl()),
});
export default connect(mapStateToProps, mapDispatchToProps)(NavigatorApp);
