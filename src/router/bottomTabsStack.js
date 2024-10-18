import React, { useLayoutEffect,useEffect, useState } from "react"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Cart from "../screens/cartScreen"
import Category from "../screens/categoryScreen"
import Home from "../screens/homeScreen"
import Settings from "../screens/settingScreen"
import { connect } from "react-redux"
import { Platform, Text, View, StyleSheet } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  HEADER_ANDROID_HEIGHT,
  HEADER_IOS_HEIGHT,
  HEIGHT
} from "../components/config"
 import api from "../constants/api"
import { useCart } from "../context/CartContext"

const Tab = createBottomTabNavigator()
function HomeTabs({ reduxCounter, reduxLang,navigation, theme }) {

  // const [userContactId, setUserContactId] = useState([]);
  // console.log('settingContact',userContactId)
  // useEffect(()=>{
  // const getUserCart = async () => {
  //   try {
  //     const userData = await AsyncStorage.getItem('USER');
  //     const user = JSON.parse(userData);
  //     setUserContactId(user?.contact_id || null);
  //         } catch (error) {
  //     console.error('Error fetching cart:', error);
  //   }
  // };



  //   getUserCart();
  //     },[navigation,userContactId])
  const [cardData, setCartData] = useState([]);
  const [userContactId, setUserContactId] = useState(null);
  useEffect(()=>{
      const getUserCart = async () => {
        try {
          const userData = await AsyncStorage.getItem('USER');
          const user = JSON.parse(userData);
          setUserContactId(user && user.contact_id);
          
            const response = await api.post('/orders/getBasket', { contact_id: user.contact_id });
            setCartData(response.data.data);
          } catch (error) {
          console.error('Error fetching cart:', error);
        }
      };
   
        getUserCart();
          },[])

const{cart}=useCart();
const lengthNo =cart?.length
console.log('length',lengthNo)
      return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.secondry,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: Platform.OS === "android" ? HEIGHT * 0.07 : HEIGHT * 0.08,
          bottom: 0,
          backgroundColor: theme.secondryBackgroundColor,
          shadowOffset: { width: 0, height: -1 },
          shadowColor: "black",
          shadowOpacity: 0.12,
          elevation: 9,
          shadowRadius: 2,
          borderTopWidth: 0 // remove white line
        },
        tabBarItemStyle: {
          backgroundColor: theme.secondryBackgroundColor,
          padding: 0,
          margin: 0,
          height: Platform.OS === "android" ? HEIGHT * 0.065 : HEIGHT * 0.06
        },
        tabBarIconStyle: {
          width: 30,
          height: 30,
          padding: 0
        }
      }}
    >
      <Tab.Screen
        name={"HomeScreen"}
        component={Home}
        options={({ route }) => ({
          headerShown: false,
          tabBarLabel: reduxLang.Home,
          tabBarIcon: ({ size, color }) => (
            <FontAwesome
              style={{
                marginTop: -2,
                marginRight: -3,
                fontSize: theme.appFontSize.largeSize + 8,
                color: color
              }}
              name="home"
            />
          )
        })}
      />
      <Tab.Screen
        name={"Categories"}
        component={Category}
        options={({ route }) => ({
          tabBarIcon: ({ size, color }) => (
            <FontAwesome
              style={{
                marginTop: 2,
                fontSize: theme.appFontSize.largeSize + 4,
                color: color
              }}
              name="th-large"
            />
          )
        })}
      />
      <Tab.Screen
        name={"Cart"}
        component={Cart}
        options={({ route }) => ({
          tabBarIcon: ({ size, color }) => (
            <View style={[{}, styles.categoryView]}>
              <View
                style={[
                  styles.counterView,
                  {
                    backgroundColor: theme.primary
                  }
                ]}
              >
                <Text
                  style={[
                    styles.headerText,
                    {
                      color: theme.primaryTextColor,
                      fontSize: theme.appFontSize.smallSize - 2,
                      fontFamily: theme.appFontSize.fontFamily
                    }
                  ]}
                >
                  {lengthNo}
                </Text>
              </View>
              <FontAwesome
                style={{
                  color: color,
                  fontSize: theme.appFontSize.largeSize + 4
                }}
                name={"shopping-cart"}
              />
            </View>
          )
          // tabBarBadge: reduxCounter,
        })}
      />
      <Tab.Screen
        name={"Settings"}
        component={Settings}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <FontAwesome
              style={{
                marginTop: -1,
                fontSize: theme.appFontSize.largeSize + 4,
                color: color
              }}
              name="user"
            />
          )
        })}
      />
    </Tab.Navigator>
  )
}

const mapStateToProps = state => ({
  reduxLang: state.configReducer.lang,
  reduxCounter: state.configReducer.counter,
  theme: state.configReducer.theme
})
export default connect(mapStateToProps, null)(HomeTabs)

const styles = StyleSheet.create({
  containerView: {
    paddingHorizontal: 15,
    width: "100%",
    paddingVertical:
      Platform.OS === "ios"
        ? HEADER_IOS_HEIGHT * 0.1
        : HEADER_ANDROID_HEIGHT * 0.12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerText: {
    fontWeight: "bold",
    alignSelf: "center"
  },
  categoryTouch: {
    justifyContent: "center",
    alignItems: "center"
  },
  counterView: {
    position: "absolute",
    top:
      Platform.OS === "ios"
        ? -HEADER_IOS_HEIGHT * 0.13
        : -HEADER_ANDROID_HEIGHT * 0.2,
    zIndex: 10,
    right:
      Platform.OS === "ios"
        ? -HEADER_IOS_HEIGHT * 0.13
        : -HEADER_ANDROID_HEIGHT * 0.2,
    height:
      Platform.OS === "ios"
        ? HEADER_IOS_HEIGHT * 0.19
        : HEADER_ANDROID_HEIGHT * 0.28,
    width:
      Platform.OS === "ios"
        ? HEADER_IOS_HEIGHT * 0.29
        : HEADER_ANDROID_HEIGHT * 0.37,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  categoryView: {
    alignItems: "center",
    justifyContent: "center"
  }
})
