import React, { useLayoutEffect } from "react"
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  I18nManager,
  TouchableOpacity,
  Keyboard,
  Image,
  Alert
} from "react-native"
import { connect } from "react-redux"
import CustomBtn from "../components/customBtn"
import Ionicons from "react-native-vector-icons/Ionicons"
import Icon from "react-native-vector-icons/FontAwesome"
import { WIDTH } from "../components/config"
import api from "../constants/api"

const emailChecker = email => {
  const checker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return email.length === 0 || checker.test(email) === true
}

const passChecker = pass => {
  return pass.length > 6 || pass.length === 0
}

const App = ({ navigation, theme, reduxLang }) => {
  // Header Settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: reduxLang.SignUp,
      headerStyle: {
        backgroundColor: theme.secondryBackgroundColor,
        shadowColor: "transparent"
      },
      headerTintColor: theme.textColor
    })
  }, [
    navigation,
    reduxLang.SignUp,
    theme.secondryBackgroundColor,
    theme.textColor
  ])

  const [pass, onChangePass] = React.useState("")
  const [passShown, onChangePassShown] = React.useState(false)

  const [firstName, onChangeFirstName] = React.useState("")
  const [phone, onChangePhone] = React.useState("")
  const [email, onChangeEmail] = React.useState("")
  const [address1, onChangeAddress1] = React.useState("")
  const [address2, onChangeAddress2] = React.useState("")
  const [city, onChangeCity] = React.useState("")
  const [code, onChangeCode] = React.useState("")
  const [state, onChangeState] = React.useState("")
 
   
  const [checkBoxAccount, onChangeCheckBoxAccount] = React.useState(false)
  const [checkBoxAgree, onChangeCheckBoxAgree] = React.useState(false)

  let secondTextInput = ""
  let thirdTextInput = ""
  let fourTextInput = ""

  const Insert = () => {
    if (!firstName || !email || !pass || !phone || !address1 || ! address2 || !city || !code || !state) {
        Alert.alert('Please fill in all fields');
        return;
    }

    const registerData = {
        first_name: firstName,
        email: email,
        pass_word: pass,
        mobile: phone,
        address1: address1,
        address2: address2,
        address_city: city,
        address_po_code: code,
        address_state: state,
    };

    api
        .post('/api/register', registerData)
        .then(response => {
            if (response.status === 200) {
               
                   SendEmail();
              

            } else {
                console.error('Error');
            }
        })
        .catch(error => {
          Alert.alert('User is Already registered with this Email');
            console.error('Error:', error);
        }

        );

};

