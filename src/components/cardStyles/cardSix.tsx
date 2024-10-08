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
import CustomBtn from '../customBtn';
import { StackNavigationProp } from '@react-navigation/stack';

type productDetailScreenProp = StackNavigationProp<RootHomeStackParamList, 'ProductDetail'>;

interface IProps {
  data: { url: any, productName: string, quantity: string };
  productDetailData: { url: any, productName: string, quantity: string }[];
  theme: appColorsType;
  addToCartFun: () => void;
  backgroundColor?: string;
  index: number;
  reduxLang: any;
}

const CardOne = ({ data, theme, addToCartFun, backgroundColor,
  index, productDetailData, reduxLang }: IProps) => {
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
              colors={!I18nManager.isRTL ? [theme.primary, theme.primary,] : [theme.primary, theme.primary]}
              style={styles.discountTag}>

              <Text
                numberOfLines={1}
                style={[styles.bold, {
                  color: theme.primaryTextColor,
                  fontSize: theme.appFontSize.smallSize,
                  fontFamily: theme.appFontSize.fontFamily
                }]}>{'20%'}</Text>

            </LinearGradient>

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

          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>

            <Text
              numberOfLines={1}
              style={[styles.bold, {
                color: theme.primary,
                fontSize: theme.appFontSize.mediumSize,
                fontFamily: theme.appFontSize.fontFamily
              }]}>{'$12.00'}</Text>


            <Text style={[styles.discountPriceText, {
              color: theme.secondry,
              fontSize: theme.appFontSize.smallSize,
              fontFamily: theme.appFontSize.fontFamily
            }]}>
              {'$550.62'}
            </Text>
          </View>
          <CustomBtn
            textColor={theme.primaryTextColor}
            textSize={theme.appFontSize.smallSize}
            backgroundColor={theme.primary}
            paddingVertical={6}
            borderRadius={1} width={'100%'}
            onPressFun={addToCartFun}
            theme={theme} title={reduxLang.ADDTOCART}></CustomBtn>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    margin: 4,
    elevation: 0.6,
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
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
    alignSelf: 'flex-start',
    left: 8,
    top: 8,
    borderRadius: 36,
    height: 33,
    width: 33
    // padding: 4,
    // paddingVertical: 11
    // paddingHorizontal: 6
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
    textAlign: 'left',
    marginHorizontal: 8
  },
  flashRow: {
    padding: 6
  },
  productNameText: {
    padding: 5,
    paddingBottom: 1
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
    // marginHorizontal: 10,
    alignItems: 'flex-start',
    // marginVertical: 6
  },
});

export default CardOne;
