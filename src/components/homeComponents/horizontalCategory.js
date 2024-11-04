import React, { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native"
import { connect } from "react-redux"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { FlatList } from "react-native-gesture-handler"
import { WIDTH } from "../config"
import { useNavigation } from "@react-navigation/native"
import api from "../../constants/api"
import imageBase from "../../constants/imageBase"

const App = ({ theme, reduxLang, backgroundColor, iconColor }) => {
  const navigation = useNavigation()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    api
      .get("/category/getAllCategory")
      .then(res => {
        setCategories(res.data.data.slice(0, 4))
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <FlatList
      horizontal
      keyExtractor={(item, index) => "key" + index}
      data={categories}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.push("Shop", {
                categoriesType: item,categoryIds:item.category_id
              })
            }
            key={index}
            style={styles.categoryTouch}
          >
            <View
              style={[
                {
                  backgroundColor: backgroundColor
                    ? backgroundColor
                    : theme.primary
                },
                styles.categoryView
              ]}
            >
              <Image
                source={{ uri: `${imageBase}${item.images}` }}
                style={[
                  styles.image,
                  {
                    backgroundColor: theme.backgroundImageColor,
                    fontSize: theme.appFontSize.largeSize + 3
                  }
                ]}
              />
              {/* <FontAwesome
                name={item.icon}
                style={[
                  {
                    color: iconColor ? iconColor : theme.primaryTextColor,
                    fontSize: theme.appFontSize.largeSize + 3
                  }
                ]}
              /> */}
            </View>

            <Text
              style={[
                styles.categoryText,
                {
                  color: theme.textColor,
                  fontSize: theme.appFontSize.smallSize,
                  fontFamily: theme.appFontSize.fontFamily
                }
              ]}
            >
              {item.category_title}
            </Text>
          </TouchableOpacity>
        )
      }}
      ListFooterComponent={
        <TouchableOpacity
          onPress={() => navigation.navigate("Category")}
          style={styles.categoryTouch}
        >
          <View
            style={[
              {
                backgroundColor: theme.secondryBackgroundColor
              },
              styles.categoryView
            ]}
          >
            <FontAwesome
              name={"ellipsis-h"}
              style={[
                {
                  color: iconColor ? iconColor : theme.primary,
                  fontSize: theme.appFontSize.largeSize + 3
                }
              ]}
            />
          </View>

          <Text
            style={[
              styles.categoryText,
              {
                color: theme.textColor,
                fontSize: theme.appFontSize.smallSize,
                fontFamily: theme.appFontSize.fontFamily
              }
            ]}
          >
            {reduxLang.More}
          </Text>
        </TouchableOpacity>
      }
    />
  )
}

const styles = StyleSheet.create({
  categoryTouch: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14
  },
  categoryView: {
    borderRadius: 100,
    height: WIDTH * 0.18,
    width: WIDTH * 0.18,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 1
  },
  image: {
    width: "80%",
    height: "80%",
    borderRadius: 100
  },
  categoryText: {
    paddingTop: 6
  }
})

const mapStateToProps = state => ({
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang
})

export default connect(mapStateToProps, null)(App)
