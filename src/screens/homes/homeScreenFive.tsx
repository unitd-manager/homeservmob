import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import AddtoCartPopUpModal from '../../components/addtoCartPopUpModal';
import { appColorsType } from '../../redux/types/types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BannerOne from '../../components/banners/bannerOne';
import HeaderFour from '../../components/homeHeaders/headerFour';
import HorizontalCategoryThree from '../../components/homeComponents/horizontalCategoryThree';
import Card from '../../components/cardStyles/card';
import renderFooter from '../../components/renderFooter';
import { bannersThree, images } from '../../components/data';
import WishlistCategory from '../../components/wishlistCategory';
import HorizontalCategoryTemp from '../../components/horizontalCategoryTemplate';
import { WIDTH } from '../../components/config';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootHomeStackParamList } from '../../router/RootParams';
import ThemeChangeIcon from '../../components/themeChangeIcon';
const HEIGHT = WIDTH * 0.4;
type searchScreenProp = StackNavigationProp<RootHomeStackParamList, 'Search'>;

interface IProps {
  theme: appColorsType;
  reduxLang?: any;
}


const App = ({
  theme,
  reduxLang
}: IProps) => {
  const navigation = useNavigation<searchScreenProp>();

  const categories = [{ name: reduxLang.Shirts, icon: 'graduation-cap' },
  { name: reduxLang.headphones, icon: 'headphones' },
  { name: reduxLang.Books, icon: 'book' },
  { name: reduxLang.Gift, icon: 'gift' },
  { name: reduxLang.Bikes, icon: 'bicycle' },
  { name: reduxLang.Cars, icon: 'car' }]



  let [data, setdata] = useState([{
    url: require('../../images/grocery/CustomSize10.png'),
    productName: reduxLang.Apple,
    quantity: '120 ' + reduxLang.Products
  },
  {
    url: require('../../images/grocery/CustomSize10.png'),
    productName: reduxLang.Mango,
    quantity: '650 ' + reduxLang.Products
  },
  {
    url: require('../../images/grocery/CustomSize10.png'),
    productName: reduxLang.Strawberry,
    quantity: '432 ' + reduxLang.Products
  },
  {
    url: require('../../images/grocery/CustomSize10.png'),
    productName: reduxLang.Tomato,
    quantity: '678 ' + reduxLang.Products
  },
  {
    url: require('../../images/grocery/CustomSize10.png'),
    productName: reduxLang.Cauliflower,
    quantity: '789 ' + reduxLang.Products
  },
  {
    url: require('../../images/grocery/CustomSize10.png'),
    productName: reduxLang.Biscute,
    quantity: '120 ' + reduxLang.Products
  },
  {
    url: require('../../images/grocery/CustomSize10.png'),
    productName: reduxLang.Lays,
    quantity: '650 ' + reduxLang.Products
  },
  {
    url: require('../../images/grocery/CustomSize10.png'),
    productName: reduxLang.Chocklate,
    quantity: '678 ' + reduxLang.Products
  },
  {
    url: require('../../images/grocery/CustomSize10.png'),
    productName: reduxLang.Chocklate,
    quantity: '120 ' + reduxLang.Products
  },
  {
    url: require('../../images/grocery/CustomSize10.png'),
    productName: reduxLang.Mango,
    quantity: '678 ' + reduxLang.Products
  }])

  const [loader, setLoader] = useState(true)
  const [fab, setFab] = useState(false)
  let scrollRef = useRef<FlatList | null>(null);
  let onEnDReachedCalledDuringMomentum

  const [addtoCartmodalVisible, setaddtoCartModalVisible] = useState(false);

  const handleScroll = (event: any) => {
    if (
      fab &&
      event.nativeEvent.contentOffset.y >= 0 &&
      event.nativeEvent.contentOffset.y < 300
    ) {
      setFab(false)
    }
  }

  const onEndReached = () => {
    handleLoadMore()
    onEnDReachedCalledDuringMomentum = true
  }

  const handleLoadMore = () => {
    if (data.length > 9) {
      setFab(true)
    }
    if (data.length < 20) {
      setLoader(true)
      const delay = setInterval(function () {
        setLoader(false)
        let temp = data.concat(data)
        setdata(temp)
        clearInterval(delay)
      }, 3000)
    }
  }


  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.primaryBackgroundColor },
      ]}>
      <StatusBar barStyle={theme.barStyle} backgroundColor={theme.StatusBarColor} />

      {/* //fab Button */}

      {fab ? (
        <TouchableOpacity
          style={[styles.fabStyle, {
            backgroundColor: theme.primary,
          }]}
          onPress={() => {
            scrollRef?.current?.scrollToOffset({
              animated: true,
              offset: 0
            })
            setFab(false)
          }}>
          <FontAwesome
            name={'chevron-up'}
            style={[styles.fabIcon, {
              color: theme.secondryBackgroundColor,
              fontSize: theme.appFontSize.largeSize
            }]}
          />
        </TouchableOpacity>
      ) : null
      }

      {/* // Modal  start */}

      <AddtoCartPopUpModal
        productDetailData={data}
        theme={theme}
        reduxLang={reduxLang}
        addtoCartmodalVisible={addtoCartmodalVisible}
        setaddtoCartModalVisible={setaddtoCartModalVisible}
      />



      <HeaderFour
        theme={theme}
        reduxLang={reduxLang} />

      <ThemeChangeIcon theme={theme} />

      <FlatList
        windowSize={50}
        initialNumToRender={3}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        removeClippedSubviews={true}
        legacyImplementation={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={10}
        keyExtractor={(item, index) => index.toString()}
        data={data}
        columnWrapperStyle={styles.colWrapper}
        renderItem={(item) =>
          <Card
            data={item.item}
            productDetailData={data}
            index={item.index}
            theme={theme}
            addToCartFun={() => setaddtoCartModalVisible(!addtoCartmodalVisible)}
          />
        }
        ref={scrollRef}
        ListFooterComponent={renderFooter(theme, loader)}
        onScroll={handleScroll}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        onMomentumScrollBegin={() => {
          onEnDReachedCalledDuringMomentum = false
        }}

        ListHeaderComponent={
          <View>
            <View style={[styles.listViewStyle, {
              backgroundColor: theme.primary
            }]}>
              <View style={[styles.listViewStyle, {
                backgroundColor: theme.primaryBackgroundColor,
                paddingBottom: 12
              }]}>
                <HorizontalCategoryThree
                  backgroundColor={'transparent'}
                  iconColor={theme.textColor}
                  theme={theme}
                  reduxLang={reduxLang} />
              </View>

              <Text style={[styles.headingText,
              {
                color: theme.textColor,
                fontSize: theme.appFontSize.largeSize + 6,
                fontFamily: theme.appFontSize.fontFamily
              }
              ]}>
                {reduxLang.Searchforaproduct}
              </Text>

              <TouchableOpacity
                onPress={() => navigation.navigate('Search')}
                style={[styles.searchTextView, {
                  backgroundColor: theme.primaryBackgroundColor
                }]}>
                <Text
                  style={[
                    styles.textInput,
                    {
                      color: 'gray',
                      fontSize: theme.appFontSize.mediumSize,
                      fontFamily: theme.appFontSize.fontFamily
                    },
                  ]}
                >
                  {reduxLang.Search}
                </Text>

                <FontAwesome
                  style={{
                    color: theme.secondry,
                    fontSize: theme.appFontSize.largeSize,
                  }
                  }
                  name={'search'}
                />

              </TouchableOpacity>
            </View>

            <BannerOne images={bannersThree}
              theme={theme}
              height={HEIGHT}
              autoMove={true}
            />

            <View style={styles.marginVer} />

            <WishlistCategory
              fontSize={theme.appFontSize.largeSize}
              productDetailData={data}
              theme={theme}
              backgroundColor={theme.primaryBackgroundColor}
              reduxLang={reduxLang} />

            <View style={styles.marginVer} />

            <HorizontalCategoryTemp
              productDetailData={data}
              headingText={reduxLang.NewCollections}
              fontSize={theme.appFontSize.largeSize}
              navigationScreen={'Shop'}
              cardSty={1}
              theme={theme}
              backgroundColor={theme.primaryBackgroundColor}
              reduxLang={reduxLang} />

            <HorizontalCategoryTemp
              productDetailData={data}
              navigationScreen={'Shop'}
              headingText={reduxLang.OnSale}
              fontSize={theme.appFontSize.largeSize}
              cardSty={4}
              theme={theme}
              backgroundColor={theme.primaryBackgroundColor}
              reduxLang={reduxLang} />

            <Text style={[styles.headingText,
            {
              color: theme.textColor,
              fontSize: theme.appFontSize.largeSize + 1,
              fontFamily: theme.appFontSize.fontFamily
            }
            ]}>
              {reduxLang.Recomended}
            </Text>
          </View>}

      />

    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingText: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 18
  },
  marginVer: {
    marginVertical: 5
  },
  fabIcon: {
    paddingBottom: 2
  },
  fabStyle: {
    zIndex: 5,
    position: 'absolute',
    right: 25,
    bottom: 50,
    alignItems: 'center',
    height: 46,
    width: 46,
    borderRadius: 400,
    alignSelf: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listViewStyle: {
    paddingBottom: 30,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40
  },
  searchTextView: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 32,
    borderColor: 'gray',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 0.2,
    padding: 12,
    paddingHorizontal: 14,
    alignSelf: 'center',
  },
  textInput: {
    alignSelf: 'flex-start'
  },
  colWrapper: {
    justifyContent: 'space-between',
    margin: 5,
    marginTop: 0,
    marginBottom: 0
  }
});

const mapStateToProps = (state: any) => ({
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang
});

export default connect(mapStateToProps, null)(App);
