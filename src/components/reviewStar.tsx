import React from 'react';
import { StyleSheet, View } from 'react-native';
import { appColorsType } from '../redux/types/types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface IProps {
  theme: appColorsType;
  counterValue: number;
  starSize: number;
  editable?: boolean;
  setReviewValueFun?: (arg: number) => void;
}


const RatingReviewsScreen = ({ theme,
  counterValue, starSize, editable, setReviewValueFun }: IProps) => {

  const starIcon = (color: string, fontSize: number, value: number) => (
    <FontAwesome name={'star'}
      onPress={() => (editable && setReviewValueFun) ? setReviewValueFun(value) : null}
      style={[{
        color: color,
        fontSize: fontSize,
        paddingHorizontal: editable ? 5 : 1
      }]} />
  )

  const ratingFun = (value: number, fontSize: number,) => (
    <View style={styles.container}>
      {starIcon(value >= 1 ? theme.primary : theme.secondry, fontSize, 1)}
      {starIcon(value >= 2 ? theme.primary : theme.secondry, fontSize, 2)}
      {starIcon(value >= 3 ? theme.primary : theme.secondry, fontSize, 3)}
      {starIcon(value >= 4 ? theme.primary : theme.secondry, fontSize, 4)}
      {starIcon(value >= 5 ? theme.primary : theme.secondry, fontSize, 5)}
    </View>
  )


  return (ratingFun(counterValue, starSize));
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default RatingReviewsScreen;
