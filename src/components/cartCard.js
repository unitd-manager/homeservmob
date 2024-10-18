import React, { useState,useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  Alert
} from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import CounterSelection from "./customCounter"
import { WIDTH } from "./config"
import { HEADER_IOS_HEIGHT, HEADER_ANDROID_HEIGHT } from "./config"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import api from "../constants/api"
import { useCart } from "../context/CartContext"

const cartCard = ({ key, name, url, theme, productDetailData,priceNet,price,quantity,basketId,calculation,onUpdateQuantity,getUser}) => {
  const navigation = useNavigation()
  useEffect(() => {
    getUser()
  }, []) 

 
    const{removeItem}=useCart();
      const discount = priceNet ? parseFloat(priceNet) : 0;
      // const price = parseFloat(price);
      console.log('price',price)
      // Calculate the discount amount from the percentage
      const discountAmount = (price * discount) / 100;
  
      // Price after applying the discount percentage
      // const priceAfterDiscount = price - discountAmount;
  
      // Calculate total for the product and add to the running total
    
      const discountTotalAmount = (price - discountAmount);

      const percentagesym = priceNet ? "%" : '';
  console.log('discountprice',discountAmount)
  console.log('discountTotalAmount',discountTotalAmount)
  // const [quantityPlus, SetqunatityPlus] = useState(quantity);
  // const [quantitys, setQuantity] = useState(quantity);
  // const handleIncrement = () => {
  //   setQuantity(quantitys + 1);
  // };

  // const handleDecrement = () => {
  //   if (quantitys > 1) {
  //     setQuantity(quantitys - 1);
  //   }
  // };// Assuming initial quantity is 1

  

  const [quantitys, setQuantity] = useState(quantity); // Assuming initial quantity is 1
  const [userContactId, setUserContactId] = useState(null);
  
 
  const [cart, setCart] = useState([]);
  // const handleQuantityChange = (value) => {
  //   setQuantity(value);
  // };

  // const handleQuantityChange = text => {
  //   const newQuantity = parseInt(text, 10) || 0;
  //   setQuantity(newQuantity);
  //   onUpdateQuantity(newQuantity);
  // };

  const handleQuantityChange = (text) => {
    // Convert text to number
    const newQuantity = parseInt(text, 10) || 0;
    // Update the quantity state
    setQuantity(newQuantity);
    // Pass the updated quantity to the parent component
    onUpdateQuantity(newQuantity);
  };
  // console.log('quantityPlus',quantitys)
  // console.log('basketId',basketId)
  // const getUserCarts = async () => {
  //   try {
  //     const userData = await AsyncStorage.getItem('USER');
  //     const user = JSON.parse(userData);
  //     setUserContactId(user?.contact_id || null);
  //     if (user && user.contact_id) {
  //       const response = await api.post('/orders/getBasket', { contact_id: user.contact_id });
  //       setCart(response.data.data);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching cart:', error);
  //   }
  // };

  // useEffect(() => {
  //   getUserCarts();
  // }, []);
  const colorfulAlert = (title, message, buttons) => {
    if (Platform.OS === 'ios') {
      Alert.alert(title, message, buttons);
    } else {
      Alert.alert(
        title,
        message,
        buttons,
        {
          cancelable: false,
          style: 'colorful' // Apply custom style
        }
      );
    }
  };
  const removeCartItem = (item) => {
    colorfulAlert(
      'Confirm Removal',
      'Are you sure you want to remove this item from the cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => removeItem(item),
          style: 'destructive' // Make the button red for emphasis
        },
      ]
    );
  };
  const remove = async item => {
    try {
      await api.post('/orders/deleteBasket', { basket_id:item});
      // await getUserCart();
      Alert.alert('Item removed from cart successfully');
      getUser();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const calculateTotal = () => {
    return calculation.reduce((total, product) => {
      
      return total + (parseFloat(product.price) * parseFloat(quantitys));
    }, 0).toFixed(2);
  };
  
  
  return (
    <View
       key={name}
      style={[
        styles.touchableOpacity,
        {
          backgroundColor: theme.secondryBackgroundColor
        }
      ]}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.push("ProductDetail", {
            dataImages: productDetailData
          })
        }
      >
        <Image
          source={url}
          resizeMode={"cover"}
          borderRadius={6}
          style={[
            styles.imageBackground,
            {
              backgroundColor: theme.backgroundImageColor
            }
          ]}
        />
      </TouchableOpacity>
      <View>
        <View style={styles.productNameView}>
          <View style={styles.priceRowInnerContainer}>
            <Text
              style={[
                styles.productPriceText,
                {
                  color: theme.textColor,
                  fontSize: theme.appFontSize.mediumSize,
                  fontFamily: theme.appFontSize.fontFamily
                }
              ]}
            >
              {discountTotalAmount}
            </Text>

            <Text
              style={[
                styles.discountPriceText,
                {
                  color: theme.secondry,
                  fontSize: theme.appFontSize.smallSize,
                  fontFamily: theme.appFontSize.fontFamily
                }
              ]}
            >
              {price}
            </Text>
            <Text
              style={[
                styles.productPriceText,
                {
                  color:'green',
                  fontSize: theme.appFontSize.mediumSize,
                  fontFamily: theme.appFontSize.fontFamily
                }
              ]}
            >
              {priceNet}{percentagesym}
            </Text>
          </View>
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
            {name}
          </Text>

          {/* <Text
            style={[
              styles.productNameText,
              {
                color: theme.secondry,
                fontSize: theme.appFontSize.smallSize,
                fontFamily: theme.appFontSize.fontFamily
              }
            ]}
            numberOfLines={1}
          >
            {"small, blue"}
          </Text> */}

          <CounterSelection
            theme={theme}
            counterBackGroundColor={theme.secondaryBackgroundColor}
            width={
              Platform.OS === "ios"
                ? HEADER_IOS_HEIGHT * 0.245
                : HEADER_ANDROID_HEIGHT * 0.375
            }
            height={
              Platform.OS === "ios"
                ? HEADER_IOS_HEIGHT * 0.04
                : HEADER_ANDROID_HEIGHT * 0.08
            }
            iconSize={theme.appFontSize.smallSize}
            minimumValue={1}
            initialValue={quantity}
            value={quantitys}
            onIncrement={() => handleQuantityChange(quantitys + 1)}
            onDecrement={() =>
              handleQuantityChange(quantitys > 1 ? quantitys - 1 :1)
            }
          />
          {/* <TextInput
        style={styles.quantityInput}
        value={quantitys.toString()}
       
        //onChangeText={handleQuantityChange} // Call handleQuantityChange when text changes
        keyboardType="numeric"
      /> */}
          {/* Render other UI components that need to display the quantity */}
          {/* <Text>{quantitys}</Text> */}
        </View>
      </View>
      <TouchableOpacity style={styles.heartIcon} onPress={() => removeCartItem(basketId)}>
        <FontAwesome
          style={{
            color: theme.secondry,
            fontSize: theme.appFontSize.mediumSize
          }}
          name={"trash"}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  touchableOpacity: {
    flexDirection: "row",
    margin: 10,
    borderRadius: 6,
    marginTop: 4,
    marginBottom: 4,
    elevation: 0.2,
    shadowColor: "#000",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    padding: 8,
    paddingVertical:
      Platform.OS === "ios"
        ? HEADER_IOS_HEIGHT * 0.1
        : HEADER_ANDROID_HEIGHT * 0.12
  },
  priceRowInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 0
  },
  percentText: {
    textAlign: "left",
    textDecorationLine: "line-through",
    borderWidth: 1
  },
  productNameText: {
    width: 200,
    paddingBottom:
      Platform.OS === "ios"
        ? HEADER_IOS_HEIGHT * 0.05
        : HEADER_ANDROID_HEIGHT * 0.04,
    textAlign: "left"
  },
  productPriceText: {
    fontWeight: "bold",
    textAlign: "left"
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
  heartIcon: {
    paddingHorizontal: 8,
    position: "absolute",
    right: 5,
    top: 12
  },
  imageBackground: {
    height:
      Platform.OS === "ios"
        ? HEADER_IOS_HEIGHT * 1.2
        : HEADER_ANDROID_HEIGHT * 1.7,
    width:
      Platform.OS === "ios"
        ? HEADER_IOS_HEIGHT * 1.2
        : HEADER_ANDROID_HEIGHT * 1.7,
    margin: 0,
    marginRight: WIDTH * 0.017,
    borderRadius: 6
  },
  quantityInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: 100,
  },
  productNameView: {
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 1
  }
})

export default cartCard
