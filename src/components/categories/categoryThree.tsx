import React from 'react';
import {
  StyleSheet,
  Text, View,
  TouchableOpacity,
  Image
} from 'react-native';
import { appColorsType } from '../../redux/types/types';
import { useNavigation } from '@react-navigation/native';
import { RootHomeStackParamList } from '../../router/RootParams';
import { StackNavigationProp } from '@react-navigation/stack';

type ScreenProp = StackNavigationProp<RootHomeStackParamList, 'Shop'>;

interface IProps {
  theme: appColorsType;
  reduxLang: any;
  data: { url: any, productName: string, quantity: string }[];
}

const categoryThreeFun = (reduxLang: any, navigation: ScreenProp,
  index: number, theme: appColorsType,
  url: any,
  name: string, counting: string) => (
  <TouchableOpacity
    key={index}
    onPress={() => navigation.navigate('Shop')}
    style={[styles.touchableOpacity, {
      backgroundColor: theme.secondryBackgroundColor,
    }]}
  >
    <Image source={url}
      resizeMode={'cover'}
      style={[styles.imageBackground, {
        backgroundColor: theme.backgroundImageColor
      }]} />
    <View style={styles.productNameView}>
      <Text style={{
        color: theme.textColor, fontSize: theme.appFontSize.largeSize,
        fontFamily: theme.appFontSize.fontFamily
      }}>{name}</Text>

      <Text style={[styles.productCountText, {
        color: theme.secondry, fontSize: theme.appFontSize.smallSize,
        fontFamily: theme.appFontSize.fontFamily
      }]}>{counting + ' ' + reduxLang.Products}</Text>
    </View>

  </TouchableOpacity>
)

const CategoryThree = ({ data, theme, reduxLang }: IProps) => {
  const navigation = useNavigation<ScreenProp>();

  return (
    <View>
      { data.map((value, index) => (categoryThreeFun(reduxLang, navigation, index, theme, value.url, value.productName, value.quantity)))}
    </View>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
    borderRadius: 6,
    marginTop: 5,
    marginBottom: 5,
  },
  productCountText: {
    paddingTop: 3,
  },
  imageBackground: {
    height: 80,
    width: 80,
    margin: 6,
    borderRadius: 6
  },
  productNameView: {
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
});


export default CategoryThree;
