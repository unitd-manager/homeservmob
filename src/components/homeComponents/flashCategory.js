import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { connect } from "react-redux"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { FlatList } from "react-native-gesture-handler"
import { WIDTH } from "../config"
import { useNavigation } from "@react-navigation/native"
import imageBase from "../../constants/imageBase"

const App = ({ theme, reduxLang, categories, productDetailData }) => {
  const navigation = useNavigation()



  return (
    <View
      style={[
        styles.flashContainer,
        {
          backgroundColor: theme.secondryBackgroundColor
        }
      ]}
    >
      <View style={styles.flashRow}>
        <Text
          style={[
            styles.bold,
            {
              color: theme.textColor,
              fontSize: theme.appFontSize.smallSize,
              fontFamily: theme.appFontSize.fontFamily
            }
          ]}
        >
          {reduxLang.FLashSale}
        </Text>

        <View style={styles.rowTag}>
          <FontAwesome
            name={"bolt"}
            style={[
              styles.paddingHot,
              {
                color: theme.primary,
                fontSize: theme.appFontSize.smallSize
              }
            ]}
          />

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
            19:10:01
          </Text>
        </View>
      </View>

      <FlatList
        horizontal
        keyExtractor={(item, index) => "key" + index}
        data={categories}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.push("ProductDetail", {
                  productId: item,datas:categories
                })
              }
              key={index}
              style={styles.categoryTouch}
            >
             <Image
               source={{ uri: item.images?.[0] ? `${imageBase}${item.images[0]}` : null }}
                resizeMode={"cover"}
              style={styles.imageBackground}
              />

              <Text
                style={[
                  styles.categoryText,
                  styles.bold,
                  {
                    color: theme.textColor,
                    fontSize: theme.appFontSize.smallSize,
                    fontFamily: theme.appFontSize.fontFamily
                  }
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  categoryTouch: {
    margin: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  paddingHot: {
    paddingHorizontal: 5
  },
  rowTag: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  flashContainer: {
    width: "95%",
    alignSelf: "center",
    borderRadius: 12,
    padding: 1,
    elevation: 0.9,
    shadowColor: "#000000",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 5
  },
  bold: {
    fontWeight: "bold"
  },
  imageBackground: {
    height: WIDTH * 0.2,
    width: WIDTH * 0.2,
    borderRadius: 12
  },
  flashRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    paddingBottom: 5
  },
  categoryView: {
    borderRadius: 23,
    height: 46,
    width: 46,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 1
  },
  categoryText: {
    paddingTop: 5
  }
})

const mapStateToProps = state => ({
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang
})

export default connect(mapStateToProps, null)(App)
