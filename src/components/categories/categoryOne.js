import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  I18nManager,
} from "react-native";
import { HEIGHT } from "../config"
import { useNavigation } from "@react-navigation/native";
import imageBase from "../../constants/imageBase";
const WIDTH = Dimensions.get("window").width;

const categoryOne = (
  reduxlang,
  navigation,
  data,
  index,
  theme,
  url,
  align,
  name,
  counting
) => (
  <TouchableOpacity
    key={index}
    onPress={() => navigation.navigate("Shop")}
    style={styles.touchableOpacity}
  >
    <ImageBackground
      key={url}
      imageStyle={{ borderRadius: 6 }}
      source={{ uri: `${imageBase}${item.images}` }}
      style={[
        styles.image,
        {
          alignItems: !I18nManager.isRTL
            ? align
              ? "flex-start"
              : "flex-end"
            : align
            ? "flex-end"
            : "flex-start",
        },
      ]}
    >
      <View style={styles.productNameView}>
        <Text
          style={[
            styles.productNameText,
            {
              fontSize: theme.appFontSize.largeSize + 4,
              fontFamily: theme.appFontSize.fontFamily,
              color: "#ffffff",
            },
          ]}
        >
          {name}
        </Text>

        <Text
          style={[
            styles.productCountText,
            {
              fontSize: theme.appFontSize.smallSize,
              fontFamily: theme.appFontSize.fontFamily,
              color: "#ffffff",
              paddingTop: 3,
            },
          ]}
        >
          {counting + " " + reduxlang.Products}
        </Text>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

const CategoryCardOne = ({ data, theme, reduxLang }) => {
  const navigation = useNavigation();

  console.log("data", data);
  return (
    <View>
      {data &&
        Array.isArray(data) &&
        data.map((value, index) =>
          categoryOne(
            reduxLang,
            navigation,
            data,
            index,
            theme,
            value.url,
            value.textLtr,
            value.category_title,
            value.quantity
          )
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: HEIGHT * 0.15,
    width: WIDTH * 0.95,
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  touchableOpacity: {
    justifyContent: "center",
    alignItems: "center",
  },
  opacity: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    height: "100%",
    alignContent: "center",
    opacity: 0.3,
    borderRadius: 20,
  },
  productNameView: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 25,
  },
  productNameText: {},
  productCountText: {},
});

export default CategoryCardOne;
