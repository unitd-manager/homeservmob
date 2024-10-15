import React, { useRef, useState, useEffect,useLayoutEffect } from "react"
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  backgroundColor,
  View,
  Image,
  Alert,
  StatusBar
} from "react-native"
import { connect } from "react-redux"
import { HEIGHT } from "../../components/config"
import { HEADER_IOS_HEIGHT, HEADER_ANDROID_HEIGHT, } from "../../components/config"
import ReviewStar from "../../components/reviewStar"
import AddtoCartPopUpModal from "../../components/addtoCartPopUpModal"
import AsyncStorage from "@react-native-async-storage/async-storage"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import BannerOne from "../../components/banners/bannerOne"
import HeaderOne from "../../components/homeHeaders/headerOne"
import HorizontalCategory from "../../components/homeComponents/horizontalCategory"
import FlashCategory from "../../components/homeComponents/flashCategory"
import HotCategory from "../../components/homeComponents/hotCategory"
import DailyFeatured from "../../components/homeComponents/dailyFeatured"
import Card from "../../components/cardStyles/card"
import renderFooter from "../../components/renderFooter"
import ThemeChangeIcon from "../../components/themeChangeIcon"
import { useNavigation } from "@react-navigation/native"
import api from "../../constants/api"

const App = ({ theme, reduxLang,textSize,icon }) => {

  const navigation = useNavigation()
  const [user, setUserData] = useState();
  const [sliderData, setSliderData] = useState([])
  const [title, setTitle] = useState([])
  const [data, setData] = useState([])
  const [dataWish, setDataWish] = useState([])
  console.log('dataWish',dataWish)
  const getUser = async () => {
    let userData = await AsyncStorage.getItem('USER');
    userData = JSON.parse(userData);
    setUserData(userData);
  };

  const contactId = user ? user.contact_id : null;


  useEffect(() => {
    getUser();
  }, [contactId]);

  useEffect(() =>{
    if (user && user.contact_id) {
      api
      .post("/contact/getFavByContactId",{contact_id:user.contact_id})
      .then(res => {
        res.data.data.forEach(element => {
          element.tag = String(element.tag).split(",")
        })
        res.data.data.forEach(el => {
          el.images = String(el.images).split(",")
        })
        console.log('wishlists',res.data.data)
        setDataWish(res.data.data)
      
      })
      .catch(err => {
        console.log(err)
      })
    }
  },[])

  const Insert = (item) => {
    // if (contactId) {
    //     Alert.alert('Please fill in all fields');
    //     return;
    // }
    
    
    const wishData = {
        contact_id: user.contact_id,
        product_id:item, 
    };
    
    api
        .post('/contact/insertToWishlist', wishData)
        .then(response => {
            if (response.status === 200) {

             Alert.alert('Product Add to Wishlist');

            } else {
                console.error('Error');
            }
        })
        .catch(error => {
          
            console.error('Error:', error);
        }

        );

};

  const categories = [
    {
      name: reduxLang.Armchair,
      icon: "graduation-cap",
      image: require("../../images/furniture/CustomSize19.png")
    },
    {
      name: reduxLang.Wingchair,
      icon: "headphones",
      image: require("../../images/furniture/CustomSize19.png")
    },
    {
      name: reduxLang.Woodchair,
      icon: "book",
      image: require("../../images/furniture/CustomSize19.png")
    },
    {
      name: reduxLang.Foldingchair,
      icon: "gift",
      image: require("../../images/furniture/CustomSize19.png")
    },
    {
      name: reduxLang.Studentchair,
      icon: "bicycle",
      image: require("../../images/furniture/CustomSize19.png")
    },
    {
      name: reduxLang.Sofa,
      icon: "car",
      image: require("../../images/furniture/CustomSize19.png")
    },
    {
      name: reduxLang.Gardenchair,
      icon: "car",
      image: require("../../images/furniture/CustomSize19.png")
    },
    {
      name: reduxLang.Salonchair,
      icon: "car",
      image: require("../../images/furniture/CustomSize19.png")
    }
  ]

 
   // let [data, setdata] = useState([{
  //   url: require('../../images/furniture/CustomSize19.png'),
  //   productName: 'Armchair',
  //   quantity: '120 Products'
  // },
  // {
  //   url: require('../../images/furniture/CustomSize19.png'),
  //   productName: reduxLang.Sofa,
  //   quantity: '650 Products'
  // },
  // {
  //   url: require('../../images/furniture/CustomSize19.png'),
  //   productName: reduxLang.Woodchair,
  //   quantity: '432 Products'
  // },
  // {
  //   url: require('../../images/furniture/CustomSize19.png'),
  //   productName: reduxLang.Wingchair,
  //   quantity: '678 Products'
  // },
  // {
  //   url: require('../../images/furniture/CustomSize19.png'),
  //   productName: reduxLang.Foldingchair,
  //   quantity: '789 Products'
  // },
  // {
  //   url: require('../../images/furniture/CustomSize19.png'),
  //   productName: reduxLang.Studentchair,
  //   quantity: '120 Products'
  // },
  // {
  //   url: require('../../images/furniture/CustomSize19.png'),
  //   productName: reduxLang.Gardenchair,
  //   quantity: '650 Products'
  // },
  // {
  //   url: require('../../images/furniture/CustomSize19.png'),
  //   productName: reduxLang.Salonchair,
  //   quantity: '432 Products'
  // },
  // {
  //   url: require('../../images/furniture/CustomSize19.png'),
  //   productName: 'Desk chair',
  //   quantity: '678 Products'
  // },
  // {
  //   url: require('../../images/furniture/CustomSize19.png'),
  //   productName: reduxLang.Studentchair,
  //   quantity: '789 Products'
  // }])

  const [newProducts, setNewProducts] = useState([])
  const [bestSellingProducts, setBestSellingProducts] = useState([])
  const [mostPopularProducts, setMostPopularProducts] = useState([])

  const getSliderDatas = () => {
    api
      .post("/file/getListOfFiles", { record_id: 31, room_name: "menu" })
      .then(res => {
        setSliderData(res.data)
        
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getBestSellingProducts = () => {
    api
      .get("/product/getBestSellingProducts")
      .then(res => {
        res.data.data.forEach(element => {
          element.tag = String(element.tag).split(",")
        })
        res.data.data.forEach(el => {
          el.images = String(el.images).split(",")
        })
        console.log('bestsellers',res.data.data)
        setBestSellingProducts(res.data.data)
      
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getNewProducts = () => {
    api
      .get("/product/getNewProducts")
      .then(res => {
        res.data.data.forEach(element => {
          element.tag = String(element.tag).split(",")
        })
        res.data.data.forEach(el => {
          el.images = String(el.images).split(",")
        })
        console.log('newpro',res.data.data)
        setNewProducts(res.data.data)
      
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getMostPopularProducts = () => {
    api
      .get("/product/getMostPopularProducts")
      .then(res => {
        res.data.data.forEach(element => {
          element.tag = String(element.tag).split(",")
        })
        res.data.data.forEach(el => {
          el.images = String(el.images).split(",")
        })
        setMostPopularProducts(res.data.data)
        
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    // Fetch data from API
    api
      .get("/product/getAllProducts")
      .then(res => {
        res.data.data.forEach(element => {
          element.title = String(element.title).split(",")
          setTitle(element.title)
        })
        res.data.data.forEach(el => {
          el.images = String(el.images).split(",")
          
        })
        setData(res.data.data)
      
      })
      .catch(err => {
        console.log("error", err)
      })
    getSliderDatas()
    getBestSellingProducts()
    getMostPopularProducts()
    getNewProducts()
  }, [])

 
  const [loader, setLoader] = useState(true)
  const [fab, setFab] = useState(false)
  let scrollRef = useRef(null)
  let onEnDReachedCalledDuringMomentum

  const [addtoCartmodalVisible, setaddtoCartModalVisible] = useState(false)

  const handleScroll = event => {
    if (
      fab &&
      event.nativeEvent.contentOffset.y >= 0 &&
      event.nativeEvent.contentOffset.y < 300
    ) {
      setFab(false)
    }
  }

  const onEndReached = () => {
    // handleLoadMore()
    onEnDReachedCalledDuringMomentum = true
  }

  // const handleLoadMore = () => {
  //   if (data.length > 9) {
  //     setFab(true)
  //   }
  //   if (data.length < 20) {
  //     setLoader(true)
  //     const delay = setInterval(function() {
  //       setLoader(false)
  //       let temp = data.concat(data)
  //       setData(temp)
  //       clearInterval(delay)
  //     }, 3000)
  //   }
  // }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.primaryBackgroundColor }
      ]}
    >
      <StatusBar
        barStyle={theme.barStyle}
        backgroundColor={theme.StatusBarColor}
      />

      {/* //fab Button */}

      {fab ? (
        <TouchableOpacity
          style={[
            styles.fabStyle,
            {
              backgroundColor: theme.primary
            }
          ]}
          onPress={() => {
            scrollRef?.current?.scrollToOffset({
              animated: true,
              offset: 0
            })
            setFab(false)
          }}
        >
          <FontAwesome
            name={"chevron-up"}
            style={[
              styles.fabIcon,
              {
                color: theme.secondryBackgroundColor,
                fontSize: theme.appFontSize.largeSize
              }
            ]}
          />
        </TouchableOpacity>
      ) : null}

      {/* // Modal  start */}

      <AddtoCartPopUpModal
        productDetailData={data}
        theme={theme}
        reduxLang={reduxLang}
        addtoCartmodalVisible={addtoCartmodalVisible}
        setaddtoCartModalVisible={setaddtoCartModalVisible}
      />

      <HeaderOne theme={theme} reduxLang={reduxLang} />

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
        renderItem={({ item, index }) => {
          const discount = item.discount_percentage ? parseFloat(item.discount_percentage) : 0;
          // const price = parseFloat(price);
          console.log('price',item.price)
          // Calculate the discount amount from the percentage
          const discountAmount = (item.price * discount) / 100;
      
          // Price after applying the discount percentage
          // const priceAfterDiscount = price - discountAmount;
      
          // Calculate total for the product and add to the running total
        
          const discountTotalAmount = (item.price - discountAmount);
    
          const percentagesym = item.discount_percentage ? "%" : '';
     
          return (
            <View style={styles.container1}>
      <View
        key={item.product_id}
        style={[
          styles.touchableOpacity,
          {
            backgroundColor: backgroundColor
              ? backgroundColor
              : theme.secondryBackgroundColor
          }
        ]}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.push("ProductDetail", {
              productId: item,datas:data
            })
          }
        >
          <Image
             source={{ uri: item.images?.[0] ? `https://homeservices.unitdtechnologies.com/storage/uploads/${item.images[0]}` : null }}
            resizeMode={"cover"}
            borderRadius={8}
            style={[
              styles.imageBackground,
              {
                backgroundColor: backgroundColor
                  ? backgroundColor
                  : theme.backgroundImageColor
              }
            ]}
          />
        </TouchableOpacity>

        <View style={styles.productNameView}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%"
            }}
          >
            <Text
              numberOfLines={1}
              style={[
                styles.productNameText,
                styles.bold,
                {
                  color: theme.textColor,
                  fontSize: theme.appFontSize.mediumSize,
                  fontFamily: theme.appFontSize.fontFamily
                }
              ]}
            >
              {item.title}
            </Text>

            {/* {whishlistTrash ? (
              <TouchableOpacity style={{ zIndex: 3 }}>
                <FontAwesome
                  style={{
                    color: theme.secondry,
                    fontSize: theme.appFontSize.largeSize
                  }}
                  name={"trash"}
                />
              </TouchableOpacity>
            ) : (
              <View />
            )} */}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "65%"
            }}
          >
          <Text
            numberOfLines={1}
            style={[
              {
                color: theme.textColor,
                fontSize: theme.appFontSize.smallSize,
                fontFamily: theme.appFontSize.fontFamily
              }
            ]}
          >
            Rs :{discountTotalAmount}
          </Text>
          { item.discount_percentage !==null &&
          <Text
            numberOfLines={1}
            style={[
              styles.discountPriceText,
              {
                color:'red',
                fontSize: theme.appFontSize.smallSize,
                fontFamily: theme.appFontSize.fontFamily
              }
            ]}
          >
            {item.price}
          </Text>
        }
          <Text
              style={[
                styles.productPriceText,
                {
                  color:'green',
                  fontSize: theme.appFontSize.smallSize,
                  fontFamily: theme.appFontSize.fontFamily
                }
              ]}
            >
              {item.discount_percentage}{percentagesym}
            </Text>
          </View>

          <View style={styles.cartIconContainer}>
            <ReviewStar
              theme={theme}
              counterValue={4}
              starSize={theme.appFontSize.smallSize - 1}
            ></ReviewStar>

            {/* <TouchableOpacity onPress={addToCartFun} style={{ zIndex: 3 }}>
              <FontAwesome
                style={{
                  color: theme.secondry,
                  fontSize: theme.appFontSize.largeSize
                }}
                name={"cart-plus"}
              />
            </TouchableOpacity> */}
          </View>
          <TouchableOpacity style={styles.heartIcon}  onPress={() => {
              Insert(item.product_id);
            }} >
        <FontAwesome
          style={{
            color: theme.secondry,
            fontSize: icon
              ? theme.appFontSize.largeSize
              : theme.appFontSize.mediumSize
          }}
          name={icon ? icon : "heart"}
        />
      </TouchableOpacity>
        </View>
        
      </View>
     
    </View>
         )
        }}
       // ref={scrollRef}
        ListFooterComponent={renderFooter(theme, loader)}
        onScroll={handleScroll}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        onMomentumScrollBegin={() => {
          onEnDReachedCalledDuringMomentum = false
        }}
        ListHeaderComponent={
          <View>
            <BannerOne images={sliderData} theme={theme} autoMove={false} />

            <HorizontalCategory theme={theme} reduxLang={reduxLang} />

            <FlashCategory
              productDetailData={data}
              categories={data}
              theme={theme}
              reduxLang={reduxLang}
            />
            <View style={styles.flashRow}>
             <Text
          style={[
            styles.bold,
            {
              color: theme.textColor,
              fontSize: textSize ? textSize : theme.appFontSize.smallSize,
              fontFamily: theme.appFontSize.fontFamily
            }
          ]}
        >
          {'Most Popular'}
        </Text>
        </View>
            <HotCategory
              categories={mostPopularProducts}
              theme={theme}
              reduxLang={reduxLang}
              icon={icon}
              offer={"Most Popular"}
            />
             <View style={styles.flashRow}>
             <Text
          style={[
            styles.bold,
            {
              color: theme.textColor,
              fontSize: textSize ? textSize : theme.appFontSize.smallSize,
              fontFamily: theme.appFontSize.fontFamily
            }
          ]}
        >
          {'New Product'}
        </Text>
        </View>
            <HotCategory
              categories={newProducts}
              theme={theme}
              reduxLang={reduxLang}
              icon={icon}
              offer={"New Product"}
            />
 <View style={styles.flashRow}>
             <Text
          style={[
            styles.bold,
            {
              color: theme.textColor,
              fontSize: textSize ? textSize : theme.appFontSize.smallSize,
              fontFamily: theme.appFontSize.fontFamily
            }
          ]}
        >
          {'Best Selling'}
        </Text>
        </View>
            <HotCategory
              categories={bestSellingProducts}
              theme={theme}
              reduxLang={reduxLang}
              icon={icon}
              offer={"Best Selling"}
            />

            {/* <DailyFeatured
              categories={categories}
              productDetailData={data}
              theme={theme}
              reduxLang={reduxLang}
            /> */}

            <Text
              style={[
                styles.headingText,
                {
                  color: theme.textColor,
                  fontSize: theme.appFontSize.smallSize,
                  fontFamily: theme.appFontSize.fontFamily
                }
              ]}
            >
              {reduxLang.YouMayLike}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  container1: {
    flex: 0.5,
    margin: 4
  },
  cartIconContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    flex: 0.5,
    margin: 0,
    marginVertical: 4,
    alignItems: "center"
  },
  productNameText: {
    paddingVertical: 3
  },
  bold: {
    fontWeight: "bold"
  },
  quantity: {
    width: "78%",
    textAlign: "left"
  },
  touchableOpacity: {
    borderRadius: 6,
    width: "100%",
    justifyContent: "center"
  },
  imageBackground: {
    height: HEIGHT * 0.22,
    width: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "transparent"
  },
  productNameView: {
    marginHorizontal: 10,
    alignItems: "flex-start",
    marginVertical: 6
  },
  headingText: {
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingHorizontal: 23,
    paddingVertical: 15
  },
  fabIcon: {
    paddingBottom: 2
  },
  fabStyle: {
    zIndex: 5,
    position: "absolute",
    right: 25,
    bottom: 50,
    alignItems: "center",
    height: 46,
    width: 46,
    borderRadius: 400,
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  colWrapper: {
    justifyContent: "space-between",
    margin: 5,
    marginTop: 0,
    marginBottom: 0
  },
  discountPriceText: {
    textDecorationLine: "line-through",
    textAlign: "left",
    paddingHorizontal: 10,
    paddingBottom:
      Platform.OS === "ios"
        ? HEADER_IOS_HEIGHT * 0.05
        : HEADER_ANDROID_HEIGHT * 0.04
  },
  flashRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    paddingBottom: 5
  },
  heartIcon: {
    // paddingHorizontal: 8,
    position: "absolute",
    right: 12,
    top:41
  },
})

const mapStateToProps = state => ({
  reduxLang: state.configReducer.lang
})

export default connect(mapStateToProps, null)(App)
