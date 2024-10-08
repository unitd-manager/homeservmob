import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { appColorsType } from '../redux/types/types';

interface IProps {
  theme: appColorsType;
  onPressFun: () => void;
  title: string;
  width?: any;
  borderRadius?: number;
  textColor?: string;
  backgroundColor?: string;
  textSize?: number;
  bold?: boolean;
  borderRadiusValue?: number;
  paddingVertical?: number;
}
const CustomBtn = ({ title, theme, onPressFun, width, borderRadius,
  backgroundColor, textColor, textSize, bold, borderRadiusValue, paddingVertical }: IProps) => (
  <TouchableOpacity
    onPress={onPressFun}
    style={[
      styles.saveBtn,
      {
        backgroundColor: backgroundColor ? backgroundColor : theme.primary,
        shadowColor: '#000',
        width: width ? width : '93%',
        borderRadius: borderRadius ? borderRadius : borderRadiusValue,
        paddingVertical: paddingVertical ? paddingVertical : 9
      },
    ]}>
    <Text
      style={[
        styles.btnText,
        {
          fontSize: textSize ? textSize : theme.appFontSize.mediumSize,
          fontFamily: theme.appFontSize.fontFamily,
          color: textColor ? textColor : theme.primaryTextColor,
          fontWeight: bold ? 'bold' : 'normal'
        },
      ]}>
      {title}
    </Text>
  </TouchableOpacity>
);
const mapStateToProps = (state: any) => ({
  borderRadiusValue: state.configReducer.borderRadius
});
export default connect(mapStateToProps, null)(CustomBtn);

const styles = StyleSheet.create({
  saveBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    elevation: 2,
    padding: 9
  },
  btnText: {
    fontWeight: '500',
  },
});
