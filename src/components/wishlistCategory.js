import React, { useState,useEffect } from "react"
import {
  I18nManager,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View
} from "react-native"
import { connect } from "react-redux"
import AddtoCartPopUpModal from "./addtoCartPopUpModal"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { FlatList } from "react-native-gesture-handler"
import Card from "./cardStyles/cardTwo"
import { WIDTH } from "./config"
import ReviewStar from "./reviewStar"
import { HEIGHT } from "./config"
import { useNavigation } from "@react-navigation/native"
import api from "../constants/api"
const App = ({
  theme,
  reduxLang,
  fontSize,
  backgroundColor,
  productDetailData
}) => {
  const navigation = useNavigation()

  const [data, setData] = useState([])
  
  console.log('daaa',data)
  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = () => {
    api.get("/product/getAllProducts")
      .then(res => {
        const formattedData = res.data.data.map(item => ({
          ...item,
          title: String(item.title).split(","),
          images: String(item.images).split(",")
        }));
        setData(formattedData);
      })
      .catch(error => {
        console.log("Error fetching product data:", error);
      });
  };


  const [addtoCartmodalVisible, setaddtoCartModalVisible] = useState(false)

  return (
    <View
      style={[
        styles.wishContainer,
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : theme.secondryBackgroundColor
        }
      ]}
    >
      <AddtoCartPopUpModal
        theme={theme}
        productDetailData={data}
        reduxLang={reduxLang}
        addtoCartmodalVisible={addtoCartmodalVisible}
        setaddtoCartModalVisible={setaddtoCartModalVisible}
      />
      <View style={styles.wishRow}>
        <Text
          style={[
            styles.bold,
            {
              color: theme.textColor,
              fontSize: fontSize ? fontSize : theme.appFontSize.smallSize,
              fontFamily: theme.appFontSize.fontFamily
            }
          ]}
        >
          {reduxLang.WishList}
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Wishlist", {
              dataImages: data
            })
          }
          style={styles.rowTag}
        >
          <Text
            style={[
              styles.bold,
              {
                color: theme.primary,
                fontSize: theme.appFontSize.smallSize,
                fontFamily: theme.appFontSize.fontFamily
              }
            ]}
          >
            {reduxLang.ViewMore}
          </Text>
          <FontAwesome
            name={!I18nManager.isRTL ? "angle-right" : "angle-left"}
            style={[
              styles.paddingHot,
              {
                color: theme.primary,
                fontSize: theme.appFontSize.smallSize
              }
            ]}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        keyExtractor={(item, index) => index.toString()}
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.push("ProductDetail", { productId: item, datas: data })}
            style={styles.touchableOpacity}
          >
            <Image
              source={{ uri: item.images[0] ? `https://unitdecom.unitdtechnologies.com/storage/uploads/${item.images[0]}` : null }}
              resizeMode="cover"
              borderRadius={8}
              style={[styles.imageBackground, { backgroundColor: backgroundColor || theme.backgroundImageColor }]}
            />
            <View style={styles.productNameView}>
              <Text numberOfLines={1} style={[styles.productNameText, styles.bold, { color: theme.textColor, fontSize: theme.appFontSize.mediumSize, fontFamily: theme.appFontSize.fontFamily }]}>{item.title}</Text>
              <Text numberOfLines={1} style={[{ color: theme.textColor, fontSize: theme.appFontSize.smallSize, fontFamily: theme.appFontSize.fontFamily }]}>Rs: {item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  paddingHot: {
    paddingHorizontal: 5
  },
  rowTag: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  wishContainer: {
    width: "100%",
    alignSelf: "center",
    padding: 1
  },
  bold: {
    fontWeight: "bold"
  },
  wishRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    paddingBottom: 5
  },
  container: {
    width: "100%",
    alignSelf: "center",
    padding: 1
  },
  touchableOpacity: {
    borderRadius: 6,
    justifyContent: "center",
    margin: 4
  },
  imageBackground: {
    height: 150, // Adjust as needed
    width: 150, // Adjust as needed
    borderRadius: 8,
    backgroundColor: "transparent"
  },
  productNameView: {
    marginHorizontal: 10,
    alignItems: "flex-start",
    marginVertical: 6
  },
  productNameText: {
    paddingVertical: 3
  },
  bold: {
    fontWeight: "bold"
  }})

export default connect(null, null)(App)
