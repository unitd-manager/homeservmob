import React from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform
} from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import {
  HEADER_IOS_HEIGHT,
  HEADER_ANDROID_HEIGHT,
  WIDTH
} from "./config"

const MethodPicker = ({ theme, item, selectMethod, index }) => {
  return (
    <TouchableOpacity
      key={index}
      onPress={() => selectMethod(item.index)}
      style={[
        styles.picketTouchAbleStyle,
        {
          backgroundColor: theme.secondryBackgroundColor
        }
      ]}
    >
      <View key={index} style={styles.selectedViewStyle}>
        {!item.status ? (
          <FontAwesome
            key={index}
            name={"check-circle"}
            style={{ fontSize: theme.appFontSize.largeSize + 3 }}
            color={theme.textColor}
          />
        ) : (
          <View
            key={index}
            style={[styles.emptyCheck, { borderColor: theme.secondry }]}
          />
        )}
        <Text
          style={[
            styles.pickerTextStyle,
            {
              color: theme.textColor,
              fontSize: theme.appFontSize.mediumSize,
              fontFamily: theme.appFontSize.fontFamily,
              fontWeight: !item.status ? "bold" : "normal"
            }
          ]}
        >
          {item.value}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  selectedViewStyle: {
    flexDirection: "row",
    alignItems: "center"
  },
  emptyCheck: {
    borderWidth: 3,
    width:
      Platform.OS === "ios"
        ? HEADER_IOS_HEIGHT * 0.2
        : HEADER_ANDROID_HEIGHT * 0.3,
    height:
      Platform.OS === "ios"
        ? HEADER_IOS_HEIGHT * 0.2
        : HEADER_ANDROID_HEIGHT * 0.3,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  picketTouchAbleStyle: {
    flexDirection: "row",
    alignSelf: "center",
    padding: 8,
    width: WIDTH * 0.95,
    marginVertical: 3,
    borderRadius: 30
  },
  pickerTextStyle: {
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20
  }
})

export default MethodPicker
