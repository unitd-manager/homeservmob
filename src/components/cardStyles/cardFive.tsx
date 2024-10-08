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
import LinearGradient from 'react-native-linear-gradient';
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
        style={[styles.touchableOpacity,
        {
          backgroundColor: backgroundColor ?
            backgroundColor : theme.primaryBackgroundColor
        }]}>
        <TouchableOpacity onPress={() => navigation.push('ProductDetail', {
          dataImages: productDetailData
        })}>
          <ImageBackground
            source={data.url}
            resizeMode={'cover'}
            style={[styles.imageBackground, {
              backgroundColor: backgroundColor ? backgroundColor : theme.backgroundImageColor
            }]} >
            <LinearGradient
              start={{ x: 0, y: 0 }} end={{ x: 2, y: 1 }}
              colors={!I18nManager.isRTL ? [theme.primary, '#141414', theme.primary,] : [theme.primary, '#141414', theme.primary]}
              style={styles.discountTag}>

              <Text
                numberOfLines={1}
                style={[styles.bold, {
                  color: theme.primaryTextColor,
                  fontSize: theme.appFontSize.smallSize,
                  fontFamily: theme.appFontSize.fontFamily
                }]}>{'-20%'}</Text>

            </LinearGradient>


            <TouchableOpacity onPress={addToCartFun} style={
              [styles.heartIcon, {
                backgroundColor: theme.primary
              }]}>
              <FontAwesome
                style={
                  {
                    color: theme.primaryTextColor,
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
            style={[styles.productNameText, {
              color: theme.textColor,
              fontSize: theme.appFontSize.smallSize,
              fontFamily: theme.appFontSize.fontFamily
            }]}>{data.productName}</Text>


          <Text
            numberOfLines={1}
            style={[styles.bold, {
              color: theme.primary,
              fontSize: theme.appFontSize.mediumSize,
              fontFamily: theme.appFontSize.fontFamily
            }]}>{'$12.00'}</Text>

          <View style={styles.cartIconContainer}>

            <Text style={[styles.discountPriceText, {
              color: theme.secondry,
              fontSize: theme.appFontSize.smallSize - 1,
              fontFamily: theme.appFontSize.fontFamily
            }]}>
              {'$550.62'}
            </Text>
            <View style={styles.reviewsRow}>
              <ReviewStar
                theme={theme}
                counterValue={3}
                starSize={theme.appFontSize.smallSize - 1}
              ></ReviewStar>
              <Text style={[{
                color: theme.secondry,
                fontSize: theme.appFontSize.smallSize - 1,
                fontFamily: theme.appFontSize.fontFamily
              }]}>
                {'(152)'}
              </Text>
            </View>
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
    elevation: 0.4,
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  reviewsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cartIconContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 4
  },
  discountTag: {
    zIndex: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    right: 0,
    top: 0,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    padding: 4,
    paddingHorizontal: 6
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
  discountPriceText: {
    textDecorationLine: 'line-through',
    textAlign: 'left'
  },
  flashRow: {
    padding: 6
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
    height: HEIGHT * 0.22,
    width: '100%',
  },
  productNameView: {
    marginHorizontal: 10,
    alignItems: 'flex-start',
    marginVertical: 6
  },
});

export default CardOne;
