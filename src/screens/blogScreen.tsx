import React, { useRef, useState, useLayoutEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet, Text, FlatList, TouchableOpacity,
  Image,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { appColorsType } from '../redux/types/types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import renderFooter from '../components/renderFooter';
import { cartData } from '../components/data';
import { WIDTH } from '../components/config';

type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
  Shop: undefined;
  Search: undefined;
  Category: undefined;
  BlogDetails: undefined;
};
interface IProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Search' | 'Shop' | 'Category' | 'Detail' | 'Home'>;
  theme: appColorsType;
  reduxLang: any;
}


const App = ({
  navigation,
  theme,
  reduxLang
}: IProps) => {
  // Header Settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: reduxLang.Blog,
      headerStyle: {
        backgroundColor: theme.secondryBackgroundColor
      },
      headerTintColor: theme.textColor,
    });
  }, [
    navigation,
    reduxLang.Category,
    theme.secondryBackgroundColor,
    theme.textColor,
  ]);
  let [data, setdata] = useState(cartData)

  const [loader, setLoader] = useState(true)
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


      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={1}
        removeClippedSubviews={true}
        legacyImplementation={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={10}
        keyExtractor={(item, index) => index.toString()}
        data={data}
        renderItem={(item) =>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('BlogDetails')
            }}
            style={{
              width: WIDTH,
              justifyContent: 'center', alignItems: 'center'
            }}>
            <Image
              source={require('../images/shirtsTwo/Banner8.png')}
              resizeMode={'cover'}
              style={[styles.imageBackground, {
                backgroundColor: theme.backgroundImageColor
              }]} />

            <Text style={[{
              color: theme.secondry,
              fontSize: theme.appFontSize.smallSize,
              fontFamily: theme.appFontSize.fontFamily
            }]}>
              {'March 4, 2016'}
            </Text>

            <Text style={[styles.headingText, {
              color: theme.textColor,
              fontSize: theme.appFontSize.largeSize + 4,
              fontFamily: theme.appFontSize.fontFamily,
            }]}>
              {reduxLang.WebSiteTourist}
            </Text>

            <Text style={[styles.bodyText, {
              color: theme.textColor,
              fontSize: theme.appFontSize.mediumSize,
              fontFamily: theme.appFontSize.fontFamily,
            }]}>
              {reduxLang.GlobalText}
            </Text>
          </TouchableOpacity>
        }
        ref={scrollRef}
        ListFooterComponent={renderFooter(theme, loader)}
        onScroll={handleScroll}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        onMomentumScrollBegin={() => {
          onEnDReachedCalledDuringMomentum = false
        }}
      />

    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  headingText: {
    padding: 10,
    fontWeight: 'bold',
    textAlign: Platform.OS === 'ios' ? 'left' : 'auto',
  },
  bodyText: {
    padding: 10,
    textAlign: 'left',
    paddingTop: 0,
  },
  imageBackground: {
    height: 200,
    width: WIDTH * 0.95,
    margin: 6,
    marginTop: 10,
    borderRadius: 8,
    alignSelf: 'center'
  },
});

const mapStateToProps = (state: any) => ({
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang
});

export default connect(mapStateToProps, null)(App);
