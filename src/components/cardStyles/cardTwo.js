import React from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground
} from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { HEIGHT, WIDTH } from "../config"
import { useNavigation } from "@react-navigation/native"
import imageBase from "../../constants/imageBase"

const CardTwo = ({
  data,
  theme,
  backgroundColor,
  index,
  productDetailData
}) => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View
        key={index}
        style={[
          styles.touchableOpacity,
          {
            backgroundColor: backgroundColor
              ? backgroundColor
              : theme.secondryBackgroundColor
          }
        ]}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.push("ProductDetail", {
              dataImages: productDetailData
            })
          }
        >
          <ImageBackground
            source={{ uri: `${imageBase}${data.Images}` }}
            resizeMode={"cover"}
            style={[
              styles.imageBackground,
              {
                backgroundColor: theme.backgroundImageColor
              }
            ]}
          >
            <TouchableOpacity style={styles.heartIcon}>
              <Ionicons
                style={[
                  styles.heartIconStyle,
                  {
                    fontSize: theme.appFontSize.largeSize + 1
                  }
                ]}
                name={"heart-outline"}
              />
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>

        <View style={styles.productNameView}>
          <Text
            numberOfLines={1}
            style={[
              styles.productNameText,
              {
                color: theme.textColor,
                fontSize: theme.appFontSize.smallSize,
                fontFamily: theme.appFontSize.fontFamily
              }
            ]}
          >
            {data.productName}
          </Text>

          <Text
            numberOfLines={1}
            style={[
              styles.bold,
              {
                color: theme.primary,
                fontSize: theme.appFontSize.mediumSize - 1,
                fontFamily: theme.appFontSize.fontFamily
              }
            ]}
          >
            {"$380.00"}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    margin: 4
  },
  heartIcon: {
    zIndex: 20,
    alignItems: "center",
    height: WIDTH * 0.064,
    width: WIDTH * 0.064,
    borderRadius: 100,
    justifyContent: "center",
    alignSelf: "flex-end",
    backgroundColor: "#ffffff",
    right: 7,
    top: 7
  },
  heartIconStyle: {
    color: "#000000",
    paddingTop: 1,
    alignSelf: "center"
  },
  productNameText: {
    paddingVertical: 3
  },
  bold: {
    fontWeight: "bold"
  },
  touchableOpacity: {
    borderRadius: 5,
    width: "100%",
    justifyContent: "center"
  },
  imageBackground: {
    height: HEIGHT * 0.23,
    width: "100%",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: "red"
  },
  productNameView: {
    marginHorizontal: 10,
    alignItems: "center",
    marginVertical: 6
  }
})

export default CardTwo
