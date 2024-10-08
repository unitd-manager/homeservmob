import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet, Text, FlatList, TouchableOpacity, View, Animated,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import AddtoCartPopUpModal from '../../components/addtoCartPopUpModal';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { appColorsType } from '../../redux/types/types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BannerTwo from '../../components/banners/bannerTwo';
import HeadrOne from '../../components/homeHeaders/headerOne';
import HorizontalCategoryTwo from '../../components/homeComponents/horizontalCategoryTwo';
import FlashCategoryTwo from '../../components/homeComponents/flashCategoryTwo';
import HotCategoryTwo from '../../components/homeComponents/hotCategoryTwo';
import Card from '../../components/cardStyles/card';
import renderFooter from '../../components/renderFooter';
import { bannersOne, images } from '../../components/data';
import { HEIGHT } from '../../components/config';
import ThemeChangeIcon from '../../components/themeChangeIcon';

type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
  Shop: undefined;
  Search: undefined;
  Category: undefined;
};
interface IProps {
  navigation?: NativeStackNavigationProp<RootStackParamList, 'Search' | 'Shop' | 'Category' | 'Detail' | 'Home'>;
  theme: appColorsType;
  reduxLang?: any;
}
const App = ({
  navigation,
  theme,
  reduxLang
}: IProps) => {


  const yOffset = useRef(new Animated.Value(0)).current;
  const headerOpacity = yOffset.interpolate({
    inputRange: [0, 400],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const categories = [{
    name: reduxLang.JBL, icon: 'graduation-cap',
    image: require('../../images/headPhone/CustomSize3.png')
  },
  {
    name: reduxLang.Sony, icon: 'headphones',
    image: require('../../images/headPhone/CustomSize3.png')
  },
  {
    name: reduxLang.BangOlufsen, icon: 'book',
    image: require('../../images/headPhone/CustomSize3.png')
  },
  {
    name: reduxLang.Bose, icon: 'gift',
    image: require('../../images/headPhone/CustomSize3.png')
  },
  {
    name: reduxLang.BeatsbyDre, icon: 'bicycle',
    image: require('../../images/headPhone/CustomSize3.png')
  },
  {
    name: reduxLang.Skullcandy, icon: 'car',
    image: require('../../images/headPhone/CustomSize3.png')
  },
  {
    name: reduxLang.Beyerdynamic, icon: 'car',
    image: require('../../images/headPhone/CustomSize3.png')
  },
  {
    name: reduxLang.AKGAcoustics, icon: 'car',
    image: require('../../images/headPhone/CustomSize3.png')
  }]

  const [addtoCartmodalVisible, setaddtoCartModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = React.useState(0);
  let [data, setdata] = useState([{
    url: require('../../images/headPhone/CustomSize3.png'),
    productName: reduxLang.JBL,
    quantity: '120 Products'
  },
  {
    url: require('../../images/headPhone/CustomSize3.png'),
    productName: reduxLang.Sony,
    quantity: '650 Products'
  },
  {
    url: require('../../images/headPhone/CustomSize3.png'),
    productName: reduxLang.Sony,
    quantity: '432 Products'
  },
  {
    url: require('../../images/headPhone/CustomSize3.png'),
    productName: reduxLang.Bose,
    quantity: '678 Products'
  },
  {
    url: require('../../images/headPhone/CustomSize3.png'),
    productName: reduxLang.BeatsbyDre,
    quantity: '789 Products'
  },
  {
    url: require('../../images/headPhone/CustomSize3.png'),
    productName: reduxLang.Skullcandy,
    quantity: '120 Products'
  },
  {
    url: require('../../images/headPhone/CustomSize3.png'),
    productName: reduxLang.Beyerdynamic,
    quantity: '650 Products'
  },
  {
    url: require('../../images/headPhone/CustomSize3.png'),
    productName: reduxLang.AKGAcoustics,
    quantity: '432 Products'
  },
  {
    url: require('../../images/headPhone/CustomSize3.png'),
    productName: reduxLang.Skullcandy,
    quantity: '678 Products'
  },
  {
    url: require('../../images/headPhone/CustomSize3.png'),
    productName: reduxLang.Beyerdynamic,
    quantity: '789 Products'
  }])
  const [loader, setLoader] = useState(false)
  const [screenLoader, setScreenLoader] = useState(true)

  const [fab, setFab] = useState(false)
  let scrollRef = useRef<FlatList | null>(null);
  let onEnDReachedCalledDuringMomentum

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
      setScreenLoader(true)
      const delay = setInterval(function () {
        setScreenLoader(false)
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
      <Animated.View
        style={[{
          opacity: headerOpacity
        }, styles.headerView]}>
        <HeadrOne
          theme={theme}
          reduxLang={reduxLang} />
      </Animated.View>

      <ThemeChangeIcon theme={theme} />

      <Animated.FlatList
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
        ListFooterComponent={
          loader ?
            <View style={styles.loaderView}>
              {renderFooter(theme, loader)
              }
            </View>
            :
            renderFooter(theme, screenLoader)
        }
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: yOffset,
                },
              },
            },

          ],
          {
            listener: (event) => handleScroll(event),
            useNativeDriver: true
          }
        )}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        onMomentumScrollBegin={() => {
          onEnDReachedCalledDuringMomentum = false
        }}

        ListHeaderComponent={<View>


          <BannerTwo images={bannersOne}
            theme={theme}
            reduxLang={reduxLang}
            autoMove={true}
          />

          <HorizontalCategoryTwo
            theme={theme}
            reduxLang={reduxLang} />

          <FlashCategoryTwo
            productDetailData={data}
            categories={categories}
            theme={theme}
            reduxLang={reduxLang} />

          <HotCategoryTwo
            categories={categories}
            theme={theme}
            reduxLang={reduxLang} />

          <FlatList
            showsHorizontalScrollIndicator={false}
            data={categories}
            horizontal
            contentContainerStyle={{
              paddingHorizontal: 10
            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={item => (
              <TouchableOpacity
                onPress={() => {
                  if (selectedTab !== item.index) {
                    setdata([])
                    setLoader(true)
                    const delay = setInterval(function () {
                      setdata(data)
                      setLoader(false)
                      clearInterval(delay)
                    }, 2000)
                    setSelectedTab(item.index)
                  }
                }
                }
                style={[styles.selectedTabStyles]}>

                <Text style={[styles.horiCategoryText, {
                  color: selectedTab === item.index ? theme.textColor : theme.primaryDark,
                  fontSize: theme.appFontSize.mediumSize,
                  fontFamily: theme.appFontSize.fontFamily,
                  fontWeight: selectedTab === item.index ? 'bold' : 'normal'
                }]}>
                  {item.item.name}
                </Text>
                {selectedTab === item.index ?
                  <View style={[styles.selectedBorder,
                  { backgroundColor: theme.primary }]} /> : <View />}
              </TouchableOpacity>

            )}
          />


        </View>
        }

      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fabIcon: {
    paddingBottom: 2
  },
  headerView: {
    zIndex: 20,
    position: 'absolute',
    top: 0
  },
  loaderView: {
    height: HEIGHT / 2,
    justifyContent: 'flex-start',
    alignItems: 'center'
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
  colWrapper: {
    justifyContent: 'space-between',
    margin: 5,
    marginTop: 0,
    marginBottom: 0
  },
  selectedTabStyles: {
    marginHorizontal: 2,
    padding: 2,
    marginTop: 10
  },
  horiCategoryText: {
    paddingHorizontal: 6
  },
  selectedBorder: {
    padding: 2,
    borderRadius: 18,
    marginVertical: 8
  },
});

const mapStateToProps = (state: any) => ({
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang
});

export default connect(mapStateToProps, null)(App);
