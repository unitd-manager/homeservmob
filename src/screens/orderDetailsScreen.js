import React, { useLayoutEffect,useState,useEffect } from "react"
import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import { connect } from "react-redux"
import { ScrollView } from "react-native-gesture-handler"
import ScreenIndicator from "../components/screenIndicator"
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../constants/api"

const headingText = (theme, heading) => (
  <View
    style={[
      styles.headingView,
      {
        backgroundColor: theme.secondryBackgroundColor
      }
    ]}
  >
    <Text
      style={{
        fontSize: theme.appFontSize.largeSize,
        color: theme.textColor,
        fontFamily: theme.appFontSize.fontFamily,
        fontWeight: "bold",
        textAlign: "left"
      }}
    >
      {heading}
    </Text>
  </View>
)

const singleRowtext = (theme, key, value, bold) => (
  <View style={styles.singleRowView}>
    <Text
      style={{
        color: theme.textColor,
        fontSize: theme.appFontSize.mediumSize,
        fontFamily: theme.appFontSize.fontFamily,
        fontWeight: bold ? "bold" : "normal"
      }}
    >
      {key}
    </Text>
    <Text
      style={{
        color: theme.textColor,
        fontSize: theme.appFontSize.mediumSize,
        fontFamily: theme.appFontSize.fontFamily,
        fontWeight: bold ? "bold" : "normal"
      }}
    >
      {value}
    </Text>
  </View>
)
const bodyRowText = (theme, text) => (
  <View style={styles.bodyView}>
    <Text
      style={{
        fontSize:15,
        color: 'black',
        // fontFamily: theme.appFontSize.fontFamily
      }}
    >
      {text}
    </Text>
  </View>
)

