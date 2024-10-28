import React, { useLayoutEffect, useState,useEffect } from "react"
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  I18nManager,
  Modal,
  Platform,
  FlatList,
  Alert
} from "react-native"
import { connect } from "react-redux"
import IoniconsIcon from "react-native-vector-icons/Ionicons"
import Ionicons from "react-native-vector-icons/FontAwesome"
import * as globalLocation from "../components/locationData"
import CustomBtn from "../components/customBtn"
import { TouchableOpacity } from "react-native-gesture-handler"
import ScreenIndicator from "../components/screenIndicator"
import { HEADER_IOS_HEIGHT, HEADER_ANDROID_HEIGHT } from "../components/config"
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../constants/api"

const labelViewFun = (
  theme,
  text,
  selectedValue,
  showModal,
  headerText,
  setmodalHeader,
  setmodalData,
  modalData
) => (
  <TouchableOpacity
    onPress={() => {
      setmodalData(modalData)
      setmodalHeader(headerText)
      showModal()
    }}
    style={[
      styles.textInput,
      {
        backgroundColor: theme.secondryBackgroundColor,
        flexDirection: "row",
        justifyContent: "space-between"
      }
    ]}
  >
    <Text
      style={[
        styles.textStyle,
        {
          color: theme.textColor,
          fontSize: theme.appFontSize.mediumSize,
          fontFamily: theme.appFontSize.fontFamily
        }
      ]}
    >
      {text}
    </Text>

    <View style={styles.commonViewTextIconStyle}>
      <Text
        numberOfLines={1}
        style={[
          styles.selectedText,
          {
            color: theme.textColor,
            width: "50%",
            textAlign: "right",
            fontSize: theme.appFontSize.mediumSize,
            fontFamily: theme.appFontSize.fontFamily
          }
        ]}
      >
        {selectedValue}
      </Text>
      <Ionicons
        style={[
          {
            color: theme.secondry,
            fontSize: theme.appFontSize.smallSize + 1
          }
        ]}
        name={!I18nManager.isRTL ? "chevron-right" : "chevron-left"}
      />
    </View>
  </TouchableOpacity>
)

