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

const categoryFive = (navigation: ScreenProp,
  index: number, theme: appColorsType, url: any,
  name: string) => (
  <TouchableOpacity
    key={index}
    onPress={() => navigation.navigate('Shop')}
    style={styles.touchableOpacity}
  >
    <ImageBackground source={url}
      resizeMode={'cover'}
      imageStyle={{ borderRadius: 20 }}
      style={[styles.imageBackground, {
        backgroundColor: theme.backgroundImageColor
      }]}>
      <View
        style={[styles.opacity, {
          backgroundColor: theme.primary,
        }]}
      />
      <View style={styles.productNameView}>
        <Text style={[styles.productNameText, {
          fontSize: theme.appFontSize.largeSize + 5,
          fontFamily: theme.appFontSize.fontFamily,
        }]}>{name}</Text>

      </View>
    </ImageBackground>
  </TouchableOpacity>
)

const CategoryCardFive = ({ data, theme, }: IProps) => {
  const navigation = useNavigation<ScreenProp>();

  return (
    <View style={styles.container}>
      { data.map((value, index) =>
      (
        categoryFive(navigation, index, theme, value.url, value.productName)
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
    height: 160,
    width: WIDTH * 0.465,
    alignItems: 'center', justifyContent: 'center',
    margin: 4,
    borderRadius: 20
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
    color: '#ffffff',
    fontWeight: 'bold',
  },
  container: {
    flexWrap: 'wrap',
    alignContent: 'center',
    flexDirection: 'row',
    paddingLeft: '1.3%'
  }
});


export default CategoryCardFive;
