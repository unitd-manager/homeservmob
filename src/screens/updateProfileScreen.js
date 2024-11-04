import React, { useLayoutEffect,useEffect } from "react"
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  I18nManager,
  Alert,
} from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from "react-redux"
import CustomBtn from "../components/customBtn"
import api from "../constants/api";

const App = ({ navigation, theme, reduxLang,route }) => {
 
  const { userName } = route.params
  console.log('userName',userName)
  // Header Settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: reduxLang.Profile,
      headerStyle: {
        backgroundColor: theme.secondryBackgroundColor,
        shadowColor: "transparent"
      },
      headerTintColor: theme.textColor
    })
  }, [
    navigation,
    reduxLang.Profile,
    theme.secondryBackgroundColor,
    theme.textColor
  ])
  const [name, onChangeName] = React.useState('')
  const [email, onChangeEmail] = React.useState('')
  const [phone, onChangePhone] = React.useState('')
  const [address1, onChangeAddress1] = React.useState('')
  const [address, onChangeAddress] = React.useState('')
  const [state, onChangeState] = React.useState('')
  const [userContactId, setUserContactId] = React.useState(null);
  
  useEffect(() => {
    const getUserCart = async () => {
      try {
        const userData = await AsyncStorage.getItem('USER');
        const user = JSON.parse(userData);

        if (!user?.contact_id) {
          Alert.alert('Please Login');
          navigation.navigate('Settings');
          return;
        }
        setUserContactId(user?.contact_id || null);
        api
          .post('/contact/getContactsById', {
            contact_id: user?.contact_id || null,
          })
          .then(res => {
            const contactCri = res.data.data;

            onChangeEmail(contactCri[0].email);
            onChangePhone(contactCri[0].mobile);
            onChangeName(contactCri[0].first_name);
            onChangeAddress1(contactCri[0].address1);
            onChangeAddress(contactCri[0].address2);
            onChangeState(contactCri[0].address_state); 
          });
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    getUserCart();
  }, []);

  const addDeliveryAddress = () => {
    // Validate fields
    if (!name) {
      Alert.alert('Please enter your first name.');
      return;
    }
    if (!email) {
      Alert.alert('Please enter your email.');
      return;
    }
    if (!phone) {
      Alert.alert('Please enter your mobile number.');
      return;
    }

    const contactUser = {
      first_name: name,
      email: email,
      mobile: phone,
      contact_id: userContactId || null,
      address1: address1,
      address2: address,
      address_state: state,
      // address_country_code: name?.address_country_code,
    };
 
    // Proceed with adding delivery address
    api
      .post('/contact/editContactProfile', contactUser)
      .then(res => {
        if(res.data.msg === 'Success'){
        Alert.alert('Profile Save successfully.');
        }else{
          console.error('issue');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

 
  let secondTextInput = ""
  let thirdTextInput = ""



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
          // behavior="height"
          keyboardVerticalOffset={5}
          behavior={"position"}
          style={styles.container}
        >
          <Image
            resizeMode={"cover"}
            style={[styles.drawerImageStyle]}
            source={require("../images/maleAvatar.png")}
          />

          <View style={styles.userNameTextView}>
            <Text
              style={[
                styles.nameText,
                {
                  color: theme.textColor,
                  fontSize: theme.appFontSize.mediumSize,
                  fontFamily: theme.appFontSize.fontFamily
                }
              ]}
            >
              {name}
            </Text>
            <Text
              style={[
                styles.emailText,
                {
                  color: theme.textColor,
                  fontSize: theme.appFontSize.mediumSize,
                  fontFamily: theme.appFontSize.fontFamily
                }
              ]}
            >
              {email}
            </Text>
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
            onChangeText={text => onChangeName(text)}
            placeholder={reduxLang.Name}
            placeholderTextColor={"gray"}
            editable={!name}
            value={name}
            onSubmitEditing={() => {
              secondTextInput.focus()
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
      fontFamily: theme.appFontSize.fontFamily,
      borderColor: email ? 'transparent' : 'red', // Red border if the email field is empty
      borderWidth: email ? 0 : 1 // Set border width only when the email field is empty
    }
  ]}
  keyboardType={"email-address"}
  onChangeText={text => onChangeEmail(text)}
  placeholder={reduxLang.Email}
  placeholderTextColor={"gray"}
  editable={!email} // Disable input when `disable` is true
  value={email}
  ref={input => {
    secondTextInput = input
  }}
  onSubmitEditing={() => {
    thirdTextInput.focus()
  }}
  blurOnSubmit={false}
/>

          <TextInput
            style={[
              styles.textInput,
              styles.marginBot,
              {
                backgroundColor: theme.secondryBackgroundColor,
                color: theme.textColor,
                fontSize: theme.appFontSize.mediumSize,
                fontFamily: theme.appFontSize.fontFamily
              }
            ]}
            onChangeText={text => onChangePhone(text)}
            placeholder={reduxLang.PhoneNo}
            placeholderTextColor={"gray"}
            keyboardType={"number-pad"}
            value={phone}
            ref={input => {
              thirdTextInput = input
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
            onChangeText={text => onChangeAddress1(text)}
            placeholder={'Address'}
            placeholderTextColor={"gray"}
            value={address1}
            onSubmitEditing={() => {
              secondTextInput.focus()
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
            onChangeText={text => onChangeAddress(text)}
            placeholder={'Address'}
            placeholderTextColor={"gray"}
            value={address}
            onSubmitEditing={() => {
              secondTextInput.focus()
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
            onChangeText={text => onChangeState(text)}
            placeholder={'State'}
            placeholderTextColor={"gray"}
            value={state}
            onSubmitEditing={() => {
              secondTextInput.focus()
            }}
            blurOnSubmit={false}
          />

          <CustomBtn
            onPressFun={() => {addDeliveryAddress()}}
            theme={theme}
            title={reduxLang.Save}
          ></CustomBtn>
        </KeyboardAvoidingView>
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
  marginBot: {
    marginBottom: 16
  },
  drawerImageStyle: {
    backgroundColor: "transparent",
    height: 75,
    width: 75,
    margin: 20,
    alignSelf: "center"
  },
  userNameTextView: {
    alignItems: "center",
    marginBottom: 12
  },
  emailText: {
    textAlign: "center",
    marginTop: 5
  },
  nameText: {
    textAlign: "center",
    fontWeight: "700"
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    width: "93%",
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
    marginBottom: 6,
    textAlign: I18nManager.isRTL ? "right" : "left",
    alignSelf: "center"
  },
  scrollView: {
    flex: 1
  },
  scrollViewContainerStyle: {
    paddingBottom: 5
  }
})

const mapStateToProps = state => ({
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang
})

export default connect(mapStateToProps, null)(App)
