import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet, Text, FlatList, TouchableOpacity, View,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { appColorsType } from '../../redux/types/types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HeadrOne from '../../components/homeHeaders/headerFive';
import Card from '../../components/cardStyles/card';
import HorizontalCategory from '../../components/homeComponents/horizontalCategoryBorder';
import renderFooter from '../../components/renderFooter';
import { HEIGHT } from '../../components/config';
import AddtoCartPopUpModal from '../../components/addtoCartPopUpModal';
import ThemeChangeIcon from '../../components/themeChangeIcon';

interface IProps {
  theme: appColorsType;
  reduxLang?: any;
}
const App = ({
  theme,
  reduxLang
}: IProps) => {


  const [addtoCartmodalVisible, setaddtoCartModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = React.useState(0);

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
    productName: reduxLang.Chambray,
    quantity: '120 Products'
  },
  {
    url: require('../../images/shirtsTwo/CustomSize43.png'),
    productName: reduxLang.LinenShirt,
    quantity: '650 Products'
  },
  {
    url: require('../../images/shirtsTwo/CustomSize43.png'),
    productName: reduxLang.DenimShirt,
    quantity: '432 Products'
  },
  {
    url: require('../../images/shirtsTwo/CustomSize43.png'),
    productName: reduxLang.ClassicShortSleeveShirt,
    quantity: '678 Products'
  },
  {
    url: require('../../images/shirtsTwo/CustomSize43.png'),
    productName: reduxLang.Chambray,
    quantity: '789 Products'
  },
  {
    url: require('../../images/shirtsTwo/CustomSize43.png'),
    productName: reduxLang.OfficeShirt,
    quantity: '120 Products'
  },
  {
    url: require('../../images/shirtsTwo/CustomSize43.png'),
    productName: reduxLang.FlannelShirt,
    quantity: '650 Products'
  },
  {
    url: require('../../images/shirtsTwo/CustomSize43.png'),
    productName: reduxLang.Overshirt,
    quantity: '432 Products'
  },
  {
    url: require('../../images/shirtsTwo/CustomSize43.png'),
    productName: reduxLang.CubanCollarShirt,
    quantity: '678 Products'
  },
  {
    url: require('../../images/shirtsTwo/CustomSize43.png'),
    productName: reduxLang.DressShirt,
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
      <AddtoCartPopUpModal
        productDetailData={data}
        theme={theme}
        reduxLang={reduxLang}
        addtoCartmodalVisible={addtoCartmodalVisible}
        setaddtoCartModalVisible={setaddtoCartModalVisible}
      />
      <HeadrOne
        theme={theme}
        reduxLang={reduxLang} />

      <ThemeChangeIcon theme={theme} />

      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        style={{marginTop: 6}}
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
        ListFooterComponent={
          loader ?
            <View style={styles.loaderView}>
              {renderFooter(theme, loader)
              }
            </View>
            :
            renderFooter(theme, screenLoader)
        }
        onScroll={handleScroll}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        onMomentumScrollBegin={() => {
          onEnDReachedCalledDuringMomentum = false
        }}

        ListHeaderComponent={<View>

          <HorizontalCategory
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
    marginBottom: 0,
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
