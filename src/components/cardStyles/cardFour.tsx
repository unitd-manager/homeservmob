import React from 'react';
import {
  StyleSheet,
  Text, View,
  TouchableOpacity,
  ImageBackground,
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

const CardTwo = ({ data, theme, backgroundColor,
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
              backgroundColor: backgroundColor ? backgroundColor : theme.backgroundImageColor
            }]} >
            <TouchableOpacity style={styles.heartIcon}>
              <Ionicons
                style={[styles.heartIconStyle,
                {
                  fontSize: theme.appFontSize.largeSize + 1
                }]}
                name={"heart-outline"}
              />
            </TouchableOpacity>

            <View style={[styles.productNameView, {
              backgroundColor: theme.primaryBackgroundColor
            }]}>

              <Text
                numberOfLines={1}
                style={[styles.productNameText, {
                  color: theme.textColor,
                  fontSize: theme.appFontSize.smallSize,
                  fontFamily: theme.appFontSize.fontFamily
                }]}>{data.productName}</Text>

              <View style={styles.priceRowInnerContainer}>

                <Text style={[styles.productPriceText, {
                  color: theme.textColor,
                  fontSize: theme.appFontSize.mediumSize,
                  fontFamily: theme.appFontSize.fontFamily
                }]}>
                  {'$550.62'}
                </Text>

                <Text style={[styles.discountPriceText, {
                  color: theme.secondry,
                  fontSize: theme.appFontSize.smallSize,
                  fontFamily: theme.appFontSize.fontFamily
                }]}>
                  {'$550.62'}
                </Text>


              </View>

            </View>
          </ImageBackground>
        </TouchableOpacity>


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    margin: 4
  },
  priceRowInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountPriceText: {
    textDecorationLine: 'line-through',
    textAlign: 'left',
    paddingHorizontal: 5
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
    right: 10,
    top: 7,
  },
  heartIconStyle: {
    color: '#000000',
    paddingTop: 1,
    alignSelf: 'center'
  },
  productPriceText: {
    fontWeight: 'bold',
    textAlign: 'left',
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
    height: HEIGHT * 0.24,
    width: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  productNameView: {
    alignItems: 'center',
    marginVertical: 6,
    borderRadius: 18,
    padding: 1,
    paddingTop: 0,
    bottom: 0,
    zIndex: 20,
    position: 'absolute',
    width: '93%',
    alignSelf: 'center'
  },
});

export default CardTwo;
