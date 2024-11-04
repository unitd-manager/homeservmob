import React, { useState,useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  Alert
} from "react-native"
import CustomBtn from "./customBtn"
import AddToCartCard from "./addToCartCard"
import CounterSelection from "./customCounter"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../constants/api"
import LoginStack from "../router/stacks/loginStack"
import { useNavigation } from "@react-navigation/native"
import { useCart } from "../context/CartContext"

const tagsFun = (theme, array, index, onChangeSearch) => (
  <TouchableOpacity
    key={index}
    onPress={() => {
      let temp = {
        name: array[index].name,
        isSelected: !array[index].isSelected
      }
      array[index] = temp
      onChangeSearch([...array])
    }}
    style={[
      styles.textTouchable,
      {
        backgroundColor: array[index].isSelected
          ? theme.primary
          : theme.secondryBackgroundColor
      }
    ]}
  >
    <Text
      style={{
        color: array[index].isSelected ? theme.primaryTextColor : theme.primary,
        fontSize: theme.appFontSize.mediumSize
      }}
    >
      {array[index].name}
    </Text>
  </TouchableOpacity>
)

const colorsFun = (theme, array, index, onChangeSearch) => (
  <TouchableOpacity
    key={index}
    onPress={() => {
      let temp = {
        name: array[index].name,
        isSelected: !array[index].isSelected
      }
      array[index] = temp
      onChangeSearch([...array])
    }}
    style={[
      styles.colorsView,
      {
        borderWidth: array[index].isSelected ? 3 : 0,
        borderColor: array[index].isSelected
          ? theme.primaryTextColor
          : theme.primaryBackgroundColor
      },
      {
        backgroundColor: array[index].name
      }
    ]}
  ></TouchableOpacity>
)

const attributesFun = (theme, array, index, onChangeSearch) => (
  <TouchableOpacity
    key={index}
    onPress={() => {
      array.map(value => {
        value.isSelected = false
      })
      let temp = {
        name: array[index].name,
        isSelected: !array[index].isSelected
      }
      array[index] = temp
      onChangeSearch([...array])
    }}
    style={[
      styles.textTouchable,
      styles.textAttributes,
      {
        borderColor: array[index].isSelected
          ? theme.primaryTextColor
          : theme.primary,
        backgroundColor: array[index].isSelected
          ? theme.primary
          : theme.secondryBackgroundColor
      }
    ]}
  >
    <Text
      style={{
        color: array[index].isSelected ? theme.primaryTextColor : theme.primary,
        fontSize: theme.appFontSize.mediumSize
      }}
    >
      {array[index].name}
    </Text>
  </TouchableOpacity>
)