const AddAddressScreen = ({ navigation, theme, reduxLang, route }) => {
  /////////////////// Header Settings
  const { total,datas,percentage,subTotal,totalAmount,gst,igst } = route.params;
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: reduxLang.ShippingAddress,
      headerStyle: {
        backgroundColor: theme.secondryBackgroundColor,
        shadowColor: "transparent"
      },
      headerTintColor: theme.textColor
    })
  }, [navigation, theme.secondryBackgroundColor, theme.textColor])
  ///////////////////

  ///////////////////
  const [firstName, onChangefirstName] = React.useState("")
  const [lastName, onChangeLastName] = React.useState("")
  const [email, onChangeEmail] = React.useState("")
  const [phone, onChangePhone] = React.useState("")
  const [city, onChangeCity] = React.useState("")
  const [pincode, onChangePincode] = React.useState("")
  const [address, onChangeAddress] = React.useState("")
  let firstNameTextInput = ""
  let lastNameTextInput = ""
  let addressTextInput = ""
  let cityTextInput = ""
  let emailTextInput = ""
  let pincodeTextInput = ""
  ////////////////
   console.log('firstName',firstName)
   console.log('lastName',lastName)
   console.log('email',email)
   console.log('address',address)
   const [cart, setCart] = useState([]);
   const [userContactId, setUserContactId] = useState(null);
  

  const getUserCart = async () => {
    try {
      const userData = await AsyncStorage.getItem('USER');
      const user = JSON.parse(userData);
      setUserContactId(user?.contact_id || null);
      if (user && user.contact_id) {
        const response = await api.post('/orders/getBasket', { contact_id: user.contact_id });
        setCart(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    getUserCart();
  }, []);


  const validation = () => {
    if (!firstName.trim()) {
      Alert.alert('Please enter your first name.');
      return false;
    }
    if (!address.trim()) {
      Alert.alert('Please enter your address.');
      return false;
    }
    if (!email.trim()) {
      Alert.alert('Please enter your email.');
      return false;
    }
    if (!phone.trim()) {
      Alert.alert('Please enter your phone number.');
      return false;
    }
    if (!city.trim()) {
      Alert.alert('Please enter your city.');
      return false;
    }
    return true;
  };


  const addDeliveryAddress = async () => {
    if (!userContactId) {
      Alert.alert('User information not found.');
      return;
    }
  
    try {
      const response = await api.post('/orders/insertorders', {
        shipping_first_name: firstName,
        shipping_last_name: lastName,
        shipping_email: email,
        shipping_phone: phone,
        shipping_address1: address,
        shipping_address_city: city,
        shipping_address_state: statesName, // assuming this is correct
        shipping_address_country_code: country, // assuming this is correct
        shipping_address_po_code: pincode,
        contact_id: userContactId
      });
  
      if (response.status === 200) {
        const orderId = response.data.data.insertId;
  
        // Insert each order item one by one
        const orderItemsPromises = cart.map(item => {
          return api.post('/orders/insertOrderItem', {
            qty: item.qty,
            unit_price: item.price,
            contact_id: userContactId,
            order_id: orderId
          });
        });
  
        const orderItemsResponses = await Promise.all(orderItemsPromises);
        
        // Check if all order items were inserted successfully
        const allInserted = orderItemsResponses.every(response => response.status === 200);
        
        if (allInserted) {
          Alert.alert('Order placed successfully');
          // navigation.navigate("ShippingMethod");
        } else {
          console.error('Error placing one or more order items');
        }
      } else {
        console.error('Error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // states and country data
  const [country, setCountryName] = React.useState(
    globalLocation.data.countries[12].name
  )
  const [statesName, setStateName] = React.useState(
    globalLocation.data.states.AU[1].name
  )

  const [countriesArray] = useState(globalLocation.data.countries)
  const [StatesArray] = useState(globalLocation.data.states)

  //Modal
  const [modalData, setmodalData] = React.useState(
    globalLocation.data.countries
  )
  const [modalHeader, setmodalHeader] = React.useState("")
  const [isModalVisible, setModalVisibles] = useState(false)
  const showModal = () => setModalVisibles(true)
  const hideModal = () => setModalVisibles(false)

  function selectedText(value) {
    if (modalHeader === reduxLang.Select + " " + reduxLang.State) {
      setStateName(value)
    } else {
      setCountryName(value)
    }
    hideModal()
  }

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
        <KeyboardAvoidingView
          keyboardVerticalOffset={5}
          behavior={"position"}
          style={styles.container}
        >
          <Modal visible={isModalVisible}>
            <View
              style={[
                styles.modalView,
                {
                  backgroundColor: theme.primaryBackgroundColor
                }
              ]}
            >
              <View
                style={{
                  height: Platform.OS === "ios" ? "9%" : "7%",
                  backgroundColor: theme.secondryBackgroundColor,
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  paddingTop: Platform.OS === "ios" ? "8%" : "0%"
                }}
              >
                <TouchableOpacity
                  style={{ overflow: "visible" }}
                  onPress={() => {
                    hideModal()
                  }}
                >
                  <IoniconsIcon
                    onPress={() => {
                      hideModal()
                    }}
                    name={"close-outline"}
                    //light
                    style={{
                      fontSize: theme.appFontSize.largeSize + 7,
                      paddingLeft: I18nManager.isRTL ? "5%" : "7%",
                      paddingRight: I18nManager.isRTL ? "5%" : "23%"
                    }}
                    color={theme.textColor}
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    styles.modalText,
                    {
                      color: theme.textColor,
                      marginBottom: 0,
                      fontSize: theme.appFontSize.largeSize,
                      fontFamily: theme.appFontSize.fontFamily
                    }
                  ]}
                >
                  {modalHeader}
                </Text>
              </View>
              <FlatList
                data={modalData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={item => (
                  <TouchableOpacity
                    key={item.item.value}
                    onPress={() => selectedText(item.item.name)}
                    style={[
                      styles.picketTouchAbleStyle,
                      {
                        backgroundColor: theme.primaryBackgroundColor
                      }
                    ]}
                  >
                    <Text
                      onPress={() => selectedText(item.item.name)}
                      style={[
                        styles.pickerTextStyle,
                        {
                          color: theme.textColor,
                          width: "100%",
                          fontSize: theme.appFontSize.mediumSize,
                          fontFamily: theme.appFontSize.fontFamily
                        }
                      ]}
                    >
                      {item.item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              ></FlatList>
            </View>
          </Modal>

          <View style={styles.deviderStyleView}>
            <ScreenIndicator
              theme={theme}
              text={"1"}
              label={reduxLang.Shipping}
              selectedValue={true}
            />
            <ScreenIndicator
              theme={theme}
              text={"2"}
              label={reduxLang.ShippingMethod}
              selectedValue={false}
            />
            <ScreenIndicator
              theme={theme}
              text={"3"}
              label={reduxLang.PlaceOrder}
              selectedValue={false}
            />
          </View>

          <View style={styles.nameContainer}>
            <TextInput
              style={[
                styles.textInput,
                {
                  width: "45%",
                  backgroundColor: theme.secondryBackgroundColor,
                  color: theme.textColor,
                  fontSize: theme.appFontSize.mediumSize,
                  fontFamily: theme.appFontSize.fontFamily
                }
              ]}
              onChangeText={text => onChangefirstName(text)}
              placeholder={reduxLang.FirstName}
              placeholderTextColor={"gray"}
              value={firstName}
              onSubmitEditing={() => {
                firstNameTextInput.focus()
              }}
              blurOnSubmit={false}
            />

            <TextInput
              style={[
                styles.textInput,
                {
                  width: "45%",
                  backgroundColor: theme.secondryBackgroundColor,
                  color: theme.textColor,
                  fontSize: theme.appFontSize.mediumSize,
                  fontFamily: theme.appFontSize.fontFamily
                }
              ]}
              onChangeText={text => onChangeLastName(text)}
              placeholder={reduxLang.LastName}
              placeholderTextColor={"gray"}
              value={lastName}
              ref={input => {
                firstNameTextInput = input
              }}
              onSubmitEditing={() => {
                lastNameTextInput.focus()
              }}
              blurOnSubmit={false}
            />
          </View>
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: theme.secondryBackgroundColor,
                color: theme.textColor,
                fontSize: theme.appFontSize.mediumSize,
                fontFamily: theme.appFontSize.fontFamily
              }
            ]}
            onChangeText={text => onChangeAddress(text)}
            placeholder={reduxLang.Address}
            placeholderTextColor={"gray"}
            value={address}
            ref={input => {
              lastNameTextInput = input
            }}
            onSubmitEditing={() => {
              addressTextInput.focus()
            }}
          />
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: theme.secondryBackgroundColor,
                color: theme.textColor,
                fontSize: theme.appFontSize.mediumSize,
                fontFamily: theme.appFontSize.fontFamily
              }
            ]}
            onChangeText={text => onChangeCity(text)}
            placeholder={reduxLang.City}
            placeholderTextColor={"gray"}
            value={city}
            ref={input => {
              addressTextInput = input
            }}
            onSubmitEditing={() => {
              cityTextInput.focus()
            }}
          />

          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: theme.secondryBackgroundColor,
                color: theme.textColor,
                fontSize: theme.appFontSize.mediumSize,
                fontFamily: theme.appFontSize.fontFamily
              }
            ]}
            onChangeText={text => onChangePincode(text)}
            placeholder={reduxLang.Pincode}
            placeholderTextColor={"gray"}
            value={pincode}
            ref={input => {
              cityTextInput = input
            }}
            onSubmitEditing={() => {
              pincodeTextInput.focus()
            }}
            blurOnSubmit={false}
          />

          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: theme.secondryBackgroundColor,
                color: theme.textColor,
                fontSize: theme.appFontSize.mediumSize,
                fontFamily: theme.appFontSize.fontFamily
              }
            ]}
            onChangeText={text => onChangeEmail(text)}
            placeholder={reduxLang.Email}
            placeholderTextColor={"gray"}
            keyboardType={"email-address"}
            value={email}
            ref={input => {
              pincodeTextInput = input
            }}
            onSubmitEditing={() => {
              emailTextInput.focus()
            }}
            blurOnSubmit={false}
          />

          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: theme.secondryBackgroundColor,
                color: theme.textColor,
                fontSize: theme.appFontSize.mediumSize,
                fontFamily: theme.appFontSize.fontFamily
              }
            ]}
            onChangeText={text => onChangePhone(text)}
            placeholder={reduxLang.PhoneNumber}
            placeholderTextColor={"gray"}
            keyboardType={"number-pad"}
            value={phone}
            ref={input => {
              emailTextInput = input
            }}
          />

          {/* /////////////////////////////////////////////////// */}

          {labelViewFun(
            theme,
            reduxLang.Select + " " + reduxLang.Country,
            country,
            showModal,
            reduxLang.Select + " " + reduxLang.Country,
            setmodalHeader,
            setmodalData,
            countriesArray
          )}

          {labelViewFun(
            theme,
            reduxLang.Select + " " + reduxLang.State,
            statesName,
            showModal,
            reduxLang.Select + " " + reduxLang.State,
            setmodalHeader,
            setmodalData,
            StatesArray.AR
          )}

          {/* /////////////////////////////////////////////////// */}
          <View style={styles.marginBot} />
          <CustomBtn
            onPressFun={() => {
              if (validation()) {
                navigation.navigate("ShippingMethod", {
                  total: total,gst:gst,igst:igst,totalAmount:totalAmount, datas:datas,subTotal:subTotal,percentage:percentage,firstName:firstName,address:address,email:email,phone:phone,pincode:pincode,city:city,statesName:statesName,country:country,lastName:lastName
                })
    }
             
            }}

            theme={theme}
            title={reduxLang.Next}
          ></CustomBtn>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20
  },
  marginBot: {
    marginBottom: 8
  },
  deviderStyleView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "10%",
    marginBottom: "10%",
    width: "100%",
    alignSelf: "center"
  },
  nameContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  textInput: {
    height:
      Platform.OS === "ios"
        ? HEADER_IOS_HEIGHT * 0.47
        : HEADER_ANDROID_HEIGHT * 0.74,
    borderColor: "gray",
    width: "93%",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 8,
    marginBottom: 6,
    textAlign: I18nManager.isRTL ? "right" : "left",
    alignSelf: "center"
  },
  textStyle: {
    textAlign: I18nManager.isRTL ? "right" : "left",
    alignSelf: "center"
  },
  scrollView: {
    flex: 1
  },
  scrollViewContainerStyle: {
    paddingBottom: 5
  },
  commonViewTextIconStyle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "60%"
  },
  selectedText: {
    marginHorizontal: 6,
    alignItems: "center",
    justifyContent: "center"
  },
  modalView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "700"
  },
  picketTouchAbleStyle: {
    flexDirection: "row",
    alignSelf: "flex-start",
    padding: 10,
    paddingLeft: I18nManager.isRTL ? 80 : 0,
    paddingRight: I18nManager.isRTL ? 0 : 80
  },
  pickerTextStyle: {
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20
  }
})

const mapStateToProps = state => ({
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang
})

export default connect(mapStateToProps, null)(AddAddressScreen)
