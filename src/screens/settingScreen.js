import React, { useRef, useState,useEffect } from "react"
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  I18nManager,
  Image,
  View,
  Switch,
  Animated,
  StatusBar,
  Platform
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { connect } from "react-redux"
import RNRestart from "react-native-restart" // Import package from node modules
import Ionicons from "react-native-vector-icons/FontAwesome"
import api from "../constants/api"
import IoniconsIcon from "react-native-vector-icons/Ionicons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import PopUpModal from "../components/popupModal"
import { setModeValue, setRtl } from "../redux/actions/actions"
import {
  HEIGHT,
  HEADER_IOS_HEIGHT,
  HEADER_ANDROID_HEIGHT
} from "../components/config"

const commonViewFun = (
  theme,
  iconName,
  text,
  backgroundColor,
  selectedValue
) => (
  <View style={[styles.listLabelView, { backgroundColor: backgroundColor }]}>
    <View style={styles.listLabelIconView}>
      <Ionicons
        style={[
          styles.labelIcon,
          {
            color: theme.secondry,
            fontSize: theme.appFontSize.largeSize + 1
          }
        ]}
        name={iconName}
      />
      <Text
        style={[
          styles.listLabelText,
          {
            color: theme.textColor,
            fontSize: theme.appFontSize.mediumSize - 1,
            fontFamily: theme.appFontSize.fontFamily
          }
        ]}
      >
        {text}
      </Text>
    </View>
    <View style={styles.commonViewTextIconStyle}>
      <Text
        style={[
          styles.selectedText,
          {
            color: theme.textColor,
            fontSize: theme.appFontSize.smallSize,
            fontFamily: theme.appFontSize.fontFamily
          }
        ]}
      >
        {selectedValue}
      </Text>
      <Ionicons
        style={{
          color: theme.secondry,
          fontSize: theme.appFontSize.smallSize - 2
        }}
        name={!I18nManager.isRTL ? "chevron-right" : "chevron-left"}
      />
    </View>
  </View>
)

const labelViewFun = (
  theme,
  iconName,
  text,
  selectedValue,
  navigation,
  navScreen
) =>
  navScreen !== "" ? (
    <TouchableOpacity
      onPress={() => {
        if (navScreen !== "") {
          navigation.navigate(navScreen)
        }
      }}
    >
      {commonViewFun(
        theme,
        iconName,
        text,
        theme.secondryBackgroundColor,
        selectedValue
      )}
    </TouchableOpacity>
  ) : (
    <View>
      {commonViewFun(
        theme,
        iconName,
        text,
        theme.secondryBackgroundColor,
        selectedValue
      )}
    </View>
  )

