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

const CardTen = ({ data, theme, addToCartFun, backgroundColor,
  index, productDetailData }: IProps) => {
  const navigation = useNavigation<productDetailScreenProp>();

  return (
    <View style={[styles.container, { borderRadius: 12 }]}>
      <View
        key={index}
        style={[styles.touchableOpacity,
        {
          backgroundColor: backgroundColor ?
            backgroundColor : theme.primaryBackgroundColor,
          borderRadius: 12
        }]}>
        <TouchableOpacity onPress={() => navigation.push('ProductDetail', {
          dataImages: productDetailData
        })}>
          <ImageBackground
            source={data.url}
            resizeMode={'cover'}
            borderTopLeftRadius={12}
            borderTopRightRadius={12}
            style={[styles.imageBackground, {
              backgroundColor: backgroundColor ? backgroundColor : theme.backgroundImageColor,
              borderRadius: 12
            }]} >
            <LinearGradient
              start={{ x: 0, y: 0 }} end={{ x: 2, y: 1 }}
              colors={!I18nManager.isRTL ? [theme.primary, theme.primary,] : [theme.primary, theme.primary]}
              style={styles.discountTag}>

              <Text
                numberOfLines={1}
                style={[styles.bold, {
                  color: theme.primaryTextColor,
                  fontSize: theme.appFontSize.smallSize,
                  fontFamily: theme.appFontSize.fontFamily
                }]}>{'Sale'}</Text>

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
        <View style={styles.reviewsRow}>
          <ReviewStar
            theme={theme}
            counterValue={3}
            starSize={theme.appFontSize.smallSize}
          ></ReviewStar>
        </View>
        <View style={styles.productNameView}>


          <Text
            numberOfLines={1}
            style={[styles.productNameText, {
              color: theme.textColor,
              fontSize: theme.appFontSize.mediumSize,
              fontFamily: theme.appFontSize.fontFamily
            }]}>{data.productName}</Text>


          <View style={styles.textContainer}>

            <Text
              numberOfLines={1}
              style={[styles.bold, {
                color: theme.primary,
                fontSize: theme.appFontSize.mediumSize,
                fontFamily: theme.appFontSize.fontFamily
              }]}>{'$12.00'}</Text>

            <Text style={[styles.discountPriceText, {
              color: theme.secondry,
              fontSize: theme.appFontSize.smallSize - 1,
              fontFamily: theme.appFontSize.fontFamily
            }]}>
              {'$550.62'}
            </Text>

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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
    marginTop: 5,
  },
  discountTag: {
    zIndex: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    left: 8,
    top: 8,
    borderRadius: 4,
    padding: 4,
    paddingHorizontal: 9
  },
  textContainer: { flexDirection: 'row', alignItems: 'center' },
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
    textAlign: 'left',
    paddingLeft: 8
  },
  productNameText: {
    paddingVertical: 3
  },
  bold: {
    fontWeight: 'bold'
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
    marginVertical: 6,
    marginTop: 0
  },
});

export default CardTen;
