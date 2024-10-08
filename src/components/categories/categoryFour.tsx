import React from 'react';
import {
  StyleSheet,
  Text, View,
  PixelRatio,
  TouchableOpacity,
  Image
} from 'react-native';
import { appColorsType } from '../../redux/types/types';
import { useNavigation } from '@react-navigation/native';
import { RootHomeStackParamList } from '../../router/RootParams';
import { StackNavigationProp } from '@react-navigation/stack';

type ScreenProp = StackNavigationProp<RootHomeStackParamList, 'ProductDetail'>;

interface IProps {
  data: { url: any, productName: string, quantity: string }[];
  theme: appColorsType;
  reduxLang: any;
}

const categoryFour = (reduxLang: any, navigation: ScreenProp,
  index: number, theme: appColorsType, url: any,
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

      <Text style={{
        paddingTop: 3, color: theme.secondry, fontSize: theme.appFontSize.smallSize,
        fontFamily: theme.appFontSize.fontFamily
      }}>{counting + ' ' + reduxLang.Products}</Text>
    </View>

  </TouchableOpacity>
)


const App = ({ data, theme, reduxLang }: IProps) => {
  const navigation = useNavigation<ScreenProp>();

  return (

    <View style={styles.container}>
      { data.map((value, index) =>
      (
        categoryFour(reduxLang, navigation, index, theme, value.url, value.productName, value.quantity)
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    margin: 3,
    borderRadius: 6,
    marginTop: 3,
    marginBottom: 3,
    width: '48%',
    padding: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageBackground: {
    height: 80,
    width: 80,
    margin: 6,
    borderRadius: 40
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
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flexWrap: 'wrap',
    alignContent: 'center',
    flexDirection: 'row',
    paddingLeft: 3
  }
});

export default App;
