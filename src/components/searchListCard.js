import React , { useRef, useState, useEffect,useLayoutEffect }from "react"
import { StyleSheet,Alert, Text, View, TouchableOpacity, Image } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { HEADER_IOS_HEIGHT, HEADER_ANDROID_HEIGHT, } from "../components/config"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import imageBase from "../constants/imageBase"
import api from "../constants/api"
import { useWishlist } from "../context/WishlistContext"

const CategoryThree = ({
  data,
  theme,
  index,
  backgroundColor,
  icon,
  productDetailData
}) => {
  const navigation = useNavigation()
  const [user, setUserData] = useState();

  const getUser = async () => {
    let userData = await AsyncStorage.getItem('USER');
    userData = JSON.parse(userData);
    setUserData(userData);
  };
  const{addWishlistItem,fetchAllWishlistItems,wishlist}=useWishlist();
  const contactId = user ? user.contact_id : null;

  const discount = data.discount_percentage ? parseFloat(data.discount_percentage) : 0;
          
  // Calculate the discount amount from the percentage
  const discountAmount = (data.price * discount) / 100;


  const discountTotalAmount = (data.price - discountAmount);

  const percentagesym = data.discount_percentage ? "%" : '';



  useEffect(() => {
    getUser();
  }, [contactId]);


  


  const onPressSignIn = () => {
    navigation.navigate("Login");
  };

  const Insert = (data) => {
    if (!contactId) {
      Alert.alert(
        'Please Login',
        'You need to login to add items to the WhishList.',
        [
           {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Login',
            onPress: onPressSignIn,
          },
        ]
      );
        return;
    }
    
    
    
    const wishData = {
        contact_id: user.contact_id,
        product_id:data.product_id, 
    };
   
    addWishlistItem(wishData).then(()=>fetchAllWishlistItems(contactId)).catch(()=>{})
 

};


function isProductInWishlist(product) {
    
  return wishlist.some(wish => wish.product_id === product.product_id);
}



  return (
    <View
      key={index}
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
          navigation.navigate("Wishlist", {
            dataImages: productDetailData
          })
        }
      >
        <Image
           source={{ uri: `${imageBase}${data.images}` }}
          resizeMode={"contain"}
          style={[
            styles.imageBackground,
            {
              backgroundColor: theme.backgroundImageColor
            }
          ]}
        />
      </TouchableOpacity>
      <View style={styles.productNameView}>
        <Text
          style={[
            styles.productNameText,
            {
              color: theme.textColor,
              fontSize: theme.appFontSize.mediumSize,
              fontFamily: theme.appFontSize.fontFamily
            }
          ]}
          numberOfLines={1}
        >
          {data.title}
        </Text>
       
        <View  style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "25%"
            }}>
        <Text
          style={[
            styles.productCountText,
            {
              color: theme.primary,
              fontSize: theme.appFontSize.smallSize + 1,
              fontFamily: theme.appFontSize.fontFamily
            }
          ]}
        >
        Rs :{discountTotalAmount}
        </Text>
        { data.discount_percentage !==null &&
        <Text
          style={[
            styles.discountPriceText,
            {
              color:'red',
              fontSize: theme.appFontSize.smallSize + 1,
              fontFamily: theme.appFontSize.fontFamily
            }
          ]}
        >
      {data.price}
        </Text>
         }
           { data.discount_percentage !==null &&
        <Text
          style={[
            styles.productCountText,
            {
              color: 'green',
              fontSize: theme.appFontSize.smallSize + 1,
              fontFamily: theme.appFontSize.fontFamily
            }
          ]}
        >
            {data.discount_percentage}{percentagesym}
        </Text>
          }
        </View>
      
      </View>
      <TouchableOpacity style={styles.heartIcon}  onPress={() => {
              Insert(data)
            }} >
        <FontAwesome
          style={{
            // color: theme.secondry,
            color: isProductInWishlist(data) ? 'red' : theme.secondry,
            fontSize: icon
              ? theme.appFontSize.largeSize
              : theme.appFontSize.mediumSize
          }}
          name={icon ? icon : "heart"}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  touchableOpacity: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    margin: 10,
    borderRadius: 6,
    marginTop: 5,
    marginBottom: 5,
    elevation: 0.2,
    shadowColor: "#000",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 1
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
  productNameText: {
    width: 200,
    paddingBottom: 3,
    textAlign: "left"
  },
  heartIcon: {
    paddingHorizontal: 8,
    position: "absolute",
    right: 5,
    top: 12
  },
  productCountText: {
    paddingTop: 3,
    paddingBottom: 8
  },
  imageBackground: {
    height: 90,
    width: 92,
    margin: 6,
    borderRadius: 8
  },
  productNameView: {
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 10,
    alignSelf: "center"
  }
})

export default CategoryThree
