import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Image,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import AddtoCartPopUpModal from '../../components/addtoCartPopUpModal';
import { appColorsType } from '../../redux/types/types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BannerThree from '../../components/banners/bannerThree';
import HeaderThree from '../../components/homeHeaders/headerThree';
import HorizontalCategory from '../../components/homeComponents/horizontalCategory';
import HotCategoryTwo from '../../components/homeComponents/hotCategoryTwo';
import Card from '../../components/cardStyles/card';
import renderFooter from '../../components/renderFooter';
import { bannersFive } from '../../components/data';
import WishlistCategory from '../../components/wishlistCategory';
import HorizontalCategoryTemp from '../../components/horizontalCategoryTemplate';
import { HEIGHT, WIDTH } from '../../components/config';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootHomeStackParamList } from '../../router/RootParams';
import ThemeChangeIcon from '../../components/themeChangeIcon';

type searchScreenProp = StackNavigationProp<RootHomeStackParamList, 'Shop'>;

interface IProps {
  theme: appColorsType;
  reduxLang?: any;
}


const App = ({
  theme,
  reduxLang
}: IProps) => {
  const navigation = useNavigation<searchScreenProp>();


  const categories = [{
    name: reduxLang.ArrowShirts, icon: 'graduation-cap',
    image: require('../../images/shirtsTwo/CustomSize43.png')
  },
  {
    name: reduxLang.PeterEnglandShirts, icon: 'headphones',
    image: require('../../images/shirtsTwo/CustomSize43.png')
  },
  {
    name: reduxLang.VanHeusenShirts, icon: 'book',
    image: require('../../images/shirtsTwo/CustomSize43.png')
  },
  {
    name: reduxLang.ZodiacShirts, icon: 'gift',
    image: require('../../images/shirtsTwo/CustomSize43.png')
  },
  {
    name: reduxLang.LouisPhillipeShirts, icon: 'bicycle',
    image: require('../../images/shirtsTwo/CustomSize43.png')
  },
  {
    name: reduxLang.JohnPlayersShirts, icon: 'car',
    image: require('../../images/shirtsTwo/CustomSize43.png')
  },
  {
    name: reduxLang.ParkAvenueShirts, icon: 'car',
    image: require('../../images/shirtsTwo/CustomSize43.png')
  },
  {
    name: reduxLang.ParxShirts, icon: 'car',
    image: require('../../images/shirtsTwo/CustomSize43.png')
  }]

  let [data, setdata] = useState([{
    url: require('../../images/shirtsTwo/CustomSize43.png'),
    productName: reduxLang.DressShirt,
    quantity: '120' + reduxLang.Products
  },
  {
    url: require('../../images/shirtsTwo/CustomSize43.png'),
    productName: reduxLang.CubanCollarShirt,
    quantity: '650' + reduxLang.Products
  },
  {
    url: require('../../images/shirtsTwo/CustomSize43.png'),
    productName: reduxLang.Overshirt,
    quantity: '432' + reduxLang.Products
  },
  {
    url: require('../../images/shirtsTwo/CustomSize43.png'),
    productName: reduxLang.FlannelShirt,
    quantity: '678' + reduxLang.Products
  },
  {
    url: require('../../images/shirtsTwo/CustomSize43.png'),
    productName: reduxLang.OfficeShirt,
    quantity: '789' + reduxLang.Products
  },
  {
    url: require('../../images/shirtsTwo/CustomSize43.png'),
    productName: reduxLang.Chambray,
    quantity: '120' + reduxLang.Products
  },
  {
    url: require('../../images/shirtsTwo/CustomSize43.png'),
    productName: reduxLang.ClassicShortSleeveShirt,
    quantity: '650' + reduxLang.Products
  },
  {
    url: require('../../images/shirtsTwo/CustomSize43.png'),
    productName: reduxLang.DenimShirt,
    quantity: '432' + reduxLang.Products
  },
  {
    url: require('../../images/shirtsTwo/CustomSize43.png'),
    productName: reduxLang.LinenShirt,
    quantity: '678' + reduxLang.Products
  },
  {
    url: require('../../images/shirtsTwo/CustomSize43.png'),
    productName: reduxLang.Chambray,
    quantity: '678' + reduxLang.Products
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



      <HeaderThree
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
            index={item.index}
            productDetailData={data}
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

        ListHeaderComponent={<View>

          <HorizontalCategory
            backgroundColor={theme.secondryBackgroundColor}
            iconColor={theme.textColor}
            theme={theme}
            reduxLang={reduxLang} />


          <BannerThree images={bannersFive}
            theme={theme}
            reduxLang={reduxLang}
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

          <TouchableOpacity onPress={() => navigation.navigate('Shop')}>
            <Image
              key={1}
              source={bannersFive[2]}
              style={styles.bannerImage}
            />
          </TouchableOpacity>
          <View style={styles.marginVer} />

          <HorizontalCategoryTemp
            headingText={reduxLang.MensCollections}
            fontSize={theme.appFontSize.largeSize}
            navigationScreen={'Shop'}
            productDetailData={data}
            cardSty={5}
            theme={theme}
            backgroundColor={theme.primaryBackgroundColor}
            reduxLang={reduxLang} />

          <HotCategoryTwo
            paddingHorizontal={-5}
            categories={categories}
            theme={theme}
            reduxLang={reduxLang} />


          <Text style={[styles.headingText,
          {
            color: theme.textColor,
            fontSize: theme.appFontSize.largeSize,
            fontFamily: theme.appFontSize.fontFamily
          }
          ]}>
            {reduxLang.YouMayLike}
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
    paddingVertical: 15
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
  bannerImage: {
    width: WIDTH * 0.95,
    alignSelf: 'center',
    height: HEIGHT * 0.15,
    resizeMode: 'cover'
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
