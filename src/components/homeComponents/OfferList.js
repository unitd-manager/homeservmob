import React,{useRef,useState,useEffect} from "react"
import {
  I18nManager,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from "react-native"
import { connect } from "react-redux"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { FlatList } from "react-native-gesture-handler"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { WIDTH } from "../config"
import { HEIGHT } from "../config"
import { HEADER_IOS_HEIGHT, HEADER_ANDROID_HEIGHT, } from "../config"
import { useNavigation } from "@react-navigation/native"
import renderFooter from "../renderFooter"
import ReviewStar from "../reviewStar"
import imageBase from "../../constants/imageBase"
import api from "../../constants/api"

const App = ({ route}) => {
  const { dataValue,theme, reduxLang,textSize,icon,offer } = route.params;
  const navigation = useNavigation()

  const [loader, setLoader] = useState(true)
  const [fab, setFab] = useState(false)
  let scrollRef = useRef(null)
  let onEnDReachedCalledDuringMomentum
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

  const [user, setUserData] = useState();
  const getUser = async () => {
    let userData = await AsyncStorage.getItem('USER');
    userData = JSON.parse(userData);
    setUserData(userData);
  };

  const contactId = user ? user.contact_id : null;


  useEffect(() => {
    getUser();
  }, [contactId]);

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


  return (
    <View
      style={[
        styles.flashContainer,
        {
          backgroundColor: theme.primaryBackgroundColor
        }
      ]}
    >
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
          {}
        </Text>
      </View>

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
        data={dataValue}
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
      console.log('discountprice',discountAmount)
      console.log('discountTotalAmount',discountTotalAmount)
          return (
            
            <View style={styles.container1}>
      <View
        key={item.product_id}
        style={[
          styles.touchableOpacity,
          {
            backgroundColor: 'black'
              ? 'white'
              : theme.secondryBackgroundColor
          }
        ]}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.push("ProductDetail", {
              productId: item,datas:dataValue
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
                backgroundColor: 'white'
                  ? 'white'
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
          { item.discount_percentage !== null &&
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
            


            <Text
              style={[
                styles.headingText,
                {
                  color: theme.textColor,
                  fontSize: theme.appFontSize.largeSize,
                  fontFamily: theme.appFontSize.fontFamily
                }
              ]}
            >
              {offer}
            </Text>
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  categoryTouch: {
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12
  },
  colWrapper: {
    justifyContent: "space-between",
    margin: 5,
    marginTop: 0,
    marginBottom: 0
  },
  headingText: {
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingHorizontal: 23,
    paddingVertical: 15
  },
  paddingHot: {
    paddingHorizontal: 5
  },
  rowTag: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
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
  discountPriceText: {
    textDecorationLine: "line-through",
    textAlign: "left",
    paddingHorizontal: 10,
    paddingBottom:
      Platform.OS === "ios"
        ? HEADER_IOS_HEIGHT * 0.05
        : HEADER_ANDROID_HEIGHT * 0.04
  },
  productNameView: {
    marginHorizontal: 10,
    alignItems: "flex-start",
    marginVertical: 6
  },
  flashContainer: {
    width: "95%",
    alignSelf: "center",
    borderRadius: 12,
    padding: 1
  },
  container1: {
    flex: 0.5,
    margin: 4
  },
  heartIcon: {
    // paddingHorizontal: 8,
    position: "absolute",
    right: 12,
    top:41
  },
  bold: {
    fontWeight: "bold"
  },
  imageBackground: {
    height: HEIGHT * 0.22,
    width: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "transparent"
  },
  flashRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    paddingBottom: 5
  },
  categoryText: {
    width: WIDTH * 0.22,
    alignItems: "center",
    justifyContent: "center",
    height: 24
  }
})

export default connect(null, null)(App)