const simpleLabelViewFun = (
  theme,
  iconName,
  text,
  selectedValue,
  navigation,
  navScreen,
  params
) => (
  <TouchableOpacity
    onPress={() => {
      if (navScreen !== "") {
        navigation.navigate(navScreen,params)
      }
    }}
  >
    {commonViewFun(
      theme,
      iconName,
      text,
      theme.primaryBackgroundColor,
      selectedValue
    )}
  </TouchableOpacity>
)
const initialState = null;
function SettingScreen({
  theme,
  reduxLang,
  navigation,
  setModeValue,
  isDarkMode,
  setRtl,
  rtl
}) {
  const yOffset = useRef(new Animated.Value(0)).current
  const headerOpacity = yOffset.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: "clamp"
  })

  const topPosition = yOffset.interpolate({
    inputRange: [0, 180],
    outputRange: [0, 80]
  })

  const [isModalVisible, setModalVisibles] = useState(false)
  const [isLanguageModalVisible, setLanguageModalVisibles] = useState(false)
  const [isCurrencyModalVisible, setCurrencyModalVisibles] = useState(false)

  const [themeColor, setThemeColor] = useState([
    { value: reduxLang.Dark, status: !isDarkMode ? true : false, index: 0 },
    { value: reduxLang.Light, status: !isDarkMode ? false : true, index: 1 }
  ])

  const [languageArray, setLanguageArray] = useState([
    { value: reduxLang.English, status: rtl ? true : false, index: 0 },
    { value: reduxLang.Arabic, status: rtl ? false : true, index: 1 }
  ])

  const [currencyArray, setcurrencyArray] = useState([
    { value: "USD ₹", status: true, index: 0 },
    { value: "INR $", status: false, index: 1 }
  ])

  const [userContactId, setUserContactId] = useState(initialState);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
 
  useEffect(() => {
    const getUserCart = async () => {
      try {
        
        const userData = await AsyncStorage.getItem('USER');
      
        const user = JSON.parse(userData);
        setUserContactId(user?.contact_id || null);
       
        api
        .post('/contact/getContactsById', {
          contact_id: user?.contact_id || null,
        })
        .then(res => {
          const contactCri = res.data.data;

          setUserEmail(contactCri[0].email);
          setUserName(contactCri[0].first_name);
         
        });
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
  
    getUserCart();
  }, []); // Empty dependency array
  
    const showModal = () => setModalVisibles(true)
  const hideModal = () => setModalVisibles(false)

  const showLangModal = () => setLanguageModalVisibles(true)
  const hideLangModal = () => setLanguageModalVisibles(false)

  const showCurModal = () => setCurrencyModalVisibles(true)
  const hideCurModal = () => setCurrencyModalVisibles(false)

  function selectThemeMode(index) {
    let newArr = [...themeColor]
    newArr[0].status = false
    newArr[1].status = false
    if (index === 0) {
      newArr[1].status = true
      setModeValue(true)
    } else {
      newArr[0].status = true
      setModeValue(false)
    }
    setThemeColor(newArr)
  }

  function selectLanguageMode(index) {
    let newArr = [...languageArray]
    newArr.forEach(item => {
      item.status = false
    })
    if (index === 0) {
      newArr[1].status = true
      I18nManager.forceRTL(false)
      setRtl(false)
      setLanguageArray(newArr)
      hideLangModal()
      setTimeout(() => {
        RNRestart.Restart()
      }, 100)
    } else {
      newArr[0].status = true
      I18nManager.forceRTL(true)
      setRtl(true)
      setLanguageArray(newArr)
      hideLangModal()
      setTimeout(() => {
        RNRestart.Restart()
      }, 100)
    }
    setLanguageArray(newArr)
  }

  function selectCurrency(index) {
    let newArr = [...currencyArray]
    newArr[0].status = false
    newArr[1].status = false
    if (index === 0) {
      newArr[1].status = true
    } else {
      newArr[0].status = true
    }
    setcurrencyArray(newArr)
  }
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.primaryBackgroundColor }
      ]}
    >
      <StatusBar
        barStyle={theme.barStyle}
        backgroundColor={theme.StatusBarColor}
      />

      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: yOffset
                }
              }
            }
          ],
          {
            useNativeDriver: true
          }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        <PopUpModal visible={isLanguageModalVisible} dismiss={hideLangModal}>
          <View style={styles.centeredView}>
            <View
              style={[
                styles.modalView,
                {
                  backgroundColor: theme.primaryBackgroundColor
                }
              ]}
            >
              <Text
                style={[
                  styles.modalText,
                  {
                    color: theme.primary,
                    fontSize: theme.appFontSize.largeSize,
                    fontFamily: theme.appFontSize.fontFamily
                  }
                ]}
              >
                {reduxLang.SelectLanguage}
              </Text>

              {languageArray.map(item => (
                <TouchableOpacity
                  key={item.index}
                  onPress={() => selectLanguageMode(item.index)}
                  style={[
                    styles.picketTouchAbleStyle,
                    {
                      backgroundColor: theme.primaryBackgroundColor
                    }
                  ]}
                >
                  <View style={styles.selectedViewStyle}>
                    <IoniconsIcon
                      name={item.status ? "square-outline" : "checkbox-outline"}
                      //light
                      style={{ fontSize: theme.appFontSize.largeSize + 4 }}
                      color={theme.textColor}
                    />
                    <Text
                      style={[
                        styles.pickerTextStyle,
                        {
                          color: theme.textColor,
                          fontSize: theme.appFontSize.mediumSize,
                          fontFamily: theme.appFontSize.fontFamily
                        }
                      ]}
                    >
                      {item.value}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </PopUpModal>

        <PopUpModal visible={isModalVisible} dismiss={hideModal}>
          <View style={styles.centeredView}>
            <View
              style={[
                styles.modalView,
                {
                  backgroundColor: theme.primaryBackgroundColor
                }
              ]}
            >
              <Text
                style={[
                  styles.modalText,
                  {
                    color: theme.primary,
                    fontSize: theme.appFontSize.largeSize,
                    fontFamily: theme.appFontSize.fontFamily
                  }
                ]}
              >
                {reduxLang.ChangeAppearance}
              </Text>

              {themeColor.map(item => (
                <TouchableOpacity
                  key={item.index}
                  onPress={() => selectThemeMode(item.index)}
                  style={[
                    styles.picketTouchAbleStyle,
                    {
                      backgroundColor: theme.primaryBackgroundColor
                    }
                  ]}
                >
                  <View style={styles.selectedViewStyle}>
                    <IoniconsIcon
                      name={item.status ? "square-outline" : "checkbox-outline"}
                      //light
                      style={{ fontSize: theme.appFontSize.largeSize + 4 }}
                      color={theme.textColor}
                    />
                    <Text
                      style={[
                        styles.pickerTextStyle,
                        {
                          color: theme.textColor,
                          fontSize: theme.appFontSize.mediumSize,
                          fontFamily: theme.appFontSize.fontFamily
                        }
                      ]}
                    >
                      {item.value}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </PopUpModal>

        <PopUpModal visible={isCurrencyModalVisible} dismiss={hideCurModal}>
          <View style={styles.centeredView}>
            <View
              style={[
                styles.modalView,
                {
                  backgroundColor: theme.primaryBackgroundColor
                }
              ]}
            >
              <Text
                style={[
                  styles.modalText,
                  {
                    color: theme.primary,
                    fontSize: theme.appFontSize.largeSize,
                    fontFamily: theme.appFontSize.fontFamily
                  }
                ]}
              >
                {reduxLang.SelectCurrency}
              </Text>

              {currencyArray.map(item => (
                <TouchableOpacity
                  key={item.index}
                  onPress={() => selectCurrency(item.index)}
                  style={[
                    styles.picketTouchAbleStyle,
                    {
                      backgroundColor: theme.primaryBackgroundColor
                    }
                  ]}
                >
                  <View style={styles.selectedViewStyle}>
                    <IoniconsIcon
                      name={item.status ? "square-outline" : "checkbox-outline"}
                      //light
                      style={{ fontSize: theme.appFontSize.largeSize + 4 }}
                      color={theme.textColor}
                    />
                    <Text
                      style={[
                        styles.pickerTextStyle,
                        {
                          color: theme.textColor,
                          fontSize: theme.appFontSize.mediumSize,
                          fontFamily: theme.appFontSize.fontFamily
                        }
                      ]}
                    >
                      {item.value}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </PopUpModal>

        <Animated.View
          style={[
            {
              opacity: headerOpacity,
              transform: [
                {
                  translateY: topPosition
                }
              ]
            }
          ]}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 2 }}
            colors={
              !I18nManager.isRTL
                ? [theme.primary, theme.primaryLight]
                : [theme.primaryLight, theme.primary]
            }
            style={styles.backGroundImage}
          >
            <Text
              style={[
                styles.nameText,
                {
                  color: theme.primaryTextColor,
                  fontSize: theme.appFontSize.largeSize + 12,
                  fontFamily: theme.appFontSize.fontFamily,
                  alignSelf: "flex-start",
                  paddingHorizontal: 20,
                  paddingTop:
                    Platform.OS === "ios" ? HEIGHT * 0.12 : HEIGHT * 0.1
                }
              ]}
            >
              {reduxLang["Settings"]}
            </Text>
          </LinearGradient>
        </Animated.View>
        <View
          style={[
            styles.userContainer,
            { backgroundColor: theme.primaryBackgroundColor }
          ]}
        >
          <View style={styles.imageTextContainer}>
            <Image
              resizeMode={"cover"}
              style={styles.userImageStyle}
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
                {userName}
              </Text>
              <Text
                style={[
                  styles.emailText,
                  {
                    color: theme.textColor,
                    fontSize: theme.appFontSize.smallSize,
                    fontFamily: theme.appFontSize.fontFamily
                  }
                ]}
              >
                {userEmail}
              </Text>
            </View>
          </View>
        </View>

        {userContactId !== null && simpleLabelViewFun(
          theme,
          "user-circle",
          reduxLang.Profile,
          "",
          navigation,
          "Profile",
          { userName: userName } 
        )}
      {userContactId === null && simpleLabelViewFun(
        theme,
       "sign-in",
       reduxLang.Login,
        "",
       navigation,
      "Login"
       )} 
       { userContactId !== null &&simpleLabelViewFun(
          theme,
          "sign-out",
          reduxLang.LogOut,
          "",
          navigation,
          "LogoutScreen"
        )}

        <View style={styles.gSettingTextView}>
          <Text
            style={[
              styles.settingText,
              {
                color: theme.textColor,
                fontSize: theme.appFontSize.largeSize + 2,
                fontFamily: theme.appFontSize.fontFamily
              }
            ]}
          >
            {reduxLang.GeneralSetting}
          </Text>
        </View>

        <View
          style={[
            styles.listLabelView,
            { backgroundColor: theme.secondryBackgroundColor }
          ]}
        >
          <View style={styles.listLabelIconView}>
            <Ionicons
              style={[
                styles.labelIcon,
                {
                  color: theme.secondry,
                  fontSize: theme.appFontSize.largeSize + 1
                }
              ]}
              name={"bell"}
            />
            <Text
              style={[
                styles.listLabelText,
                {
                  color: theme.textColor,
                  fontSize: theme.appFontSize.mediumSize - 1,
                  fontFamily: theme.appFontSize.fontFamily
                }
              ]}
            >
              {reduxLang.GetNotification}
            </Text>
          </View>
          <Switch
            thumbColor={theme.primary}
            style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
          />
        </View>

        {labelViewFun(
          theme,
          "edit",
          reduxLang.CustomizeTheme,
          "",
          navigation,
          "CustomizeTheme"
        )}

        {labelViewFun(
          theme,
          "heart",
          reduxLang.MyWishlist,
          "",
          navigation,
          "Wishlist"
        )}

        <TouchableWithoutFeedback
          onPress={() => {
            showLangModal()
          }}
        >
          {labelViewFun(
            theme,
            "globe",
            reduxLang.Language,
            !languageArray[0].status
              ? languageArray[0].value
              : languageArray[1].value,
            navigation,
            ""
          )}
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {
            showCurModal()
          }}
        >
          {labelViewFun(
            theme,
            "dollar",
            reduxLang.Currency,
            !currencyArray[0].status
              ? currencyArray[0].value
              : currencyArray[1].value,
            navigation,
            ""
          )}
        </TouchableWithoutFeedback>

        {labelViewFun(
          theme,
          "briefcase",
          reduxLang.MyOrders,
          "",
          navigation,
          "MyOrders"
        )}

        {labelViewFun(
          theme,
          "address-book",
          reduxLang.Address,
          "",
          navigation,
          "Address"
        )}

        <TouchableWithoutFeedback
          onPress={() => {
            showModal()
          }}
        >
          {labelViewFun(
            theme,
            "adjust",
            reduxLang.Theme,
            !themeColor[0].status ? themeColor[0].value : themeColor[1].value,
            navigation,
            ""
          )}
        </TouchableWithoutFeedback>

        {labelViewFun(
          theme,
          "phone",
          reduxLang.ContactUs,
          "",
          navigation,
          "ContactUs"
        )}

        {labelViewFun(
          theme,
          "user-circle",
          reduxLang.PrivacyPolice,
          "",
          navigation,
          "PrivacyPolicy"
        )}

        {labelViewFun(
          theme,
          "file",
          reduxLang.TermAndCondition,
          "",
          navigation,
          "TermsAndCond"
        )}

        {labelViewFun(
          theme,
          "info-circle",
          reduxLang.AboutUs,
          "",
          navigation,
          "AboutUs"
        )}

        {labelViewFun(theme, "star", reduxLang.RateTheApp, "", navigation, "")}

        {labelViewFun(
          theme,
          "tv",
          reduxLang.IntroScreen,
          "",
          navigation,
          "IntroSliderScreen"
        )}
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "700"
  },
  //////
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  scrollView: {
    flex: 1
  },
  scrollViewContainerStyle: {
    paddingBottom: 5
  },
  backGroundImage: {
    height: HEIGHT * 0.18,
    width: "100%"
  },
  drawerTouchableStyle: {
    flex: 1,
    height: 40,
    width: 40
  },
  drawerImageStyle: {
    backgroundColor: "transparent",
    height:
      Platform.OS === "ios"
        ? HEADER_IOS_HEIGHT * 0.22
        : HEADER_ANDROID_HEIGHT * 0.35,
    width:
      Platform.OS === "ios"
        ? HEADER_IOS_HEIGHT * 0.22
        : HEADER_ANDROID_HEIGHT * 0.35,

    top: HEIGHT * 0.04,
    left: HEIGHT * 0.04
  },
  settingText: {
    fontWeight: "bold",
    textAlign: "center"
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    paddingLeft: 15,
    paddingRight: 20,
    alignItems: "center",
    margin: 0,
    marginBottom: 1
  },
  imageTextContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  userNameTextView: {
    alignItems: "flex-start",
    paddingLeft: 15
  },
  userImageStyle: {
    padding: 10,
    height:
      Platform.OS === "ios"
        ? HEADER_IOS_HEIGHT * 0.7
        : HEADER_ANDROID_HEIGHT * 1,
    width:
      Platform.OS === "ios"
        ? HEADER_IOS_HEIGHT * 0.7
        : HEADER_ANDROID_HEIGHT * 1
  },
  emailText: {
    textAlign: "center",
    paddingTop: 4
  },
  nameText: {
    textAlign: "center",
    fontWeight: "700"
  },
  listLabelText: {
    marginLeft: 14,
    textAlign: "center",
    marginBottom: 3
  },
  listLabelView: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding:
      Platform.OS === "ios"
        ? HEADER_IOS_HEIGHT * 0.13
        : HEADER_ANDROID_HEIGHT * 0.23,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    margin: 0,
    marginVertical:
      Platform.OS === "ios"
        ? HEADER_IOS_HEIGHT * 0.012
        : HEADER_ANDROID_HEIGHT * 0.018
  },
  listLabelIconView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  labelIcon: {
    height:
      Platform.OS === "ios"
        ? HEADER_IOS_HEIGHT * 0.25
        : HEADER_ANDROID_HEIGHT * 0.32,
    width:
      Platform.OS === "ios"
        ? HEADER_IOS_HEIGHT * 0.28
        : HEADER_ANDROID_HEIGHT * 0.34
  },
  gSettingTextView: {
    width: "90%",
    alignItems: "flex-start",
    padding: 16,
    justifyContent: "center"
  },
  pickerTextStyle: {
    paddingLeft: 10,
    paddingRight: 10
  },
  picketTouchAbleStyle: {
    flexDirection: "row",
    alignSelf: "flex-start",
    padding: 10,
    paddingLeft: 0,
    paddingRight: 80
  },
  selectedViewStyle: {
    flexDirection: "row",
    alignItems: "center"
  },
  commonViewTextIconStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  selectedText: { marginRight: 5, marginLeft: 5 }
})

const mapStateToProps = state => ({
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang,
  isDarkMode: state.configReducer.isDarkMode,
  rtl: state.configReducer.rtl
})

const mapDispatchToProps = dispatch => ({
  setModeValue: id => dispatch(setModeValue(id)),
  setRtl: value => dispatch(setRtl(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen)
