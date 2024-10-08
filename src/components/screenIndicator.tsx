import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { appColorsType } from '../redux/types/types';
import { HEADER_IOS_HEIGHT, HEADER_ANDROID_HEIGHT, WIDTH } from '../components/config';

interface IProps {
  theme: appColorsType;
  text: string;
  label: string;
  selectedValue: boolean;
}

const ScreenIndicator = ({ theme, text, label, selectedValue }: IProps) => (
  <><View style={styles.deviderInnerView} />

    <View style={[styles.deviderCircle, {
      borderColor: theme.primary,
      borderWidth: selectedValue ? 0 : 4,
      backgroundColor: selectedValue ? theme.primary : theme.primaryBackgroundColor,
    }]}>

      <Text style={[styles.deviderText, {
        fontSize: theme.appFontSize.smallSize,
        color: selectedValue ? theme.secondryTextColor : theme.textColor
      }]}>{text}</Text>

      <Text style={[styles.deviderBottomText, {
        margin: selectedValue ? 6 : 10,
        color: theme.textColor, fontSize: theme.appFontSize.smallSize - 1,
        fontFamily: theme.appFontSize.fontFamily
      }]}>{label}</Text>

    </View>
    <View style={styles.deviderInnerView} /></>
);
export default ScreenIndicator;
const styles = StyleSheet.create({
  deviderStyleView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
    marginBottom: '10%',
    width: '100%',
    alignSelf: 'center'
  },
  deviderInnerView: {
    flex: 1, height: 2,
    backgroundColor: '#D2D2D2',
  },
  deviderText: {
    textAlign: 'center',
  },
  deviderCircle: {
    height: Platform.OS === 'ios' ? HEADER_IOS_HEIGHT * 0.38 :
      HEADER_ANDROID_HEIGHT * 0.6,
    width:
      Platform.OS === 'ios' ? HEADER_IOS_HEIGHT * 0.38 :
        HEADER_ANDROID_HEIGHT * 0.6,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviderBottomText: {
    position: 'absolute',
    zIndex: 5,
    width: WIDTH * 0.3,
    top: '100%',
    textAlign: 'center',
  }
});
