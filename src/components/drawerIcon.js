import React from "react"
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
const MenuIcon = ({ navigation, theme, color, marginRight }) => (
  <TouchableOpacity
    onPress={() => {
      navigation.openDrawer()
    }}
  >
    <View style={Platform.OS === "android" ? styles.iconContainer : null}>
      <FontAwesome
        name="bars"
        style={[
          {
            color: color ? color : theme.secondry,
            fontSize: theme.appFontSize.largeSize + 3,
            marginRight: marginRight
              ? marginRight
              : Platform.OS === "ios"
              ? 22
              : 12
          }
        ]}
      />
    </View>
  </TouchableOpacity>
)
export default MenuIcon
const styles = StyleSheet.create({
  iconContainer: {
    padding: 3,
    paddingTop: 6,
    marginHorizontal: 4
  }
})
