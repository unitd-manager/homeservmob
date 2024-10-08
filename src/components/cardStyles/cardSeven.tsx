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
import CustomBtn from '../customBtn';
import { RootHomeStackParamList } from '../../router/RootParams';
import { StackNavigationProp } from '@react-navigation/stack';

type productDetailScreenProp = StackNavigationProp<RootHomeStackParamList, 'ProductDetail'>;

interface IProps {
  data: { url: any, productName: string, quantity: string };
  productDetailData: { url: any, productName: string, quantity: string }[];
  theme: appColorsType;
  backgroundColor?: string;
  addToCartFun: () => void;
  index: number;
  reduxLang: any;
}

const CardTwo = ({ data, theme, addToCartFun, backgroundColor,
  index, productDetailData, reduxLang }: IProps) => {
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
            borderTopRightRadius={10}
            borderTopLeftRadius={10}
            source={data.url}
            resizeMode={'cover'}
            style={[styles.imageBackground, {
              backgroundColor: theme.backgroundImageColor
            }]}>

            <View style={[styles.priceView, {
              backgroundColor: theme.primary,
            }]}>

              <Text
                numberOfLines={1}
                style={[styles.bold, {
                  color: theme.primaryTextColor,
                  fontSize: theme.appFontSize.mediumSize - 1,
                  fontFamily: theme.appFontSize.fontFamily,
                  textAlign: 'center',
                  padding: 1
                }]}>{'$3380.00'}</Text>
            </View>

            <TouchableOpacity style={[styles.heartIcon,
            { backgroundColor: theme.primary }]}>
              <Ionicons
                style={[styles.heartIconStyle,
                {
                  fontSize: theme.appFontSize.largeSize + 1,
                  color: theme.primaryTextColor
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
              fontSize: theme.appFontSize.smallSize + 1,
              fontFamily: theme.appFontSize.fontFamily
            }]}>{data.productName}</Text>

          {/* <Text
            numberOfLines={1}
            style={[styles.bold, {
              color: theme.primary,
              fontSize: theme.appFontSize.mediumSize - 1,
              fontFamily: theme.appFontSize.fontFamily
            }]}>{'$380.00'}</Text> */}

        </View>
        <CustomBtn
          textColor={theme.primaryTextColor}
          textSize={theme.appFontSize.smallSize}
          backgroundColor={theme.primary}
          paddingVertical={6}
          borderRadius={14} width={'90%'}
          onPressFun={addToCartFun}
          theme={theme} title={reduxLang.ADDTOCART}></CustomBtn>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    margin: 4,
    borderRadius: 10
  },
  priceView:{
    width: '35%', borderRadius: 5, margin: 6
  },
  heartIcon: {
    zIndex: 20,
    alignItems: 'center',
    height: WIDTH * 0.067,
    width: WIDTH * 0.067,
    borderRadius: 100,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#ffffff',
    right: 7,
    bottom: -12,
    position: 'absolute'
  },
  heartIconStyle: {
    color: '#000000',
    paddingTop: 2,
    alignSelf: 'center'
  },
  productNameText: {
    paddingVertical: 3
  },
  bold: {
    fontWeight: 'bold'
  },
  touchableOpacity: {
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    paddingBottom: 12
  },
  imageBackground: {
    height: HEIGHT * 0.2,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'red'
  },
  productNameView: {
    marginHorizontal: 10,
    alignItems: 'center',
    marginVertical: 6
  },
});

export default CardTwo;