const MyOrdersScreen = ({ navigation, theme, reduxLang, route }) => {
  const { orderNo } = route.params

  const [UserDetails, setUserDetails] = useState({});
 
  const [userContactId, setUserContactId] = useState(null);
  const [orderItem, setOrderItem] = useState([]);

  const calculatepercentageSubTotals = () => {
    return orderItem.reduce((total, product) => {
      const discount = product.discount_percentage ? parseFloat(product.discount_percentage) : 0;
      const price = parseFloat(product.unit_price);
      
      // Calculate the discount amount from the percentage
      const discountAmount = (price * discount) / 100;
  
      // Price after applying the discount percentage
      const priceAfterDiscount = price - discountAmount;
  
      // Calculate total for the product and add to the running total
      return total + (priceAfterDiscount * parseFloat(product.qty));
    }, 0).toFixed(2);
  };
  
  const calculatepercentageTotals = () => {
    return orderItem.reduce((total, product) => {
      const discount = product.discount_percentage ? parseFloat(product.discount_percentage) : 0;
      const price = parseFloat(product.unit_price);

      const gst = 18
    
      // Calculate the discount amount from the percentage
      const discountAmount = (price * discount) / 100;
  
      // Price after applying the discount percentage
      const priceAfterDiscount = price - discountAmount;

      const Totalamount =   priceAfterDiscount * parseFloat(product.qty)
      
      const gstAmount = (Totalamount * gst) / 100;
       
      const TotalWithGst = Totalamount + gstAmount
  
      // Calculate total for the product and add to the running total
      return total + (TotalWithGst);
    }, 0).toFixed(2);
  };

  const calculatepercentageTotal = () => {
    return orderItem.reduce((total, product) => {
      const discount = product.discount_percentage ? parseFloat(product.discount_percentage) : 0;
      const price = parseFloat(product.unit_price);
      
      // Calculate the discount amount from the percentage
      const discountAmount = (price * discount) / 100;
  
      // Price after applying the discount percentage
      // const priceAfterDiscount = price - discountAmount;
  
      // Calculate total for the product and add to the running total
      return total + (discountAmount * parseFloat(product.qty));
    }, 0).toFixed(2);
  };

  const calculateGstpercentageTotal = () => {
    return orderItem.reduce((total, product) => {

      const gst = '9' 
      const discount = product.discount_percentage ? parseFloat(product.discount_percentage) : 0;
      const price = parseFloat(product.unit_price);
      
      // Calculate the discount amount from the percentage
      const discountAmount = (price * discount) / 100;
  
      // Price after applying the discount percentage
      const priceAfterDiscount = price - discountAmount;

      const gstAmount = (priceAfterDiscount * gst) / 100;
  
      // Calculate total for the product and add to the running total
      return total + (gstAmount * parseFloat(product.qty));
    }, 0).toFixed(2);
  };
  
  const calculateIGstpercentageTotal = () => {
    return orderItem.reduce((total, product) => {

      const gst = '9' 
      const discount = product.discount_percentage ? parseFloat(product.discount_percentage) : 0;
      const price = parseFloat(product.unit_price);
      
      // Calculate the discount amount from the percentage
      const discountAmount = (price * discount) / 100;
  
      // Price after applying the discount percentage
      const priceAfterDiscount = price - discountAmount;

      const gstAmount = (priceAfterDiscount * gst) / 100;
  
      // Calculate total for the product and add to the running total
      return total + (gstAmount * parseFloat(product.qty));
    }, 0).toFixed(2);
  };
  const calculateSubTotal = () => {
    return orderItem.reduce((total, product) => {
     
      return total + (parseFloat(product.unit_price) * parseFloat(product.qty));
    }, 0).toFixed(2);
  };  

  const getUserCart = async () => {
    try {
      const userData = await AsyncStorage.getItem('USER');
      const user = JSON.parse(userData);
      setUserDetails(user)
      setUserContactId(user?.contact_id || null);
      
    
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    getUserCart();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
          const response = await api.post("/orders/getOrderHistoryById", {
            order_id: orderNo.order_id
          })
          setOrderItem(response.data.data)
    
      } catch (error) {
        console.error("Error fetching orders:", error)
      }
    }

    fetchOrders()
  }, [])

  // Header Settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: orderNo,
      headerStyle: {
        backgroundColor: theme.secondryBackgroundColor,
        shadowColor: "transparent"
      },
      headerTintColor: theme.textColor
    })
  }, [navigation, orderNo, theme.secondryBackgroundColor, theme.textColor])

  const [] = React.useState(0)

  const [] = React.useState([true, false, false, false])

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.primaryBackgroundColor }
      ]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        {/* <View style={styles.deviderStyleView}>
          <ScreenIndicator
            theme={theme}
            text={"1"}
            label={reduxLang.OnHold}
            selectedValue={true}
          />
          <ScreenIndicator
            theme={theme}
            text={"2"}
            label={reduxLang.Processing}
            selectedValue={false}
          />
          <ScreenIndicator
            theme={theme}
            text={"3"}
            label={reduxLang.Completed}
            selectedValue={false}
          />
        </View> */}

        {headingText(theme, reduxLang.BillingAddress)}

          <View style={styles.bodyView} >
          <Text>Name     : {UserDetails.first_name}</Text>
          <Text>Address: {UserDetails.address1}</Text>
          <Text>                {UserDetails.mobile}</Text>
          <Text>                {UserDetails.address_city}</Text>
          <Text>                {UserDetails.address_po_code}</Text>
          <Text>                {UserDetails.address_state}</Text>
          </View>
        

        {headingText(theme, reduxLang.ShippingAddress)}

   
          <View style={styles.bodyView} >
          <Text>Name     : {orderNo.shipping_first_name}</Text>
          <Text>Address: {orderNo.shipping_address1}</Text>
          <Text>                {orderNo.shipping_address_city}</Text>
          <Text>                {orderNo.shipping_address_po_code}</Text>
          <Text>                {orderNo.shipping_phone}</Text>
          <Text>                {orderNo.shipping_address_state}</Text>
          <Text>                {orderNo.shipping_address_country_code}</Text>
          </View>
    

        {headingText(theme, reduxLang.Products)}

        {orderItem.length > 0 ? (
  orderItem.map((item, index) => {


    return (
      <View
        key={index}
        style={{
          width: "95%",
          alignSelf: "center",
          borderBottomWidth: 1,
          borderBottomColor: theme.secondryBackgroundColor
        }}
      >
        {singleRowtext(theme, `${item.item_title || "N/A"}`, "", true)}
        {singleRowtext(theme, reduxLang.Price, `Rs:${parseFloat(item.unit_price || 0).toFixed(2)}`, false)}
        {singleRowtext(theme, reduxLang.Quantity, `${parseFloat(item.qty || 0).toFixed(2)}`, false)}
        {singleRowtext(theme, 'Discount', `Rs:${parseFloat(item.discount_amount || 0).toFixed(2)}`, false)}
        {singleRowtext(theme, reduxLang.Total, `Rs:${parseFloat(item.total_amount || 0).toFixed(2)}`, true)}
      </View>
    );
  })
) : (
  <Text style={{ textAlign: 'center', color: theme.textColor }}>No Items Available</Text>
)}

  
        <View
          style={{
            width: "95%",
            alignSelf: "center",
            backgroundColor: theme.secondryBackgroundColor,
            marginTop: "3%",
            marginBottom: "3%",
            padding: "3%"
          }}
        >
          {singleRowtext(theme, reduxLang.Subtotal,`Rs :${calculateSubTotal()}`, false)}

          {singleRowtext(
            theme,
            reduxLang.ShippingMethod,
            "Free Shipping",
            false
          )}
          {singleRowtext(theme, 'Total Discount', `Rs :${calculatepercentageTotal()}`, false)}
          {singleRowtext(theme, 'Price Amount', `Rs :${calculatepercentageSubTotals()}`, false)}
          {singleRowtext(theme, 'GST  9%', `${calculateGstpercentageTotal()}`, false)}
          {singleRowtext(theme, 'IGST 9%', `${calculateIGstpercentageTotal()}`, false)}
          {singleRowtext(theme, reduxLang.Total,`Rs :${calculatepercentageTotals()}`, true)}
        </View>

        {headingText(theme, reduxLang.PaymentMethod)}

        {bodyRowText(theme, `${orderNo.payment_method}` )}

        {headingText(theme, reduxLang.OrderNotes)}

        {bodyRowText(theme, reduxLang.DontHaveAnAccount)}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flex: 1,
    width: "100%"
  },

  headingView: {
    justifyContent: "flex-start",
    width: "100%",
    padding: 10,
    margin: 1,
    marginLeft: 0,
    marginRight: 0
  },
  scrollViewContainerStyle: {
    paddingBottom: 5,
    alignItems: "center"
  },
  bodyView: {
    alignItems: "flex-start",
    width: "100%",
    padding: 10,
    paddingTop: 8,
    paddingBottom: 8,
  },
  singleRowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "0.8%"
  },
  deviderStyleView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "10%",
    marginBottom: "10%",
    width: "100%",
    alignSelf: "center"
  }
})

const mapStateToProps = state => ({
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang
})

export default connect(mapStateToProps, null)(MyOrdersScreen)