const SendEmail = () => {
  const to = email;
  const subject = "Login Registration";
  api
      .post('/commonApi/sendUseremail', { to, subject })
      .then(response => {
          if (response.status === 200) {
              Alert.alert('You have successfully registered');
              navigation.push("Login")
          } else {
              console.error('Error');
          }
      })
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
        <Image
          resizeMode={"cover"}
          style={[styles.drawerImageStyle]}
          source={require("../images/maleAvatar.png")}
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
          onChangeText={text => onChangeFirstName(text)}
          placeholder={'Name'}
          placeholderTextColor={"gray"}
          value={firstName}
          onSubmitEditing={() => {
            secondTextInput.focus()
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
          onChangeText={text => onChangePhone(text)}
          placeholder={'Phone'}
          placeholderTextColor={"gray"}
          value={phone}
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
            {
              backgroundColor: theme.secondryBackgroundColor,
              color: theme.textColor,
              fontSize: theme.appFontSize.mediumSize,
              fontFamily: theme.appFontSize.fontFamily,
              borderColor: emailChecker(email) ? "#c1c1c1" : "red",
              borderBottomWidth: emailChecker(email) ? 0 : 1
            }
          ]}
          onChangeText={text => onChangeEmail(text)}
          placeholder={reduxLang.Email}
          placeholderTextColor={"gray"}
          keyboardType={"email-address"}
          value={email}
          ref={input => {
            thirdTextInput = input
          }}
          onSubmitEditing={() => {
            fourTextInput.focus()
          }}
          blurOnSubmit={false}
        />

        {!emailChecker(email) ? (
          <Text
            style={[
              styles.invalidEmailText,
              {
                fontSize: theme.appFontSize.mediumSize
              }
            ]}
          >
            {reduxLang.InvalidEmail}
          </Text>
        ) : null}

        <View
          style={[
            styles.passContainer,
            {
              backgroundColor: theme.secondryBackgroundColor,
              borderColor: passChecker(pass) ? "#c1c1c1" : "red",
              borderBottomWidth: passChecker(pass) ? 0 : 1
            }
          ]}
        >
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: theme.secondryBackgroundColor,
                color: theme.textColor,
                fontSize: theme.appFontSize.mediumSize,
                fontFamily: theme.appFontSize.fontFamily,
                marginTop: 0,
                marginBottom: 0
              }
            ]}
            onChangeText={text => onChangePass(text)}
            placeholder={reduxLang.Password}
            placeholderTextColor={"gray"}
            value={pass}
            ref={input => {
              fourTextInput = input
            }}
            secureTextEntry={!passShown ? true : false}
            onSubmitEditing={() => {
              Keyboard.dismiss()
            }}
            blurOnSubmit={false}
          />

          <TouchableOpacity
            onPress={() => {
              onChangePassShown(!passShown)
            }}
          >
            <Icon
              style={{
                color: !passShown ? "gray" : theme.textColor,
                fontSize: theme.appFontSize.largeSize
              }}
              name={!passShown ? "eye-slash" : "eye"}
            />
          </TouchableOpacity>
        </View>

        {!passChecker(pass) ? (
          <Text
            style={[
              styles.maxCharText,
              {
                fontSize: theme.appFontSize.mediumSize
              }
            ]}
          >
            {reduxLang.MinimumIsSix}
          </Text>
        ) : null}
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
          placeholder={'1st Address'}
          placeholderTextColor={"gray"}
          value={address1}
          onSubmitEditing={() => {
            secondTextInput.focus()
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
          onChangeText={text => onChangeAddress2(text)}
          placeholder={'2nd Address'}
          placeholderTextColor={"gray"}
          value={address2}
          onSubmitEditing={() => {
            secondTextInput.focus()
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
          placeholder={'City'}
          placeholderTextColor={"gray"}
          value={city}
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
            {
              backgroundColor: theme.secondryBackgroundColor,
              color: theme.textColor,
              fontSize: theme.appFontSize.mediumSize,
              fontFamily: theme.appFontSize.fontFamily
            }
          ]}
          onChangeText={text => onChangeCode(text)}
          placeholder={'Code'}
          placeholderTextColor={"gray"}
          value={code}
          onSubmitEditing={() => {
            secondTextInput.focus()
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
          onChangeText={text => onChangeState(text)}
          placeholder={'State'}
          placeholderTextColor={"gray"}
          value={state}
          ref={input => {
            secondTextInput = input
          }}
          onSubmitEditing={() => {
            thirdTextInput.focus()
          }}
          blurOnSubmit={false}
        />

        <View style={styles.checkBoxContainer}>
          {/* <View style={styles.checkBoxView}>
            <TouchableOpacity
              style={styles.forgotText}
              onPress={() => onChangeCheckBoxAccount(!checkBoxAccount)}
            >
              <Ionicons
                name={!checkBoxAccount ? "square-outline" : "checkbox-outline"}
                style={{ fontSize: theme.appFontSize.largeSize + 1 }}
                color={theme.textColor}
              />
            </TouchableOpacity>

            <View style={styles.forgotPassText}>
              <Text
                style={{
                  fontSize: theme.appFontSize.smallSize,
                  fontFamily: theme.appFontSize.fontFamily,
                  color: theme.textColor
                }}
              >
                {reduxLang.IwantToCreateAnAccount}
              </Text>
            </View>
          </View> */}

          {/* <View style={styles.checkBoxView}>
            <TouchableOpacity
              style={styles.forgotText}
              onPress={() => onChangeCheckBoxAgree(!checkBoxAgree)}
            >
              <Ionicons
                name={!checkBoxAgree ? "square-outline" : "checkbox-outline"}
                style={{ fontSize: theme.appFontSize.largeSize + 1 }}
                color={theme.textColor}
              />
            </TouchableOpacity>

            <View
              style={[
                styles.forgotPassText,
                {
                  flexDirection: "row",
                  alignItems: "center"
                }
              ]}
            >
              <Text
                numberOfLines={1}
                style={{
                  fontSize: theme.appFontSize.smallSize,
                  fontFamily: theme.appFontSize.fontFamily,
                  color: theme.textColor
                }}
              >
                {reduxLang.IAgreeWith}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("TermsAndCondScreen")}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    textDecorationLine: "underline",
                    fontSize: theme.appFontSize.mediumSize,
                    fontFamily: theme.appFontSize.fontFamily,
                    color: theme.primary
                  }}
                >
                  {reduxLang.TermAndCondition}
                </Text>
              </TouchableOpacity>
            </View>
          </View> */}
        </View>

        <CustomBtn
          onPressFun={() => {Insert()}}
          theme={theme}
          title={reduxLang.CreatAnAccount}
        ></CustomBtn>

        <View style={styles.deviderStyleView}>
          <View style={styles.deviderInnerView} />
          <View>
            <Text
              style={[
                styles.deviderText,
                {
                  fontSize: theme.appFontSize.mediumSize
                }
              ]}
            >
              {reduxLang.Or}
            </Text>
          </View>
          <View style={styles.deviderInnerView} />
        </View>

        <View style={styles.signInBtnsContainer}>
          <TouchableOpacity
            style={[
              styles.socialIconContainer,
              {
                backgroundColor: "#EA4234"
              }
            ]}
          >
            <Icon
              style={[
                styles.socialIcon,
                {
                  fontSize: theme.appFontSize.largeSize + 10
                }
              ]}
              name={"google"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.socialIconContainer,
              {
                backgroundColor: "#4167B2"
              }
            ]}
          >
            <Icon
              style={[
                styles.socialIcon,
                {
                  fontSize: theme.appFontSize.largeSize + 10
                }
              ]}
              name={"facebook"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.socialIconContainer,
              {
                backgroundColor: "#0e76a8"
              }
            ]}
          >
            <Icon
              style={[
                styles.socialIcon,
                {
                  fontSize: theme.appFontSize.largeSize + 10
                }
              ]}
              name={"linkedin"}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Text
            numberOfLines={1}
            style={{
              textDecorationLine: "underline",
              fontSize: theme.appFontSize.largeSize,
              fontFamily: theme.appFontSize.fontFamily,
              color: theme.primary
            }}
          >
            {reduxLang.LoginToYourAccount}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backIcon: {
    padding: "4%",
    paddingBottom: "3%",
    paddingTop: "5%",
    alignSelf: "flex-start"
  },
  signInBtnsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: "10%"
  },
  drawerImageStyle: {
    backgroundColor: "transparent",
    height: WIDTH * 0.2,
    width: WIDTH * 0.2,
    margin: 10,
    alignSelf: "center",
    marginTop: "10%",
    marginBottom: "7%"
  },
  maxCharText: {
    color: "red",
    alignSelf: "flex-start",
    padding: "5%",
    paddingTop: "1%",
    paddingBottom: "1%"
  },
  checkBoxContainer: {
    marginTop: "3.5%",
    marginBottom: "7%"
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
  invalidEmailText: {
    color: "red",
    alignSelf: "flex-start",
    padding: "5%",
    paddingTop: "1%",
    paddingBottom: "1%"
  },
  passContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "92%",
    alignSelf: "center",
    marginTop: 8,
    borderRadius: 10
  },
  checkBoxView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "4%",
    paddingLeft: "5%"
  },
  socialIconContainer: {
    height: WIDTH * 0.14,
    width: WIDTH * 0.14,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: WIDTH * 0.14
  },
  forgotText: {
    paddingBottom: "0.5%"
  },
  forgotPassText: {
    alignItems: "flex-start",
    width: "57%",
    paddingLeft: "2%",
    paddingRight: "2%",
    paddingBottom: "0.2%"
  },
  socialIcon: {
    color: "#ffffff"
  },
  deviderStyleView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "10%",
    marginBottom: "10%",
    width: "60%",
    alignSelf: "center"
  },
  deviderInnerView: {
    flex: 1,
    height: 1,
    backgroundColor: "#D2D2D2"
  },
  deviderText: {
    color: "#D2D2D2",
    width: 50,
    textAlign: "center"
  },
  scrollViewContainerStyle: {
    paddingBottom: "4%",
    paddingTop: "2%"
  }
})

const mapStateToProps = state => ({
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang
})

export default connect(mapStateToProps, null)(App)
