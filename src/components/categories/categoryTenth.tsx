import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions, Text, View,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import { appColorsType } from '../../redux/types/types';
const WIDTH = Dimensions.get('window').width;
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from '@react-navigation/native';
import { RootHomeStackParamList } from '../../router/RootParams';
import { StackNavigationProp } from '@react-navigation/stack';
import { bannersFive, bannersOne, bannersThree, bannersTwo } from '../data';
import { HEIGHT } from '../config';

type ScreenProp = StackNavigationProp<RootHomeStackParamList, 'Shop'>;

interface IProps {
  data: { url: any, productName: string, quantity: string }[];
  theme: appColorsType;
  reduxLang: any;
  subCategory: { url: any, productName: string, quantity: string }[];
  headPhones: { url: any, productName: string, quantity: string }[];
  mensData: { url: any, productName: string, quantity: string }[];
  groceryData: { url: any, productName: string, quantity: string }[];
}

const IconList = [{ icon: 'male' },
{ icon: 'headphones' },
{ icon: 'coffee' },
{ icon: 'wheelchair' },
{ icon: 'child' }]

const verticalCard = (navigation: ScreenProp,
  index: number, theme: appColorsType, url: any,
  name: string, setselectedCategory: (type: number) => void, selectedCategory: number) => (
  <TouchableOpacity
    key={index}
    onPress={() => setselectedCategory(index)}
    style={[styles.touchableOpacity, {
      backgroundColor: selectedCategory === index ?
        theme.primaryBackgroundColor : theme.secondryBackgroundColor,
      padding: 16,
      borderLeftWidth: 4,
      borderLeftColor: selectedCategory === index ? theme.primary : theme.secondryBackgroundColor
    }]}
  >
    <FontAwesome name={IconList[index].icon} style={[{
      color: selectedCategory === index ? theme.primary : theme.textColor,
      fontSize: theme.appFontSize.largeSize + 18,
    }]} />
    <View style={[styles.productNameView, { paddingTop: 4 }]}>
      <Text style={{
        fontSize: theme.appFontSize.smallSize,
        fontFamily: theme.appFontSize.fontFamily,
        color: theme.textColor,
        textAlign: 'center'
      }}>{name}</Text>

    </View>
  </TouchableOpacity>
)

const horizontalCard = (navigation: ScreenProp,
  index: number, theme: appColorsType, url: any,
  name: string) => (
  <TouchableOpacity
    key={index}
    onPress={() => navigation.navigate('Shop')}
    style={[styles.touchableOpacity, { paddingLeft: 2 }]}
  >
    <Image source={url}
      resizeMode={'cover'}
      style={[styles.imageBackground, {
        backgroundColor: theme.backgroundImageColor
      }]} />
    <View style={styles.productNameView}>
      <Text numberOfLines={1} style={{
        fontSize: theme.appFontSize.smallSize,
        fontFamily: theme.appFontSize.fontFamily,
        color: theme.textColor,
        width: WIDTH * 0.15,
        textAlign: 'center'
      }}>{name}</Text>

    </View>
  </TouchableOpacity>
)

const CategoryCardFive = ({ data, theme, subCategory,
  headPhones,
  mensData,
  groceryData, reduxLang }: IProps) => {
  const navigation = useNavigation<ScreenProp>();
  const [selectedCategory, setselectedCategory] = useState(0);

  return (
    <View style={styles.mainContainer}>
      <View style={{ flex: 1, backgroundColor: theme.secondryBackgroundColor, alignItems: 'center' }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => 'key' + index}
          // data={[...data, ...data]}
          data={data}
          showsHorizontalScrollIndicator={false}
          renderItem={(item) =>
            verticalCard(navigation, item.index, theme, item.item.url, item.item.productName, setselectedCategory,
              selectedCategory)
          } />
      </View>
      <View style={[styles.container, {
        backgroundColor: theme.primaryBackgroundColor
      }]}>

        <FlatList
          keyExtractor={(item, index) => 'key' + index}
          data={['']}
          showsHorizontalScrollIndicator={false}
          renderItem={(item) =>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('Shop')}>
                <Image
                  key={1}
                  source={selectedCategory === 0 ? bannersFive[2]
                    : selectedCategory === 1 ? bannersOne[2] :
                      selectedCategory === 2 ? bannersThree[2] :
                        selectedCategory === 3 ? bannersTwo[2] :
                          bannersFive[0]}
                  style={styles.bannerImage}
                />
              </TouchableOpacity>

              <Text style={[styles.headingText, {
                color: theme.textColor,
                fontSize: theme.appFontSize.largeSize,
                fontFamily: theme.appFontSize.fontFamily
              }]}>
                {reduxLang['HotCategory']}
              </Text>
              <View>{
                selectedCategory === 0 ?
                  <View style={styles.innerContainer}>
                    {mensData.map((value, index) =>
                    (
                      horizontalCard(navigation, index, theme, value.url, value.productName)
                    ))}
                  </View>
                  : selectedCategory === 1 ?
                    <View style={styles.innerContainer}>
                      {headPhones.map((value, index) =>
                      (
                        horizontalCard(navigation, index, theme, value.url, value.productName)
                      ))}
                    </View>
                    : selectedCategory === 2 ?
                      <View style={styles.innerContainer}>
                        {groceryData.map((value, index) =>
                        (
                          horizontalCard(navigation, index, theme, value.url, value.productName)
                        ))}
                      </View>
                      : selectedCategory === 3 ?
                        <View style={styles.innerContainer}>
                          {subCategory.map((value, index) =>
                          (
                            horizontalCard(navigation, index, theme, value.url, value.productName)
                          ))}
                        </View>
                        :
                        <View style={styles.innerContainer}>
                          {mensData.map((value, index) =>
                          (
                            horizontalCard(navigation, index, theme, value.url, value.productName)
                          ))}
                        </View>
              }
              </View>
            </View>
          } />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    flex: 1
  },
  container: {
    flex: 3,
    paddingLeft: 15
  },
  innerContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignContent: 'center',
    flexDirection: 'row',
    paddingLeft: '2.1%'
  },
  touchableOpacity: {
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10
  },
  headingText: {
    fontWeight: 'bold',
    margin: 10,
    marginBottom: 5,
    marginTop: 15
  },
  imageBackground: {
    height: 65,
    width: WIDTH * 0.17,
    alignItems: 'center', justifyContent: 'center',
    margin: 2,
    borderRadius: 5
  },
  productNameView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8
  },
  bannerImage: {
    width: WIDTH * 0.65,
    alignSelf: 'center',
    height: HEIGHT * 0.11,
    resizeMode: 'cover',
    borderRadius: 12,
    marginTop: 10
  },

});


export default CategoryCardFive;
