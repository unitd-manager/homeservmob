import React from "react"
import SettingScreen from "../screens/settingScreen"
import HomeTabs from "./bottomTabsStack"
import Search from "../screens/searchScreen"
import Category from "../screens/categoryScreen"
import BlogScreen from "../screens/blogScreen"
import BlogDetails from "../screens/blogDetails"
import Shop from "../screens/shopScreen"
import LoginStack from "./stacks/loginStack"
import CustomizeThemeScreen from "../screens/customizeThemeScreen"
import ContactUs from "../screens/contactUsScreen"
import ProductDetail from "../screens/productDetailsScreen"
import Wishlist from "../screens/wishlistScreen"
import ShippingAddress from "../screens/shippingAddress"
import AboutUs from "../screens/aboutUsScreen"
import ShippingMethod from "../screens/shippingMethod"
import OrderPage from "../screens/orderPage"
import ThankYouScreen from "../screens/thankYouScreen"
import ProductDescriptionScreen from "../screens/productDescriptionScreen"
import RatingReviewsScreen from "../screens/ratingReviewsScreen"
import addAddressScreen from "../screens/addAddressScreen"
import AddressScreen from "../screens/addressScreen"
import OrderDetailsScreen from "../screens/orderDetailsScreen"
import IntroSliderScreen from "../screens/introSliderScreen"
import MyOrdersScreen from "../screens/myOrdersScreen"
import PrivacyPolicyScreen from "../screens/privacyPolicyScreen"
import TermsAndCondScreen from "../screens/termsAndCondScreen"
import ProfileScreen from "../screens/updateProfileScreen"
import LogoutScreen from "../screens/LogoutScreen"
import cartScreen from "../screens/cartScreen"
import OfferList from "../components/homeComponents/OfferList"
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()

function MyTabsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeTabs}
      />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen
        name="ProductDescriptionScreen"
        component={ProductDescriptionScreen}
      />
      <Stack.Screen
        name="RatingReviewsScreen"
        component={RatingReviewsScreen}
      />
      <Stack.Screen name="CustomizeTheme" component={CustomizeThemeScreen} />
      <Stack.Screen
        name="Category"
        options={{ headerShown: true }}
        component={Category}
      />
      <Stack.Screen name="Wishlist" component={Wishlist} />
      <Stack.Screen name="ShippingAddress" component={ShippingAddress} />
      <Stack.Screen name="ShippingMethod" component={ShippingMethod} />
      <Stack.Screen name="OrderPage" component={OrderPage} />
      <Stack.Screen name="ThankYouScreen" component={ThankYouScreen} />
      <Stack.Screen name="Shop" component={Shop} />
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={LoginStack}
      />
       <Stack.Screen
        name="LogoutScreen"
        options={{ headerShown: false }}
        component={LogoutScreen}
      />
      <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AddAddress" component={addAddressScreen} />
      <Stack.Screen name="Address" component={AddressScreen} />
      <Stack.Screen name="OfferList" component={OfferList} />
      <Stack.Screen
        name="IntroSliderScreen"
        options={() => {
          return {
            tabBarVisible: false,
            headerShown: false
          }
        }}
        component={IntroSliderScreen}
      />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="cartScreen" component={cartScreen} />
      <Stack.Screen name="BlogScreen" component={BlogScreen} />
      <Stack.Screen name="BlogDetails" component={BlogDetails} />
      <Stack.Screen name="TermsAndCond" component={TermsAndCondScreen} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
    </Stack.Navigator>
  )
}

export default MyTabsStack
