import React from 'react';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { appColorsType } from '../redux/types/types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootHomeStackParamList } from '../router/RootParams';

type productDetailScreenProp = StackNavigationProp<RootHomeStackParamList, 'ProductDetail'>;

interface IProps {
  theme: appColorsType;
}
const CustomBtn = ({ theme }: IProps) => {
  const navigation = useNavigation<productDetailScreenProp>();

  return (
  <TouchableOpacity
    style={[styles.container, {
      backgroundColor: theme.primary,
    }]}
    onPress={() => {
      navigation.navigate('CustomizeTheme')
    }}>

    <FontAwesome
      name={'edit'}
      style={[styles.iconStyle, {
        color: theme.primaryTextColor,
        fontSize: theme.appFontSize.largeSize + 5
      }]}
    />

  </TouchableOpacity>
  )
}

export default CustomBtn

const styles = StyleSheet.create({
  container: {
    zIndex: 5,
    position: 'absolute',
    left: 20,
    bottom: 55,
    alignItems: 'center',
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    alignSelf: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  iconStyle: {
    paddingTop: Platform.OS === 'ios' ? 2 : 0,
  },
});