const Counter = ({
  theme,
  reduxLang,
  addtoCartmodalVisible,
  setaddtoCartModalVisible,
  productDetailData,
  update,
  setUpdate
}) => {

  const navigation = useNavigation()
  const [attributes, setAttributes] = useState([
    { name: reduxLang.Colors, isSelected: true },
    { name: reduxLang.Size, isSelected: false },
    { name: reduxLang.Weight, isSelected: false }
  ])

  const [colorsAttr, setColorsAttr] = useState([
    { name: "red", isSelected: true },
    { name: "green", isSelected: false },
    { name: "blue", isSelected: false }
  ])

  const [sizeAttr, setSizeAttr] = useState([
    { name: "L", isSelected: true },
    { name: "M", isSelected: false },
    { name: "S", isSelected: false },
    { name: "XL", isSelected: false }
  ])

  const [weightAttr, setWeightAttr] = useState([
    { name: "2kg", isSelected: true },
    { name: "3kg", isSelected: false },
    { name: "5kg", isSelected: false }
  ])


  const [quantityPlus, SetqunatityPlus] = useState(1);
  
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

  
  //const [cart, setCart] = useState([]);
  // console.log('cart', cart);
  const{addItem,cart,updateItem}=useCart();
 
  const onPressSignIn = () => {
    navigation.navigate("Login");
  };
   const insertBasket =()=>{

    if (contactId !== null) {

      // api
      //   .post('/orders/getBasket', {contact_id: contactId})
      //   .then(res => {
      //     // console.log('status', res.data.data);
      //     setCart(res.data.data)
      //       });
      const alreadyincart = cart.find(it => it.product_id ===productDetailData.product_id );
    if(alreadyincart){
     alreadyincart.qty += parseFloat(quantityPlus);
     console.log('alreadyincart',alreadyincart);
     updateItem(alreadyincart)
     setaddtoCartModalVisible(!addtoCartmodalVisible)
  
     navigation.push("cartScreen",{update:update});
    }else{
      const registerData = {
      product_id: productDetailData.product_id,
      contact_id: contactId,
      unit_price: productDetailData.price,
      qty:quantityPlus
    };
    console.log('registerData', registerData);
    
    // api
    //   .post('/orders/insertbasketAddCart', registerData)
    //   .then(response => {
    //     if (response.status === 200) {
         
    //       // Alert.alert('You have successfully registered');
    //       // navigation.navigate(StackNav.ProductViewCart);
    //       setaddtoCartModalVisible(!addtoCartmodalVisible)
    //       //setUpdate(!update)
    //       navigation.push("cartScreen",{update:update});
    //     } else {
    //       console.error('Error');
    //     }
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });
    addItem(registerData)
    setaddtoCartModalVisible(!addtoCartmodalVisible)
  
          navigation.push("cartScreen",{update:update});
        }
    } else {
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

   }


  return (
    <View>
      {/* // Modal  start */}

      <Modal
        visible={addtoCartmodalVisible}
        transparent={true}
        animationType={"slide"}
      >
        <TouchableWithoutFeedback
          onPress={() => setaddtoCartModalVisible(!addtoCartmodalVisible)}
        >
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View
          style={[
            styles.modalView,
            {
              backgroundColor: theme.primaryBackgroundColor
            }
          ]}
        >
          
          <AddToCartCard
            productDetailData={productDetailData}
            setaddtoCartModalVisible={setaddtoCartModalVisible}
            addtoCartmodalVisible={addtoCartmodalVisible}
            index={0}
            theme={theme}
            reduxLang={reduxLang}
          />

          <Text
            style={[
              styles.labelText,
              {
                color: theme.textColor,
                fontSize: theme.appFontSize.mediumSize
              }
            ]}
          >
            {reduxLang.Attributes}
          </Text>

          <View style={styles.recentSearchArrayView}>
            {attributes.map((value, index) =>
              attributesFun(theme, attributes, index, setAttributes)
            )}
            
          </View>

          {attributes[0].isSelected ? (
            <View style={styles.recentSearchArrayView}>
              {colorsAttr.map((value, index) =>
                colorsFun(theme, colorsAttr, index, setColorsAttr)
              )}
            </View>
          ) : null}

          {attributes[1].isSelected ? (
            <View style={styles.recentSearchArrayView}>
              {sizeAttr.map((value, index) =>
                tagsFun(theme, sizeAttr, index, setSizeAttr)
              )}
            </View>
          ) : null}
          

          {attributes[2].isSelected ? (
          <View style={styles.recentSearchArrayView}>
          {weightAttr.map((value, index) => {
           console.log('kg', value.name);
           return tagsFun(theme, weightAttr, index, setWeightAttr);
           })}
         </View>
          ) : null}


          <Text
            style={[
              styles.labelText,
              {
                color: theme.textColor,
                fontSize: theme.appFontSize.mediumSize
              }
            ]}
          >
            {reduxLang.Quantity}
          </Text>

          <View style={styles.counterStyle}>
            <CounterSelection
              theme={theme}
              counterBackGroundColor={theme.primaryBackgroundColor}
              width={28}
              height={6}
              iconSize={theme.appFontSize.largeSize}
              minimumValue={1}
              // innerRef={stepper => {
              //   stepperTemp = stepper
              // }}
              initialValue={1}
              onIncrement={value => {
                SetqunatityPlus(value)
                 
              }}
              onDecrement={value => {
                SetqunatityPlus(value)
               
              }}
            />
          </View>

          <CustomBtn
            onPressFun={() => insertBasket()}
            theme={theme}
            title={reduxLang.addToCart}
          ></CustomBtn>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  counterStyle: {
    margin: 15,
    marginBottom: 28,
    marginTop: 10
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent"
  },
  modalView: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    padding: 9,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    bottom: 0,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
    position: "absolute",
    paddingBottom: 20
  },
  colorsView: {
    borderRadius: 20,
    height: 20,
    width: 20,
    padding: 7,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    margin: Platform.OS === "ios" ? 8.5 : 9.5
  },
  labelText: {
    padding: 8,
    paddingHorizontal: 15,
    alignSelf: "flex-start"
  },
  recentSearchArrayView: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
    paddingTop: 0,
    paddingBottom: 0
  },
  textAttributes: {
    borderWidth: 1,
    marginBottom: 10
  },
  textTouchable: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    padding: 7,
    margin: 5,
    paddingTop: 5,
    paddingBottom: 5
  }
})

export default Counter
