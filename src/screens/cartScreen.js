import React, { useLayoutEffect, useEffect, useState } from "react"
import {
  I18nManager,
  SafeAreaView,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  Alert
} from "react-native"
import { connect } from "react-redux"
import CartCard from "../components/cartCard"
import CustomBtn from "../components/customBtn"
import { WIDTH } from "../components/config"
import WishlistCategory from "../components/wishlistCategory"
import AsyncStorage from "@react-native-async-storage/async-storage"
import imageBase from "../constants/imageBase"
import api from "../constants/api"
import { useCart } from "../context/CartContext"


const App = ({ navigation, theme, reduxLang,route }) => {
 
  const update = route?.params?.update || null

  const { fetchAllCartItems,cart,removeItem } = useCart();
  // Header Settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: reduxLang.Cart,
      headerStyle: {
        backgroundColor: theme.secondryBackgroundColor,
        shadowColor: "transparent"
      },
      headerTintColor: theme.textColor
    })
  }, [
    navigation,
    reduxLang.Cart,
    theme.secondryBackgroundColor,
    theme.textColor
  ])

  const [promoCode, onChangePromoCode] = React.useState("")

  const onPressSignIn = () => {
    navigation.navigate("Login");
  };
  const [carts, setCartData] = useState(cart);
  const [userContactId, setUserContactId] = useState(null);
 
  const getUserCart = async () => {
    try {
      const userData = await AsyncStorage.getItem('USER');
      const user = JSON.parse(userData);
      setUserContactId(user && user.contact_id);
      if (user && user.contact_id) {
        // const response = await api.post('/orders/getBasket', { contact_id: user.contact_id });
       
        fetchAllCartItems(user.contact_id)
        // setCartData(response.data.data);
      }
      else {
        Alert.alert(
          'Please Login',
          'You need to login to add items to the cart.',
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
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };
  
  useEffect(()=>{
    getUserCart();
  },[update])

  useEffect(()=>{
    getUserCart();
      },[navigation])
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
    </View>
  )

  const textRow = (keyText, valueText, bold) => (
    <View
      style={[
        styles.rowContainer,
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
            fontSize: bold
              ? theme.appFontSize.largeSize + 1
              : theme.appFontSize.mediumSize,
            fontFamily: theme.appFontSize.fontFamily,
            fontWeight: bold ? "bold" : "normal"
          }
        ]}
      >
        {keyText}
      </Text>

      <Text
        style={[
          styles.headerText,
          {
            color: theme.textColor,
            fontSize: bold
              ? theme.appFontSize.largeSize + 1
              : theme.appFontSize.mediumSize,
            fontFamily: theme.appFontSize.fontFamily,
            fontWeight: bold ? "bold" : "normal"
          }
        ]} 
      >
        {valueText}
      </Text>
    </View>
  )
  
 
  const handleQuantityChange = (index, newQuantity) => {
    const updatedCartData = [...cart];
    updatedCartData[index].qty = newQuantity;
    setCartData(updatedCartData);
  };
  const calculateTotal = () => {
    return cart.reduce((total, product) => {
      const discount = product.discount_amount ? parseFloat(product.discount_amount) : 0;
      const priceAfterDiscount = parseFloat(product.price) - discount;
      
      return total + (priceAfterDiscount * parseFloat(product.qty));
    }, 0).toFixed(2);
  };
  const calculatepercentageTotals = () => {
    const percentageTotals = cart.reduce((total, product) => {
      const discount = product.discount_percentage ? parseFloat(product.discount_percentage) : 0;
      const price = parseFloat(product.price);
      
      // Calculate the discount amount from the percentage
      const discountAmount = (price * discount) / 100;
  
      // Price after applying the discount percentage
      const priceAfterDiscount = price - discountAmount;
  
      // Calculate total for the product and add to the running total
      return total + (priceAfterDiscount * parseFloat(product.qty)||0);
    }, 0);
    return percentageTotals === 0 ? "0.00" : percentageTotals.toFixed(2);
  };
  const calculatepercentageTotalAmount = () => {
    const percentageTotalAmount= cart.reduce((total, product) => {
      const discount = product.discount_percentage ? parseFloat(product.discount_percentage) : 0;
      const price = parseFloat(product.price);

      const gst = 18
    
      // Calculate the discount amount from the percentage
      const discountAmount = (price * discount) / 100;
  
      // Price after applying the discount percentage
      const priceAfterDiscount = price - discountAmount;

      const Totalamount =   priceAfterDiscount * parseFloat(product.qty)
      
      const gstAmount = (Totalamount * gst) / 100;
       
      const TotalWithGst = Totalamount + gstAmount
  
      // Calculate total for the product and add to the running total
      return total + (TotalWithGst)||0;
    }, 0);

    return percentageTotalAmount === 0 ? "0.00" : Math.round(percentageTotalAmount).toFixed(2);
  };

  const calculatepercentageTotal = () => {
    const percentage= cart.reduce((total, product) => {
      const discount = product.discount_percentage ? parseFloat(product.discount_percentage) : 0;
      const price = parseFloat(product.price);
      
      // Calculate the discount amount from the percentage
      const discountAmount = (price * discount) / 100;
  
      // Price after applying the discount percentage
      // const priceAfterDiscount = price - discountAmount;
  
      // Calculate total for the product and add to the running total
      return total + (discountAmount * parseFloat(product.qty)||0);
    }, 0);
    return percentage === 0 ? "0.00" : percentage.toFixed(2);
  };
  
  const calculateSubTotal = () => {
    
    const subtotal = cart.reduce((total, product) => {
      return total + (parseFloat(product.price) * parseFloat(product.qty) || 1);
    }, 0);
    
    return subtotal === 0 ? "0.00" : subtotal.toFixed(2);
  };
  


  const calculateGstpercentageTotal = () => {
    const GstpercentageTotal = cart.reduce((total, product) => {

      const gst = '9' 
      const discount = product.discount_percentage ? parseFloat(product.discount_percentage) : 0;
      const price = parseFloat(product.price);
      
      // Calculate the discount amount from the percentage
      const discountAmount = (price * discount) / 100;
  
      // Price after applying the discount percentage
      const priceAfterDiscount = price - discountAmount;

      const gstAmount = (priceAfterDiscount * gst) / 100;
  
      // Calculate total for the product and add to the running total
      return total + (gstAmount * parseFloat(product.qty)||0);
    }, 0);
    return GstpercentageTotal === 0 ? "0.00" : GstpercentageTotal.toFixed(2);
  };
  
  const calculateIGstpercentageTotal = () => {
    const IGstpercentageTotal= cart.reduce((total, product) => {

      const gst = '9' 
      const discount = product.discount_percentage ? parseFloat(product.discount_percentage) : 0;
      const price = parseFloat(product.price);
      
      // Calculate the discount amount from the percentage
      const discountAmount = (price * discount) / 100;
  
      // Price after applying the discount percentage
      const priceAfterDiscount = price - discountAmount;

      const gstAmount = (priceAfterDiscount * gst) / 100;
  
      // Calculate total for the product and add to the running total
      return total + (gstAmount * parseFloat(product.qty)||0);
    }, 0);
    return IGstpercentageTotal === 0 ? "0.00" : IGstpercentageTotal.toFixed(2);
  };
 
  const calculateDicountTotal = () => {
    return cart.reduce((total, product) => {
      return total + (parseFloat(product.discount_amount));
    }, 0).toFixed(2);
  };

  

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.primaryBackgroundColor }
      ]}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        
        <View>
        {cart && cart.map((item, index) => {
 
  return (
    <CartCard
      key={index}
      item={item}
      url={{ uri: `${imageBase}${item.images}` }}
      price={item.price}
      priceNet={item.discount_percentage}
      quantity={item.qty}
      name={item.title}
      basketId={item.basket_id}
      calculation={cart}
      theme={theme}
      getUser={getUserCart}
      onUpdateQuantity={newQuantity => handleQuantityChange(index, newQuantity)}
    />
  );
})}
</View>
        
        <View
          style={[
            styles.descriptionView,
            { backgroundColor: theme.secondryBackgroundColor }
          ]}
        >
          {headerFun(reduxLang.PromoCode)}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 14
            }}
          >
            <TextInput
              style={[
                styles.textInputStyle,
                {
                  backgroundColor: theme.primaryBackgroundColor,
                  color: theme.textColor,
                  fontSize: theme.appFontSize.mediumSize,
                  fontFamily: theme.appFontSize.fontFamily
                }
              ]}
              onChangeText={text => onChangePromoCode(text)}
              placeholder={reduxLang.EnterPromoCodeHere}
              placeholderTextColor={"gray"}
              value={promoCode}
            />

            <CustomBtn
              borderRadius={6}
              width={WIDTH * 0.188}
              onPressFun={() => {}}
              theme={theme}
              bold={true}
              textSize={theme.appFontSize.mediumSize}
              title={reduxLang.Apply}
            />
          </View>
        </View>

        <View
          style={{
            paddingVertical: 9,
            backgroundColor: theme.secondryBackgroundColor
          }}
        >
          {textRow(reduxLang.SubTotal, `Rs :${calculateSubTotal()}`?`Rs :${calculateSubTotal()}`:'', true)}
          {/* {textRow(reduxLang.Shipping, "$0.00")} */}
          
          {textRow(reduxLang.Discount,  `Rs :${calculatepercentageTotal()}`, true)}
          <View style={{ marginVertical: 2 }} />
          {textRow('Total Amount',  `Rs :${calculatepercentageTotals()}`, true)}
          {textRow( 'SGST  9%', `${calculateGstpercentageTotal()}`, false)}
          {textRow( 'IGST 9%', `${calculateIGstpercentageTotal()}`, false)}
          {textRow( reduxLang.Total,`Rs :${calculatepercentageTotalAmount()}`, true)}
        </View>

        <View
          style={{
            paddingVertical: 9,
            backgroundColor: theme.secondryBackgroundColor,
            marginVertical: 5
          }}
        >
          { userContactId !== null && cart.length !== 0 &&
          <CustomBtn
            onPressFun={() => {
              navigation.navigate("ShippingAddress",{datas:cart,totalAmount:calculatepercentageTotalAmount(),gst:calculateGstpercentageTotal(),igst:calculateIGstpercentageTotal(),total:calculatepercentageTotals(),percentage:calculatepercentageTotal(),subTotal:calculateSubTotal()})
            }}
            theme={theme}
            bold={true}
            textSize={theme.appFontSize.mediumSize}
            title={reduxLang.Checkout}
          />
          }
        </View>
        <WishlistCategory
          // productDetailData={data}
          theme={theme}
          reduxLang={reduxLang}
        />
 
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  demoContainer: {
    padding: 40
  },
  headerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 8
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 6,
    paddingHorizontal: 14
  },
  textInputStyle: {
    borderColor: "gray",
    width: "75%",
    borderRadius: 10,
    padding: Platform.OS === "ios" ? 8 : 5,
    paddingLeft: 12,
    marginRight: 17,
    textAlign: I18nManager.isRTL ? "right" : "left",
    alignSelf: "center"
  },
  descriptionView: {
    paddingHorizontal: 1,
    paddingBottom: 10,
    marginVertical: 5
  },
  headerText: {
    paddingHorizontal: 4,
    textAlign: "left"
  },
  scrollView: {
    flex: 1,
    marginVertical: 4
  },
  marginHorr: {
    marginHorizontal: -4
  }
})

const mapStateToProps = state => ({
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang
})

export default connect(mapStateToProps, null)(App)
