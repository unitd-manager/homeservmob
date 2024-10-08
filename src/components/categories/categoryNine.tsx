import React from 'react';
import {
  StyleSheet,
  Dimensions, View,
} from 'react-native';
import { appColorsType } from '../../redux/types/types';
const WIDTH = Dimensions.get('window').width;
import List, { List as ListModel } from '../dropDownList/List';
import { useNavigation } from '@react-navigation/native';
import { RootHomeStackParamList } from '../../router/RootParams';
import { StackNavigationProp } from '@react-navigation/stack';
import { list } from '../data';

type ScreenProp = StackNavigationProp<RootHomeStackParamList, 'Shop'>;

interface IProps {
  data: { url: any, productName: string, quantity: string }[];
  theme: appColorsType;
  reduxLang: any;
}

const categoryNine = (navigation: ScreenProp,
  theme: appColorsType,
  name: string) => (
  <List
    key={name}
    {...{ list }}
    theme={theme}
    navigation={navigation}
    heading={name}
  />
)

const CategoryCardNine = ({ data, theme, }: IProps) => {
  const navigation = useNavigation<ScreenProp>();

  return (
    <View style={styles.container}>
      {data.map((value) =>
      (
        categoryNine(navigation, theme, value.productName)
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    alignContent: 'center',
  }
});


export default CategoryCardNine;
