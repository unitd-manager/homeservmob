import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { appColorsType } from '../redux/types/types';
type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
};
interface IProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
  counter: number;
  counterIncrement(counter: number): void;
  counterDecrement(counter: number): void;
  theme: appColorsType;
}
const App = ({
  navigation,
  counter,
  counterIncrement,
  counterDecrement,
  theme,
}: IProps) => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.primaryBackgroundColor },
      ]}>
      <TouchableOpacity
        style={[styles.demoContainer, { backgroundColor: theme.primary }]}
        onPress={() => {
          counterIncrement(1);
        }}>
        <Text style={{ color: theme.textColor }}>{'+'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.demoContainer, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate('Detail')}>
        <Text style={{ color: theme.textColor }}>{counter}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.demoContainer, { backgroundColor: theme.primary }]}
        onPress={() => {
          counterDecrement(1);
        }}>
        <Text style={{ color: theme.textColor }}>{'-'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  demoContainer: {
    padding: 40,
  },
});

const mapStateToProps = (state: any) => ({
  counter: state.configReducer.counter,
  theme: state.configReducer.theme,
});


export default connect(mapStateToProps)(App);
