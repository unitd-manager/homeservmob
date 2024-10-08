import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  I18nManager
} from 'react-native';
import { appColorsType } from '../../redux/types/types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ReviewStar from '../../components/reviewStar';
import { HEIGHT, WIDTH } from '../config';
import { useNavigation } from '@react-navigation/native';
import { RootHomeStackParamList } from '../../router/RootParams';
import { StackNavigationProp } from '@react-navigation/stack';

type productDetailScreenProp = StackNavigationProp<RootHomeStackParamList, 'ProductDetail'>;

interface IProps {
  data: { url: any, productName: string, quantity: string };
  productDetailData: { url: any, productName: string, quantity: string }[];
  theme: appColorsType;
  addToCartFun: () => void;
  backgroundColor?: string;
  index: number;
}

const CardOne = ({ data, theme, addToCartFun, backgroundColor,
  index, productDetailData }: IProps) => {

  const navigation = useNavigation<productDetailScreenProp>();

  return (
    <View style={styles.container}>
      <View
        key={index}
        style={[styles.touchableOpacity
          ,
        {
          backgroundColor: backgroundColor ?
            backgroundColor : theme.primaryBackgroundColor
        }
        ]}>
        <TouchableOpacity onPress={() => navigation.push('ProductDetail', {
          dataImages: productDetailData
        })}>
          <ImageBackground
            source={data.url}
            resizeMode={'cover'}
            style={[styles.imageBackground, {
              backgroundColor: backgroundColor ? backgroundColor : theme.backgroundImageColor
            }]} >
            <TouchableOpacity onPress={addToCartFun} style={
              [styles.heartIcon, {
                backgroundColor: theme.primary
              }]}>
              <FontAwesome
                style={
                  {
                    color: '#ffffff',
                    fontSize: theme.appFontSize.largeSize,
                  }}
                name={"cart-plus"}
              />
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>

        <View style={styles.productNameView}>


          <Text
            numberOfLines={1}
            style={[styles.productNameText, styles.bold, {
              color: I18nManager.isRTL ? theme.secondry : '#333335',
              fontSize: theme.appFontSize.mediumSize,
              fontFamily: theme.appFontSize.fontFamily
            }]}>{data.productName}</Text>


          <Text
            numberOfLines={1}
            style={{
              color: theme.textColor,
              fontSize: theme.appFontSize.mediumSize - 1,
              fontFamily: theme.appFontSize.fontFamily
            }}>{data.quantity}</Text>

          <View style={styles.cartIconContainer}>

            <Text
              numberOfLines={1}
              style={[styles.quantity, {
                color: theme.secondry,
                fontSize: theme.appFontSize.smallSize,
                fontFamily: theme.appFontSize.fontFamily
              }]}>{1 + ' ' + data.productName}</Text>

            <ReviewStar
              theme={theme}
              counterValue={3}
              starSize={theme.appFontSize.smallSize}
            ></ReviewStar>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    margin: 4,
  },
  cartIconContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 4
  },
  heartIcon: {
    alignItems: 'center',
    height: WIDTH * 0.064,
    width: WIDTH * 0.064,
    zIndex: 3,
    position: 'absolute',
    bottom: -11,
    right: 13,
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
  },
  productNameText: {
    paddingVertical: 3
  },
  bold: {
    fontWeight: 'bold'
  },
  quantity: {
    textAlign: 'left'
  },
  touchableOpacity: {
    width: '100%',
    justifyContent: 'center'
  },
  imageBackground: {
    height: HEIGHT * 0.2,
    width: '100%',
  },
  productNameView: {
    marginHorizontal: 10,
    alignItems: 'flex-start',
    marginVertical: 6
  },
});

export default CardOne;
