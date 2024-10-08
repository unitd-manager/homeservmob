import React from 'react';
import {
  StyleSheet, ImageBackground,
  Dimensions, Text, View,
  TouchableOpacity
} from 'react-native';
import { appColorsType } from '../../redux/types/types';
const WIDTH = Dimensions.get('window').width;

import { useNavigation } from '@react-navigation/native';
import { RootHomeStackParamList } from '../../router/RootParams';
import { StackNavigationProp } from '@react-navigation/stack';

type ScreenProp = StackNavigationProp<RootHomeStackParamList, 'Shop'>;

interface IProps {
  data: { url: any, productName: string, quantity: string }[];
  theme: appColorsType;
  reduxLang: any;
}

const categorySeven = (navigation: ScreenProp,
  index: number, theme: appColorsType, url: any,
  name: string) => (
  <TouchableOpacity
    key={index}
    onPress={() => navigation.navigate('Shop')}
    style={styles.touchableOpacity}
  >
    <ImageBackground source={url}
      resizeMode={'cover'}
      imageStyle={{ borderRadius: 10 }}
      style={[styles.imageBackground, {
        backgroundColor: theme.backgroundImageColor,
        borderRadius: 10
      }]}>
    </ImageBackground>
    <Text style={[styles.productNameText, {
          fontSize: theme.appFontSize.largeSize,
          fontFamily: theme.appFontSize.fontFamily,
          color: theme.textColor
        }]}>{name}</Text>
  </TouchableOpacity>
)

const CategoryCardSeven = ({ data, theme, }: IProps) => {
  const navigation = useNavigation<ScreenProp>();

  return (
    <View style={styles.container}>
      { data.map((value, index) =>
      (
        categorySeven(navigation, index, theme, value.url, value.productName)
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 0
  },
  imageBackground: {
    height: 177,
    width: WIDTH * 0.465,
    alignItems: 'center', justifyContent: 'center',
    margin: 4
  },
  opacity: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    alignContent: 'center',
    opacity: 0.3,
    borderRadius: 20,
  },
  productNameView: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9,
    position: 'absolute',
  },
  productNameText: {
paddingTop: 4,
paddingBottom: 12  },
  container: {
    flexWrap: 'wrap',
    alignContent: 'center',
    flexDirection: 'row',
    paddingLeft: '1.3%'
  }
});


export default CategoryCardSeven;
