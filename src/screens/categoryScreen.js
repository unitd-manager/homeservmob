import React, { useLayoutEffect, useState } from "react"
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback
} from "react-native"
import { connect } from "react-redux"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import CategoryOne from "../components/categories/categoryOne"
import CategoryTwo from "../components/categories/categoryTwo"
import CategoryThree from "../components/categories/categoryThree"
import CategoryFour from "../components/categories/categoryFour"
import CategoryFive from "../components/categories/categoryFive"
import CategorySix from "../components/categories/categorySix"
import CategorySeven from "../components/categories/categorySeven"
import CategoryEight from "../components/categories/categoryEight"
import CategoryNine from "../components/categories/categoryNine"
import CategoryTenth from "../components/categories/categoryTenth"

import api from "../constants/api"

const CategorySelection = (
  theme,
  value,
  setcategoryType,
  categoryTypeValue
) => (
  <TouchableOpacity onPress={() => setcategoryType(value)}>
    <Text
      style={[
        styles.categorySelection,
        {
          color: categoryTypeValue === value ? theme.primary : theme.textColor,
          fontSize: theme.appFontSize.largeSize
        }
      ]}
    >
      {value}
    </Text>
  </TouchableOpacity>
)

const App = ({ navigation, theme, reduxLang }) => {
  // Header Settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: reduxLang.Category,
      headerStyle: {
        backgroundColor: theme.secondryBackgroundColor,
        shadowColor: "transparent"
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true)
          }}
        >
          <View>
            <FontAwesome
              style={{
                color: theme.secondry,
                fontSize: theme.appFontSize.largeSize + 1,
                marginHorizontal: 18
              }}
              name={"th-list"}
            />
          </View>
        </TouchableOpacity>
      ),
      headerTintColor: theme.textColor
    })
  }, [
    navigation,
    reduxLang.Category,
    theme.secondryBackgroundColor,
    theme.textColor
  ])
  const [categoriess, setCategories] = useState([])
  

  useLayoutEffect(() => {
    api
      .get("/category/getAllCategory")
      .then(res => {
        setCategories(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  let [headPhones, setheadPhones] = useState([
    {
      url: require("../images/headPhone/CustomSize3.png"),
      productName: reduxLang.JBL,
      quantity: "120 Products"
    },
    {
      url: require("../images/headPhone/CustomSize3.png"),
      productName: reduxLang.Sony,
      quantity: "650 Products"
    },
    {
      url: require("../images/headPhone/CustomSize3.png"),
      productName: reduxLang.Sony,
      quantity: "432 Products"
    },
    {
      url: require("../images/headPhone/CustomSize3.png"),
      productName: reduxLang.Bose,
      quantity: "678 Products"
    },
    {
      url: require("../images/headPhone/CustomSize3.png"),
      productName: reduxLang.BeatsbyDre,
      quantity: "789 Products"
    },
    {
      url: require("../images/headPhone/CustomSize3.png"),
      productName: reduxLang.Skullcandy,
      quantity: "120 Products"
    },
    {
      url: require("../images/headPhone/CustomSize3.png"),
      productName: reduxLang.Beyerdynamic,
      quantity: "650 Products"
    },
    {
      url: require("../images/headPhone/CustomSize3.png"),
      productName: reduxLang.AKGAcoustics,
      quantity: "432 Products"
    },
    {
      url: require("../images/headPhone/CustomSize3.png"),
      productName: reduxLang.Skullcandy,
      quantity: "678 Products"
    },
    {
      url: require("../images/headPhone/CustomSize3.png"),
      productName: reduxLang.Beyerdynamic,
      quantity: "789 Products"
    }
  ])

  let [mensData, setmensData] = useState([
    {
      url: require("../images/shirtsTwo/CustomSize43.png"),
      productName: reduxLang.Chambray,
      quantity: "120 Products"
    },
    {
      url: require("../images/shirtsTwo/CustomSize43.png"),
      productName: reduxLang.LinenShirt,
      quantity: "650 Products"
    },
    {
      url: require("../images/shirtsTwo/CustomSize43.png"),
      productName: reduxLang.DenimShirt,
      quantity: "432 Products"
    },
    {
      url: require("../images/shirtsTwo/CustomSize43.png"),
      productName: reduxLang.ClassicShortSleeveShirt,
      quantity: "678 Products"
    },
    {
      url: require("../images/shirtsTwo/CustomSize43.png"),
      productName: reduxLang.Chambray,
      quantity: "789 Products"
    },
    {
      url: require("../images/shirtsTwo/CustomSize43.png"),
      productName: reduxLang.OfficeShirt,
      quantity: "120 Products"
    },
    {
      url: require("../images/shirtsTwo/CustomSize43.png"),
      productName: reduxLang.FlannelShirt,
      quantity: "650 Products"
    },
    {
      url: require("../images/shirtsTwo/CustomSize43.png"),
      productName: reduxLang.Overshirt,
      quantity: "432 Products"
    },
    {
      url: require("../images/shirtsTwo/CustomSize43.png"),
      productName: reduxLang.CubanCollarShirt,
      quantity: "678 Products"
    },
    {
      url: require("../images/shirtsTwo/CustomSize43.png"),
      productName: reduxLang.DressShirt,
      quantity: "789 Products"
    }
  ])

  let [groceryData, setgroceryData] = useState([
    {
      url: require("../images/grocery/CustomSize10.png"),
      productName: reduxLang.Apple,
      quantity: "120 " + reduxLang.Products
    },
    {
      url: require("../images/grocery/CustomSize10.png"),
      productName: reduxLang.Mango,
      quantity: "650 " + reduxLang.Products
    },
    {
      url: require("../images/grocery/CustomSize10.png"),
      productName: reduxLang.Strawberry,
      quantity: "432 " + reduxLang.Products
    },
    {
      url: require("../images/grocery/CustomSize10.png"),
      productName: reduxLang.Tomato,
      quantity: "678 " + reduxLang.Products
    },
    {
      url: require("../images/grocery/CustomSize10.png"),
      productName: reduxLang.Cauliflower,
      quantity: "789 " + reduxLang.Products
    },
    {
      url: require("../images/grocery/CustomSize10.png"),
      productName: reduxLang.Biscute,
      quantity: "120 " + reduxLang.Products
    },
    {
      url: require("../images/grocery/CustomSize10.png"),
      productName: reduxLang.Lays,
      quantity: "650 " + reduxLang.Products
    },
    {
      url: require("../images/grocery/CustomSize10.png"),
      productName: reduxLang.Chocklate,
      quantity: "678 " + reduxLang.Products
    },
    {
      url: require("../images/grocery/CustomSize10.png"),
      productName: reduxLang.Chocklate,
      quantity: "120 " + reduxLang.Products
    },
    {
      url: require("../images/grocery/CustomSize10.png"),
      productName: reduxLang.Mango,
      quantity: "678 " + reduxLang.Products
    }
  ])

  let [furniture, setfurniture] = useState([
    {
      url: require("../images/furniture/CustomSize19.png"),
      productName: "Armchair",
      quantity: "120 Products"
    },
    {
      url: require("../images/furniture/CustomSize19.png"),
      productName: reduxLang.Sofa,
      quantity: "650 Products"
    },
    {
      url: require("../images/furniture/CustomSize19.png"),
      productName: reduxLang.Woodchair,
      quantity: "432 Products"
    },
    {
      url: require("../images/furniture/CustomSize19.png"),
      productName: reduxLang.Wingchair,
      quantity: "678 Products"
    },
    {
      url: require("../images/furniture/CustomSize19.png"),
      productName: reduxLang.Foldingchair,
      quantity: "789 Products"
    },
    {
      url: require("../images/furniture/CustomSize19.png"),
      productName: reduxLang.Studentchair,
      quantity: "120 Products"
    },
    {
      url: require("../images/furniture/CustomSize19.png"),
      productName: reduxLang.Gardenchair,
      quantity: "650 Products"
    },
    {
      url: require("../images/furniture/CustomSize19.png"),
      productName: reduxLang.Salonchair,
      quantity: "432 Products"
    },
    {
      url: require("../images/furniture/CustomSize19.png"),
      productName: "Desk chair",
      quantity: "678 Products"
    },
    {
      url: require("../images/furniture/CustomSize19.png"),
      productName: reduxLang.Studentchair,
      quantity: "789 Products"
    }
  ])

  const [array2] = React.useState([
    {
      url: require("../images/Categories/Menright.png"),
      productName: reduxLang.Men,
      quantity: "120",
      textLtr: true
    },
    {
      url: require("../images/Categories/Menright.png"),
      productName: reduxLang.headphones,
      quantity: "650",
      textLtr: false
    },
    {
      url: require("../images/Categories/Menright.png"),
      productName: reduxLang.Grocery,
      quantity: "432",
      textLtr: true
    },
    {
      url: require("../images/Categories/Menright.png"),
      productName: reduxLang.Furniture,
      quantity: "678",
      textLtr: false
    },
    {
      url: require("../images/Categories/Menright.png"),
      productName: reduxLang.Baby,
      quantity: "789",
      textLtr: true
    }
  ])

  const [array3] = React.useState([
    {
      url: require("../images/Categories/Menright.png"),
      productName: reduxLang.Men,
      quantity: "120",
      textLtr: true
    },
    {
      url: require("../images/Categories/Menright.png"),
      productName: reduxLang.headphones,
      quantity: "650",
      textLtr: false
    },
    {
      url: require("../images/Categories/Menright.png"),
      productName: reduxLang.Grocery,
      quantity: "432",
      textLtr: true
    },
    {
      url: require("../images/Categories/Menright.png"),
      productName: reduxLang.Furniture,
      quantity: "678",
      textLtr: false
    },
    {
      url: require("../images/Categories/Menright.png"),
      productName: reduxLang.Baby,
      quantity: "789",
      textLtr: true
    }
  ])

  const [array] = React.useState([
    {
      url: require("../images/shirtsTwo/CustomSize43.png"),
      productName: reduxLang.Men,
      quantity: "120"
    },
    {
      url: require("../images/shirtsTwo/CustomSize43.png"),
      productName: reduxLang.headphones,
      quantity: "20"
    },
    {
      url: require("../images/shirtsTwo/CustomSize43.png"),
      productName: reduxLang.Grocery,
      quantity: "300"
    },
    {
      url: require("../images/shirtsTwo/CustomSize43.png"),
      productName: reduxLang.Furniture,
      quantity: "120"
    },
    {
      url: require("../images/shirtsTwo/CustomSize43.png"),
      productName: reduxLang.Baby,
      quantity: "20"
    }
  ])
  const [modalVisible, setModalVisible] = useState(false)
  const [categoryType, setcategoryType] = useState("2")
  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.primaryBackgroundColor }
      ]}
    >
      {/* //Modal View start*/}
      <Modal visible={modalVisible} transparent={true} animationType={"none"}>
        <TouchableWithoutFeedback
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View
          style={[
            styles.modalView,
            {
              backgroundColor: theme.secondryBackgroundColor
            }
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {CategorySelection(theme, "1", setcategoryType, categoryType)}
            {CategorySelection(theme, "2", setcategoryType, categoryType)}
            {CategorySelection(theme, "3", setcategoryType, categoryType)}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start"
            }}
          >
            {CategorySelection(theme, "4", setcategoryType, categoryType)}
            {CategorySelection(theme, "5", setcategoryType, categoryType)}
            {CategorySelection(theme, "6", setcategoryType, categoryType)}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start"
            }}
          >
            {CategorySelection(theme, "7", setcategoryType, categoryType)}
            {CategorySelection(theme, "8", setcategoryType, categoryType)}
            {CategorySelection(theme, "9", setcategoryType, categoryType)}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start"
            }}
          >
            {CategorySelection(theme, "10", setcategoryType, categoryType)}
          </View>
        </View>
      </Modal>

      {/* //Modal End */}

      {categoryType === "6" ? (
        <CategorySix
          data={array}
          headPhones={headPhones}
          mensData={mensData}
          groceryData={groceryData}
          subCategory={furniture}
          theme={theme}
          reduxLang={reduxLang}
        />
      ) : categoryType === "10" ? (
        <CategoryTenth
          data={array}
          headPhones={headPhones}
          mensData={mensData}
          groceryData={groceryData}
          subCategory={furniture}
          theme={theme}
          reduxLang={reduxLang}
        />
      ) : (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {categoryType === "1" ? (
            <CategoryOne
            data={categoriess}
              theme={theme}
              reduxLang={reduxLang}
            />
          ) : null}
          {categoryType === "2" ? (
            <CategoryTwo data={categoriess} theme={theme} />
          ) : null}
          {categoryType === "3" ? (
            <CategoryThree data={categoriess} theme={theme} reduxLang={reduxLang} />
          ) : null}
          {categoryType === "4" ? (
            <CategoryFour data={array} theme={theme} reduxLang={reduxLang} />
          ) : null}
          {categoryType === "5" ? (
            <CategoryFive data={array} theme={theme} reduxLang={reduxLang} />
          ) : null}
          {categoryType === "7" ? (
            <CategorySeven data={array} theme={theme} reduxLang={reduxLang} />
          ) : null}
          {categoryType === "8" ? (
            <CategoryEight data={array} theme={theme} reduxLang={reduxLang} />
          ) : null}
          {categoryType === "9" ? (
            <CategoryNine data={array} theme={theme} reduxLang={reduxLang} />
          ) : null}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flex: 1,
    marginVertical: 4
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent"
  },
  modalView: {
    borderRadius: 20,
    padding: 9,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    top: "5%",
    left: "63%",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "30%"
  },
  categorySelection: {
    fontWeight: "bold",
    margin: "14%",
    alignSelf: "center",
    marginTop: 5
  }
})

const mapStateToProps = state => ({
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang
})

export default connect(mapStateToProps, null)(App)
