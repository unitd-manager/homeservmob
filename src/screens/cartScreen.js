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

const App = ({ navigation, theme, reduxLang,route }) => {
  console.log('route',route)
  const update = route?.params?.update || null
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
  const [cardData, setCartData] = useState([]);
  const [userContactId, setUserContactId] = useState(null);
  // const [update, setUpdate] = useState(false);
  // let [cardData] = useState([
  //   {
  //     url: require("../images/headPhone/CustomSize3.png"),
  //     productName: reduxLang.JBL,
  //     quantity: "120 Products"
  //   },
  //   {
  //     url: require("../images/headPhone/CustomSize3.png"),
  //     productName: reduxLang.Sony,
  //     quantity: "650 Products"
  //   }
  // ])

  
  console.log('cardData',cardData)


  const getUserCart = async () => {
    try {
      const userData = await AsyncStorage.getItem('USER');
      const user = JSON.parse(userData);
      setUserContactId(user && user.contact_id);
      if (user && user.contact_id) {
        const response = await api.post('/orders/getBasket', { contact_id: user.contact_id });
        setCartData(response.data.data);
      }
      else {
        Alert.alert(
          'Please Login',
          'You need to log in to add items to the cart.',
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
  // useEffect(() => {
  //   getUserCart();
  // }, []);
// const ViewCard =() =>{
//   if ( contactId && contactId !== null) {

//     api
//       .post('/orders/getBasket', {contact_id: contactId})
//       .then(res => {
//         // console.log('status', res.data.data);
//         setCartData(res.data.data)
//           });
//         } else {
//           Alert.alert(
//             'Please Login',
//             'You need to log in to add items to the cart.',
//             [
//                {
//                 text: 'Cancel',
//                 style: 'cancel',
//               },
//               {
//                 text: 'Login',
//                 onPress: onPressSignIn,
//               },
//             ]
//           );
//         }
    
// }

// useEffect(() => {
//   ViewCard();
// }, [contactId]);
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
  // const [user, setUserData] = useState();
  // const getUser = async () => {
  //   let userData = await AsyncStorage.getItem('USER');
  //   userData = JSON.parse(userData);
  //   setUserData(userData);
  // };

  // const contactId = user ? user.contact_id : null;


  // useEffect(() => {
  //   getUser();
  // }, [navigation,contactId,user]);

 

  // console.log('contactId', contactId);

  // const handleQuantityChange = (newQuantity) => {
  //   setQuantity(newQuantity);
  // };
 
  const handleQuantityChange = (index, newQuantity) => {
    const updatedCartData = [...cardData];
    updatedCartData[index].qty = newQuantity;
    setCartData(updatedCartData);
  };
  const calculateTotal = () => {
    return cardData.reduce((total, product) => {
     
      return total + (parseFloat(product.price) * parseFloat(product.qty));
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
        {cardData && cardData.map((item, index) => {
  console.log('Item:', item.images); // This will log each item in the cardData array
  console.log('Item:', item.price);
  console.log('Item:', item.discount_amount);
  return (
    <CartCard
      key={index}
      url={{ uri: `${imageBase}${item.images}` }}
      price={item.price}
      priceNet={item.discount_amount}
      quantity={item.qty}
      name={item.title}
      basketId={item.basket_id}
      calculation={cardData}
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
          {textRow(reduxLang.SubTotal, "$6.00")}
          {textRow(reduxLang.Shipping, "$0.00")}

          {textRow(reduxLang.Tax, "$3.00")}

          {textRow(reduxLang.Discount, "$12.00")}
          <View style={{ marginVertical: 2 }} />
          {textRow(reduxLang.Total,  `Rs :${calculateTotal()}`, true)}
        </View>

        <View
          style={{
            paddingVertical: 9,
            backgroundColor: theme.secondryBackgroundColor,
            marginVertical: 5
          }}
        >
          { userContactId !== null && cardData.length !== 0 &&
          <CustomBtn
            onPressFun={() => {
              navigation.navigate("ShippingAddress",{datas:cardData,total:calculateTotal()})
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