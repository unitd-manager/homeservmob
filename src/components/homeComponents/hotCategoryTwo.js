import React from "react"
import {
  I18nManager,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import { connect } from "react-redux"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { FlatList } from "react-native-gesture-handler"
import { WIDTH } from "../config"
import { useNavigation } from "@react-navigation/native"
const App = ({ theme, reduxLang, categories, paddingHorizontal }) => {
  const navigation = useNavigation()

  return (
    <View
      style={[
        styles.flashContainer,
        {
          backgroundColor: theme.primaryBackgroundColor
        }
      ]}
    >
      <View style={styles.flashRow}>
        <Text
          style={[
            styles.bold,
            {
              color: theme.textColor,
              fontSize: theme.appFontSize.largeSize,
              fontFamily: theme.appFontSize.fontFamily,
              marginHorizontal: paddingHorizontal ? paddingHorizontal : 10
            }
          ]}
        >
          {reduxLang.HotCategory}
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Category")}
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
        keyExtractor={(item, index) => "key" + index}
        data={[...categories].reverse()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Category")}
              key={index}
              style={[
                styles.categoryTouch,
                { backgroundColor: theme.secondryBackgroundColor }
              ]}
            >
              <Image
                source={item.image}
                resizeMode={"cover"}
                style={[
                  styles.imageBackground,
                  {
                    backgroundColor: theme.backgroundImageColor
                  }
                ]}
              />

              <View style={styles.categoryText}>
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
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
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

    padding: 1
  },
  bold: {
    fontWeight: "bold"
  },
  imageBackground: {
    height: WIDTH * 0.28,
    width: WIDTH * 0.32
  },
  flashRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    paddingBottom: 5
  },
  categoryText: {
    width: WIDTH * 0.32,
    alignItems: "center",
    justifyContent: "center",
    height: 24
  }
})

export default connect(null, null)(App)
