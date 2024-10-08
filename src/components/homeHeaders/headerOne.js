import React from "react"
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import DrawerIcon from "../drawerIcon"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { HEADER_ANDROID_HEIGHT, HEADER_IOS_HEIGHT } from "../config"
import { useNavigation } from "@react-navigation/native"
const HeaderOne = ({ theme, reduxLang }) => {
  const navigation = useNavigation()
  return (
    <View
      style={[
        styles.searchContainerView,
        {
          backgroundColor: theme.secondryBackgroundColor
        }
      ]}
    >
      <DrawerIcon navigation={navigation} theme={theme} />

      <TouchableOpacity
        onPress={() => navigation.navigate("Search")}
        style={[
          styles.searchTextView,
          {
            backgroundColor: theme.primaryBackgroundColor
          }
        ]}
      >
        <Text
          style={[
            styles.textInput,
            {
              color: "gray",
              fontSize: theme.appFontSize.mediumSize,
              fontFamily: theme.appFontSize.fontFamily
            }
          ]}
        >
          {reduxLang.Search}
        </Text>

        <FontAwesome
          style={{
            color: theme.secondry,
            fontSize: theme.appFontSize.largeSize
          }}
          name={"search"}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  searchTextView: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 32,
    borderColor: "gray",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 0.2,
    padding: 8,
    paddingHorizontal: 14
  },
  textInput: {
    alignSelf: "flex-start"
  },
  searchContainerView: {
    paddingHorizontal: 15,
    width: "100%",
    paddingVertical:
      Platform.OS === "ios"
        ? HEADER_IOS_HEIGHT * 0.1
        : HEADER_ANDROID_HEIGHT * 0.12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.16,
    shadowRadius: 3.84,
    elevation: 2
  }
})

export default HeaderOne
