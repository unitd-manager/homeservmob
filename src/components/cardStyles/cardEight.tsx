import React from 'react';
import {
  StyleSheet,
  Text, View,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { appColorsType } from '../../redux/types/types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HEIGHT, WIDTH } from '../config';
import { useNavigation } from '@react-navigation/native';
import { RootHomeStackParamList } from '../../router/RootParams';
import { StackNavigationProp } from '@react-navigation/stack';

type productDetailScreenProp = StackNavigationProp<RootHomeStackParamList, 'ProductDetail'>;

interface IProps {
  data: { url: any, productName: string, quantity: string };
  productDetailData: { url: any, productName: string, quantity: string }[];
  theme: appColorsType;
  backgroundColor?: string;
  index: number;
}

const CardEight = ({ data, theme, backgroundColor,
  index, productDetailData }: IProps) => {
  const navigation = useNavigation<productDetailScreenProp>();

  return (
    <View style={styles.container}>
      <View
        key={index}
        style={[styles.touchableOpacity, { backgroundColor: backgroundColor ? backgroundColor : theme.secondryBackgroundColor }]}>
        <TouchableOpacity onPress={() => navigation.push('ProductDetail', {
          dataImages: productDetailData
        })}>
          <ImageBackground
            source={data.url}
            resizeMode={'cover'}
            style={[styles.imageBackground, {
              backgroundColor: theme.backgroundImageColor
            }]}>
            <TouchableOpacity style={styles.heartIcon}>
              <Ionicons
                style={[styles.heartIconStyle,
                {
                  fontSize: theme.appFontSize.largeSize + 1
                }]}
                name={"heart-outline"}
              />
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>

        <View style={styles.productNameView}>

          <Text
            numberOfLines={1}
            style={[styles.productNameText, {
              color: theme.textColor,
              fontSize: theme.appFontSize.mediumSize,
              fontFamily: theme.appFontSize.fontFamily
            }]}>{data.productName}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    margin: 4
  },
  heartIcon: {
    zIndex: 20,
    alignItems: 'center',
    height: WIDTH * 0.064,
    width: WIDTH * 0.064,
    borderRadius: 100,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#ffffff',
    right: 7,
    top: 7,
  },
  heartIconStyle: {
    color: '#000000',
    paddingTop: 1,
    alignSelf: 'center'
  },
  productNameText: {
    paddingVertical: 3
  },
  bold: {
    fontWeight: 'bold'
  },
  touchableOpacity: {
    borderRadius: 5,
    width: '100%',
    justifyContent: 'center'
  },
  imageBackground: {
    height: HEIGHT * 0.23,
    width: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: 'red'
  },
  productNameView: {
    marginHorizontal: 10,
    alignItems: 'center',
    marginVertical: 6
  },
});

export default CardEight;
