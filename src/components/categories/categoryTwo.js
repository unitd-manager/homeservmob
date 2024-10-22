import React from "react"
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  Text,
  View,
  TouchableOpacity
} from "react-native"
import { HEIGHT } from "../config"
import { useNavigation } from "@react-navigation/native"
import imageBase from "../../constants/imageBase";
const WIDTH = Dimensions.get("window").width

const categoryTwo = (navigation, index, theme, url, name,categoryId) => (
  <TouchableOpacity
    key={index}
    onPress={() => navigation.navigate('Shop',{categoryIds:categoryId})}
    style={styles.touchableOpacity}
  >
    <ImageBackground
      key={url}
      imageStyle={{ borderRadius: 19 }}
      source={{ uri: `${imageBase}${url}` }}
      style={styles.image}
    >
      <View
        style={[
          styles.opacityStyle,
          {
            backgroundColor: theme.primary
          }
        ]}
      />
      <View style={styles.productNameView}>
        <Text
          style={[
            styles.productText,
            {
              fontSize: theme.appFontSize.largeSize + 6,
              fontFamily: theme.appFontSize.fontFamily
            }
          ]}
        >
          {name}
        </Text>
      </View>
    </ImageBackground>
  </TouchableOpacity>
)

const App = ({ data, theme }) => {
  const navigation = useNavigation()

  return (
   <View>
  {data.map((value, index) =>
    categoryTwo(navigation, index, theme, value.images, value.category_title,value.category_id)
  )}
</View>

  )
}

const styles = StyleSheet.create({
  touchableOpacity: {
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    height: HEIGHT * 0.16,
    width: WIDTH * 0.95,
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 5,
    alignItems: "center"
  },
  opacityStyle: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: HEIGHT * 0.16,
    width: WIDTH * 0.95,
    alignContent: "center",
    opacity: 0.6,
    borderRadius: 19
  },
  productText: {
    color: "#ffffff",
    fontWeight: "bold"
  },
  productNameView: {
    justifyContent: "center",
    alignItems: "flex-start",
    zIndex: 9,
    position: "absolute"
  }
})

export default App
