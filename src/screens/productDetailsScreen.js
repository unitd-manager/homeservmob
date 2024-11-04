import React, { useEffect, useRef, useState } from "react"
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  backgroundColor,
  View,
  Image,
  I18nManager,
  Animated
} from "react-native"
import ReviewStar from "../components/reviewStar"
import LinearGradient from "react-native-linear-gradient"
import { connect } from "react-redux"
import Card from "../components/cardStyles/card"
import AddtoCartPopUpModal from "../components/addtoCartPopUpModal"
import DetailPageBanner from "../components/banners/detailPageBanner"
import renderFooter from "../components/renderFooter"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons"
import { WIDTH, HEIGHT } from "../components/config"
import CustomBtn from "../components/customBtn"
import { SafeAreaView } from "react-native-safe-area-context"
import api from "../constants/api"

const ProductDetailScreen = ({ navigation, theme, reduxLang, route }) => {
  const { productId,datas } = route.params;

  const [product, setProduct] = useState([])

  

  
  // Header Settings
  useEffect(() => {
    navigation.setOptions({
      headerTitle: reduxLang.ProductDetails,
      headerStyle: {
        backgroundColor: theme.secondryBackgroundColor,
        shadowColor: "transparent"
      },
      headerShown: false,
      headerTintColor: theme.textColor
    })
  }, [
    navigation,
    reduxLang.Profile,
    theme.secondryBackgroundColor,
    theme.textColor
  ])
  // const[product,setProduct] = useEffect([])
  
  useEffect(() => {
    api
      .post("/product/getProductbyproductId", {
        product_id: productId
      })
      .then(res => {
        // res.data.data[0].title = String(res.data.data[0].title).split(",")
        // res.data.data[0].images = String(res.data.data[0].images).split(",")
        
         setProduct(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  const yOffset = useRef(new Animated.Value(0)).current
  const headerOpacity = yOffset.interpolate({
    inputRange: [0, 300],
    outputRange: [1, 0],
    extrapolate: "clamp"
  })

  const topPosition = yOffset.interpolate({
    inputRange: [0, 180],
    outputRange: [0, -20]
  })

  const [data, setdata] = useState(productId)
  const [wiil, setWill] = useState(datas)

 console.log('image',data)

  const discount = data.discount_percentage ? parseFloat(data.discount_percentage) : 0;
  const discountAmount = (data.price * discount) / 100;

  const discountTotalAmount = (data.price - discountAmount);

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
  //       setdata(temp)
  //       clearInterval(delay)
  //     }, 3000)
  //   }
  // }

  const headerFun = text => (
    <View
      style={[
        styles.headerStyle,
        {
          backgroundColor: theme.secondryBackgroundColor
        }
      ]}
    >
      <Text
        style={[
          styles.headerText,
          {
            color: theme.textColor,
            fontSize: theme.appFontSize.mediumSize,
            fontFamily: theme.appFontSize.fontFamily
          }
        ]}
      >
        {text}
      </Text>

      <FontAwesome
        name={!I18nManager.isRTL ? "chevron-right" : "chevron-left"}
        style={[
          styles.paddingHot,
          {
            color: theme.secondry,
            fontSize: theme.appFontSize.smallSize
          }
        ]}
      />
    </View>
  )

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.primaryBackgroundColor }
      ]}
    >
      <AddtoCartPopUpModal
        productDetailData={productId}
        theme={theme}
        reduxLang={reduxLang}
        addtoCartmodalVisible={addtoCartmodalVisible}
        setaddtoCartModalVisible={setaddtoCartModalVisible}
      />

      <SafeAreaView style={styles.btnsContainer}>
        <CustomBtn
          textColor={theme.primary}
          backgroundColor={theme.secondryBackgroundColor}
          borderRadius={1}
          width={WIDTH * 0.5}
          onPressFun={() => {
            setaddtoCartModalVisible(!addtoCartmodalVisible)
          }}
          theme={theme}
          title={reduxLang.ADDTOCART}
        ></CustomBtn>

        <CustomBtn
          borderRadius={1}
          width={WIDTH * 0.5}
          onPressFun={() => {
            setaddtoCartModalVisible(!addtoCartmodalVisible)
          }}
          theme={theme}
          title={reduxLang.BUYNOW}
        ></CustomBtn>
      </SafeAreaView>

      {/* headerBar start  */}

      <Animated.View
        style={[
          styles.headerView,
          {
            opacity: headerOpacity,
            transform: [
              {
                translateY: topPosition
              }
            ]
          }
        ]}
      > 
        <TouchableOpacity
          style={styles.headerIconTouchable}
          onPress={() => navigation.pop()}
        >
          <Ionicons
            style={[
              {
                color: theme.primaryTextColor,
                fontSize: theme.appFontSize.largeSize + 8
              }
            ]}
            name={
              I18nManager.isRTL
                ? "chevron-forward-outline"
                : "chevron-back-outline"
            }
          />
        </TouchableOpacity>
        <View style={styles.flexDir}>
          <TouchableOpacity
            style={[styles.headerIconTouchable, styles.marginHorr]}
          >
            <Ionicons
              style={[
                styles.headerIconTouchableHeart,
                {
                  color: theme.primaryTextColor,
                  fontSize: theme.appFontSize.largeSize + 6
                }
              ]}
              name={"heart"}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconTouchable}>
            <Ionicons
              style={[
                {
                  color: theme.primaryTextColor,
                  fontSize: theme.appFontSize.largeSize + 5
                }
              ]}
              name={"share-social-outline"}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
      {/* headerBar end  */}

      {/* fab button  start  */}

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

      {/* fab button  end  */}

      <Animated.FlatList
        windowSize={50}
        initialNumToRender={3}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        removeClippedSubviews={true}
        legacyImplementation={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={10}
        keyExtractor={(item, ) => item.product_id}
        data={wiil}
        columnWrapperStyle={styles.colWrapper}
        ListHeaderComponent={
          <View style={{ paddingBottom: 3 }}>
            {/* <DetailPageBanner
              images={product?.images}
              theme={theme}
              reduxLang={reduxLang}
              autoMove={true}
            /> */}

            {/* flash sale */}

            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              colors={
                !I18nManager.isRTL
                  ? [theme.primary, theme.primaryLight]
                  : [theme.primaryLight, theme.primary]
              }
              style={styles.flashRow}
            >
              <View style={styles.rowTag}>
                <FontAwesome
                  name={"bolt"}
                  style={[
                    styles.paddingHot,
                    {
                      color: theme.primaryTextColor,
                      fontSize: theme.appFontSize.largeSize
                    }
                  ]}
                />
                <Text
                  style={{
                    fontSize: theme.appFontSize.mediumSize,
                    fontFamily: theme.appFontSize.fontFamily,
                    color: theme.primaryTextColor
                  }}
                >
                  {reduxLang.FLashSale}
                </Text>
              </View>

              <View style={[styles.rowTag, styles.flashTimeView]}>
                <Text
                  style={{
                    fontSize: theme.appFontSize.smallSize,
                    fontFamily: theme.appFontSize.fontFamily,
                    color: theme.primaryTextColor
                  }}
                >
                  {reduxLang.EndsIn + " "}
                </Text>
                <Text
                  style={[
                    {
                      color: theme.primaryTextColor,
                      fontSize: theme.appFontSize.mediumSize,
                      fontFamily: theme.appFontSize.fontFamily
                    }
                  ]}
                >
                  19 : 10 : 01
                </Text>
              </View>
            </LinearGradient>

            <View
              style={[
                styles.priceContainer,
                { backgroundColor: theme.secondryBackgroundColor }
              ]}
            >
              
              <Image
            source={{ uri: data?.images? `https://homeservices.unitdtechnologies.com/storage/uploads/${data.images}` : null }}

            resizeMode={"cover"}
            borderRadius={8}
            style={[
              styles.imageBackground1,
              {
                backgroundColor: backgroundColor
                  ? backgroundColor
                  : theme.backgroundImageColor
              }
            ]}
          />
           <Text
              numberOfLines={1}
              style={[
                styles.productNameText,
                styles.bold,
                {
                  color: theme.textColor,
                  fontSize: theme.appFontSize.largeSize,
                  fontFamily: theme.appFontSize.fontFamily
                }
              ]}
            >
              {data.title}
            </Text>
              <View style={styles.priceRowInnerContainer}>
              <Text
              style={[
              styles.productPriceText,
              {
              color: theme.textColor,
              fontSize: theme.appFontSize.largeSize + 4,
              fontFamily: theme.appFontSize.fontFamily
              }
              ]}
              >
              Rs :{discountTotalAmount}
              </Text>

              { data.discount_percentage !== null &&
                <Text
                  style={[
                    styles.discountPriceText,
                    {
                      color: theme.secondry,
                      fontSize: theme.appFontSize.smallSize + 1,
                      fontFamily: theme.appFontSize.fontFamily
                    }
                  ]}
                >
                  { data.price ? data.price : ''}
                </Text>
           }
               { data.discount_percentage !== null &&
                <Text
                  style={[
                    styles.percentText,
                    {
                      color: theme.primary,
                      fontSize: theme.appFontSize.smallSize,
                      fontFamily: theme.appFontSize.fontFamily,
                      borderColor: theme.primary
                    }
                  ]}
                >
                  {data.discount_percentage}{"% OFF"}
                </Text>
        }
              </View>


              <View style={styles.reviewContainer}>
                <Text
                  style={[
                    styles.averageRatingText,
                    {
                      color: theme.textColor,
                      fontSize: theme.appFontSize.smallSize,
                      fontFamily: theme.appFontSize.fontFamily
                    }
                  ]}
                >
                  {"5.0"}
                </Text>

                <ReviewStar
                  theme={theme}
                  counterValue={4}
                  starSize={theme.appFontSize.smallSize}
                ></ReviewStar>

                <Text
                  style={[
                    styles.reviewsText,
                    {
                      color: theme.secondry,
                      fontSize: theme.appFontSize.smallSize,
                      fontFamily: theme.appFontSize.fontFamily
                    }
                  ]}
                >
                  {"7 " + reduxLang.Reviews}
                </Text>

                <View
                  style={[
                    styles.ordersView,
                    {
                      borderColor: theme.secondry
                    }
                  ]}
                >
                  <Text
                    style={[
                      styles.textOrders,
                      {
                        color: theme.secondry,
                        fontSize: theme.appFontSize.smallSize,
                        fontFamily: theme.appFontSize.fontFamily
                      }
                    ]}
                  >
                    {"68 " + reduxLang.Orders}
                  </Text>
                </View>

                <View
                  style={[
                    styles.wishContainer,
                    {
                      borderColor: theme.secondry
                    }
                  ]}
                >
                  <Text
                    style={[
                      styles.wishText,
                      {
                        color: theme.secondry,
                        fontSize: theme.appFontSize.smallSize,
                        fontFamily: theme.appFontSize.fontFamily
                      }
                    ]}
                  >
                    {"886 " + reduxLang.Wish}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setaddtoCartModalVisible(!addtoCartmodalVisible)}
            >
              {headerFun(reduxLang.SelectColorSizeWeightQuantity)}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("ProductDescriptionScreen")}
              style={[
                styles.descriptionView,
                { backgroundColor: theme.secondryBackgroundColor }
              ]}
            >
              {headerFun(reduxLang.ProductDetails)}

              <Text
                style={[
                  styles.descriptionText,
                  {
                    color: theme.textColor,
                    fontSize: theme.appFontSize.mediumSize,
                    fontFamily: theme.appFontSize.fontFamily
                  }
                ]}
              >
                {reduxLang.GlobalText2}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("RatingReviewsScreen")}
              style={[
                styles.reviewsSectionView,
                {
                  backgroundColor: theme.secondryBackgroundColor
                }
              ]}
            >
              <View
                style={[
                  styles.headerStyle,
                  {
                    backgroundColor: theme.secondryBackgroundColor
                  }
                ]}
              >
                <View style={styles.flexDir}>
                  <Text
                    style={[
                      styles.headerText,
                      {
                        color: theme.textColor,
                        fontSize: theme.appFontSize.mediumSize,
                        fontFamily: theme.appFontSize.fontFamily
                      }
                    ]}
                  >
                    {reduxLang.CustomerReviews}
                  </Text>

                  <Text
                    style={[
                      styles.headerText,
                      {
                        color: theme.textColor,
                        fontSize: theme.appFontSize.mediumSize,
                        fontFamily: theme.appFontSize.fontFamily
                      }
                    ]}
                  >
                    {"(7)"}
                  </Text>
                </View>
                <FontAwesome
                  name={!I18nManager.isRTL ? "chevron-right" : "chevron-left"}
                  style={[
                    styles.paddingHot,
                    {
                      color: theme.secondry,
                      fontSize: theme.appFontSize.smallSize
                    }
                  ]}
                />
              </View>

              <View style={styles.customerDataView}>
                <Image
                  source={require("../images/maleAvatar.png")}
                  resizeMode={"cover"}
                  style={styles.userImage}
                />

                <View>
                  <View style={styles.nameStarView}>
                    <Text
                      style={[
                        styles.userNameText,
                        {
                          color: theme.textColor,
                          fontSize: theme.appFontSize.mediumSize,
                          fontFamily: theme.appFontSize.fontFamily
                        }
                      ]}
                    >
                      {"elibenaderet"}
                    </Text>
                    <ReviewStar
                      theme={theme}
                      counterValue={3}
                      starSize={theme.appFontSize.smallSize}
                    ></ReviewStar>
                  </View>
                  <Text
                    style={[
                      styles.userDate,
                      {
                        color: theme.secondry,
                        fontSize: theme.appFontSize.smallSize - 1,
                        fontFamily: theme.appFontSize.fontFamily
                      }
                    ]}
                  >
                    {"2021-03-15 15:45:35"}
                  </Text>
                </View>
              </View>

              <Text
                style={[
                  styles.commentText,
                  {
                    color: theme.textColor,
                    fontSize: theme.appFontSize.mediumSize - 1,
                    fontFamily: theme.appFontSize.fontFamily
                  }
                ]}
              >
                {reduxLang.ShipmentveryfastGreatproductThankyou}
              </Text>
            </TouchableOpacity>
            <Text
              style={[
                styles.headingText,
                {
                  color: theme.textColor,
                  fontSize: theme.appFontSize.mediumSize,
                  fontFamily: theme.appFontSize.fontFamily
                }
              ]}
            >
              {reduxLang.YouMayLike}
            </Text>
          </View>
        }
        renderItem={({ item, index }) => {
          const discount = item.discount_percentage ? parseFloat(item.discount_percentage) : 0;
         
          const discountAmount = (item.price * discount) / 100;
      
        
        
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
              productId: item,datas:wiil
            })
          }
        >
          <Image
             source={{ uri: item.images?.[0] ? `https://homeservices.unitdtechnologies.com/storage/uploads/${item.images}` : null }}
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
        </View>
      </View>
    </View>
         )
        }}
        ref={scrollRef}
        ListFooterComponent={renderFooter(theme, loader)}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: yOffset
                }
              }
            }
          ],
          {
            listener: event => handleScroll(event),
            useNativeDriver: true
          }
        )}
         onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        onMomentumScrollBegin={() => {
          onEnDReachedCalledDuringMomentum = false
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40
  },
  headingText: {
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  btnsContainer: {
    position: "absolute",
    bottom: 0,
    zIndex: 5,
    width: WIDTH,
    flexDirection: "row"
  },
  userDate: {
    alignSelf: "flex-start",
    paddingVertical: 3
  },
  averageRatingText: {
    paddingHorizontal: 4,
    paddingRight: 3,
    fontWeight: "bold"
  },
  commentText: {
    alignSelf: "flex-start",
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginBottom: 5
  },
  ordersView: {
    borderLeftWidth: 1,
    paddingHorizontal: 4,
    marginLeft: 4
  },
  productPriceText: {
    fontWeight: "bold",
    textAlign: "left"
  },
  discountPriceText: {
    textDecorationLine: "line-through",
    textAlign: "left",
    paddingHorizontal: 10
  },
  descriptionView: {
    paddingHorizontal: 1,
    paddingBottom: 10,
    marginBottom: 6
  },
  reviewsSectionView: {
    paddingHorizontal: 1,
    paddingBottom: 10,
    marginBottom: 6
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5
  },
  descriptionText: {
    textAlign: "left",
    paddingHorizontal: 8,
    marginTop: -10,
    paddingBottom: 0
  },
  wishContainer: {
    borderLeftWidth: 1,
    paddingHorizontal: 3,
    marginLeft: 4
  },
  nameStarView: {
    flexDirection: "row",
    alignItems: "center"
  },
  textOrders: {
    paddingHorizontal: 3
  },
  reviewsText: {
    paddingHorizontal: 4
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
  imageBackground1: {
    height: HEIGHT * 0.52,
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
  customerDataView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    marginTop: -12
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 2,
    position: "absolute",
    width: WIDTH,
    marginTop: Platform.OS === "android" ? 0 : 8
  },
  wishText: {
    paddingHorizontal: 4
  },
  priceContainer: {
    padding: 5,
    marginBottom: 6
  },
  userNameText: {
    paddingRight: 4
  },
  percentText: {
    textAlign: "left",
    paddingHorizontal: 10,
    textDecorationLine: "line-through",
    borderWidth: 1,
    fontWeight:'bold'
  },
  productDescriptionText: {
    paddingHorizontal: 4,
    paddingVertical: 5,
    textAlign: "left"
  },
  priceRowInnerContainer: {
    flexDirection: "row",
    paddingHorizontal: 5,
    alignItems: "center",
    paddingVertical: 7
  },
  flashTimeView: {
    flexDirection: "column",
    paddingHorizontal: 5
  },
  userImage: {
    height: WIDTH * 0.11,
    width: WIDTH * 0.11,
    margin: 6,
    borderRadius: 100
  },
  headerIconTouchable: {
    margin: 35,
    marginHorizontal: 17,
    backgroundColor: "rgba(1, 1, 1, 0.3)",
    borderRadius: 100,
    height: WIDTH * 0.08,
    width: WIDTH * 0.08,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? HEIGHT * 0.06 : HEIGHT * 0.03
  },
  headerIconTouchableHeart: {
    alignSelf: "center",
    paddingTop: 2
  },
  flexDir: {
    flexDirection: "row"
  },
  headerStyle: {
    marginBottom: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    paddingHorizontal: 4
  },
  headerText: {
    paddingHorizontal: 4,
    fontWeight: "bold",
    textAlign: "left"
  },
  marginHorr: {
    marginHorizontal: -4
  },
  flashRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 6,
    alignItems: "center"
  },
  paddingHot: {
    paddingHorizontal: 5
  },
  rowTag: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
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
  }
})

const mapStateToProps = state => ({
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang
})

export default connect(mapStateToProps, null)(ProductDetailScreen)
