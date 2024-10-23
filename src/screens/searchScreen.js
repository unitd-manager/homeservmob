import React, { useLayoutEffect, useState } from "react"
import {
  I18nManager,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Modal,
  TouchableWithoutFeedback
} from "react-native"
import { connect } from "react-redux"
import { addSearchValue, emptySearchList } from "../redux/actions/actions"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons"
import SearchListCard from "../components/searchListCard"
import CustomBtn from "../components/customBtn"
import Slider from "@react-native-community/slider"
import api from "../constants/api"
import {
  HEADER_ANDROID_HEIGHT,
  HEADER_IOS_HEIGHT,
  WIDTH
} from "../components/config"

const searchHeader = (
  theme,
  navigation,
  reduxLang,
  searchText,
  onChangeSearch,
  onChangeRecentTextArray,
  recentTextArray,
  setModalVisible
) => (
  <View
    style={[
      styles.searchContainerView,
      {
        backgroundColor: theme.secondryBackgroundColor
      }
    ]}
  >
    <TouchableOpacity style={styles.paddingRi} onPress={() => navigation.pop()}>
      <Ionicons
        style={[
          styles.horiPadding,
          {
            color: theme.secondry,
            fontSize: theme.appFontSize.largeSize + 5
          }
        ]}
        name={I18nManager.isRTL ? "arrow-forward" : "arrow-back"}
      />
    </TouchableOpacity>

    <View
      style={[
        styles.searchTextView,
        {
          backgroundColor: theme.primaryBackgroundColor
        }
      ]}
    >
      <View style={styles.searchView}>
        <FontAwesome
          style={[
            styles.horiPadding,
            {
              color: theme.secondry,
              fontSize: theme.appFontSize.largeSize
            }
          ]}
          name={"search"}
        />

        <TextInput
          style={[
            styles.textInput,
            {
              backgroundColor: theme.primaryBackgroundColor,
              color: theme.textColor,
              fontSize: theme.appFontSize.mediumSize,
              fontFamily: theme.appFontSize.fontFamily
            }
          ]}
          onChangeText={text => onChangeSearch(text)}
          placeholder={reduxLang.Search}
          placeholderTextColor={"gray"}
          // onSubmitEditing={() => onChangeRecentTextArray(searchText)}
          returnKeyType={"search"}
          returnKeyLabel={"search"}
          value={searchText}
        />
      </View>
      <View style={styles.closeIconView}>
        <TouchableOpacity
          onPress={() => {
            onChangeSearch("")
          }}
        >
          <FontAwesome
            style={[
              styles.horiPadding,
              {
                color:
                  searchText.length > 0
                    ? theme.secondry
                    : theme.primaryBackgroundColor,
                fontSize: theme.appFontSize.largeSize
              }
            ]}
            name={"close"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons
            style={[
              styles.horiPadding,
              styles.crossIcon,
              {
                color: theme.secondry,
                fontSize: theme.appFontSize.largeSize + 4,
                borderColor:
                  searchText.length > 0
                    ? theme.secondryBackgroundColor
                    : theme.primaryBackgroundColor
              }
            ]}
            name={"options-outline"}
          />
        </TouchableOpacity>
      </View>
    </View>
  </View>
)

const recentText = (theme, text, index, onChangeSearch) => (
  <TouchableOpacity
    key={index}
    onPress={() => {
      onChangeSearch(text)
    }}
    style={[
      styles.textTouchable,
      {
        backgroundColor: theme.secondryBackgroundColor
      }
    ]}
  >
    <Text
      style={{
        color: theme.primary,
        fontSize: theme.appFontSize.mediumSize,
        fontFamily: theme.appFontSize.fontFamily
      }}
    >
      {text}
    </Text>
  </TouchableOpacity>
)

const tagsFun = (theme, array, index, onChangeSearch) => (
  <TouchableOpacity
    key={index}
    onPress={() => {
      let temp = {
        name: array[index].name,
        isSelected: !array[index].isSelected
      }
      array[index] = temp
      onChangeSearch([...array])
    }}
    style={[
      styles.textTouchable,
      {
        backgroundColor: array[index].isSelected
          ? theme.primary
          : theme.secondryBackgroundColor
      }
    ]}
  >
    <Text
      style={{
        color: array[index].isSelected ? theme.primaryTextColor : theme.primary,
        fontSize: theme.appFontSize.mediumSize
      }}
    >
      {array[index].name}
    </Text>
  </TouchableOpacity>
)

const colorsFun = (theme, array, index, onChangeSearch) => (
  <TouchableOpacity
    key={index}
    onPress={() => {
      let temp = {
        name: array[index].name,
        isSelected: !array[index].isSelected
      }
      array[index] = temp
      onChangeSearch([...array])
    }}
    style={[
      styles.colorsView,
      {
        borderWidth: array[index].isSelected ? 3 : 0,
        borderColor: array[index].isSelected
          ? theme.primaryTextColor
          : theme.primaryBackgroundColor
      },
      {
        backgroundColor: array[index].name
      }
    ]}
  ></TouchableOpacity>
)

const attributesFun = (theme, array, index, onChangeSearch) => (
  <TouchableOpacity
    key={index}
    onPress={() => {
      array.map(value => {
        value.isSelected = false
      })
      let temp = {
        name: array[index].name,
        isSelected: !array[index].isSelected
      }
      array[index] = temp
      onChangeSearch([...array])
    }}
    style={[
      styles.textTouchable,
      styles.textAttributes,
      {
        borderColor: array[index].isSelected
          ? theme.primaryTextColor
          : theme.primary,
        backgroundColor: array[index].isSelected
          ? theme.primary
          : theme.secondryBackgroundColor
      }
    ]}
  >
    <Text
      style={{
        color: array[index].isSelected ? theme.primaryTextColor : theme.primary,
        fontSize: theme.appFontSize.mediumSize
      }}
    >
      {array[index].name}
    </Text>
  </TouchableOpacity>
)

const recentSearchLabel = (
  theme,
  searchText,
  emptySearchListFun,
  reduxLang
) => (
  <View style={styles.recentSearchTextView}>
    <Text
      style={{
        color: theme.textColor,
        fontSize: theme.appFontSize.mediumSize
      }}
    >
      {reduxLang.RecentSearches}
    </Text>

    <TouchableOpacity onPress={() => emptySearchListFun()}>
      <FontAwesome
        style={{
          color: theme.secondry,
          fontSize: theme.appFontSize.largeSize,
          borderColor:
            searchText.length > 0
              ? theme.secondryBackgroundColor
              : theme.primaryBackgroundColor
        }}
        name={"trash"}
      />
    </TouchableOpacity>
  </View>
)

const App = ({
  navigation,
  theme,
  reduxLang,
  recentTextArray,
  addSearchValueFun,
  emptySearchListFun
}) => {
  // Header Settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: reduxLang.Search,
      headerStyle: {
        backgroundColor: theme.secondryBackgroundColor,
        shadowColor: "transparent"
      },
      headerShown: false,
      headerTintColor: theme.textColor
    })
  }, [
    navigation,
    reduxLang.Search,
    theme.secondryBackgroundColor,
    theme.textColor
  ])

  const [searchText, onChangeSearch] = useState("")
  const [data1, setData] = useState([])
 
 
  useLayoutEffect(() => {
    // Fetch data from API
    api
      .get("/product/getAllProducts")
      .then(res => {
        setData(res.data.data)
      
      })
      .catch(err => {
        console.log("error", err)
      })
    // getSliderDatas()
    // getBestSellingProducts()
    // getMostPopularProducts()
    // getNewProducts()
  }, [])

  const applyFilters = () => {
    let filteredData = [...data1];
   
 
   if (searchText !== '') {
    filteredData = filteredData.filter(item =>

        (item.title.toLowerCase().includes(searchText.toLowerCase()))
        
    );
  }
  
  
    return filteredData;
  };

 
  const filteredGallery = applyFilters(); 

  let [data, setdata] = useState([
    {
      url: require("../images/shirtsTwo/CustomSize43.png"),
      productName: reduxLang.DressShirt,
      quantity: "120 " + reduxLang.Products
    },
    {
      url: require("../images/shirtsTwo/CustomSize43.png"),
      productName: reduxLang.CubanCollarShirt,
      quantity: "650 " + reduxLang.Products
    },
    {
      url: require("../images/shirtsTwo/CustomSize43.png"),
      productName: reduxLang.Overshirt,
      quantity: "432 " + reduxLang.Products
    },
    {
      url: require("../images/shirtsTwo/CustomSize43.png"),
      productName: reduxLang.FlannelShirt,
      quantity: "678 " + reduxLang.Products
    },
    {
      url: require("../images/shirtsTwo/CustomSize43.png"),
      productName: reduxLang.OfficeShirt,
      quantity: "789 " + reduxLang.Products
    },
    {
      url: require("../images/shirtsTwo/CustomSize43.png"),
      productName: reduxLang.Chambray,
      quantity: "120 " + reduxLang.Products
    },
    {
      url: require("../images/shirtsTwo/CustomSize43.png"),
      productName: reduxLang.ClassicShortSleeveShirt,
      quantity: "650 " + reduxLang.Products
    },
    {
      url: require("../images/shirtsTwo/CustomSize43.png"),
      productName: reduxLang.DenimShirt,
      quantity: "432 " + reduxLang.Products
    },
    {
      url: require("../images/shirtsTwo/CustomSize43.png"),
      productName: reduxLang.LinenShirt,
      quantity: "678 " + reduxLang.Products
    },
    {
      url: require("../images/shirtsTwo/CustomSize43.png"),
      productName: reduxLang.Chambray,
      quantity: "678 " + reduxLang.Products
    }
  ])

  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisibleSortBy, setModalVisibleSortBy] = useState(false)

  const [productsCategoryList, setProductsCategoryList] = useState([
    
  ])
 
  useLayoutEffect(() => {
    api
      .get("/category/getAllCategory")
      .then(res => {
        setProductsCategoryList(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  const [productsTagsList, setProductsTagsList] = useState([
    { name: "#Green", isSelected: false },
    { name: "#red", isSelected: false },
    { name: "#Shirt", isSelected: false },
    { name: "#2 kg", isSelected: false }
  ])

  const [attributes, setAttributes] = useState([
    { name: reduxLang.Colors, isSelected: true },
    { name: reduxLang.Size, isSelected: false },
    { name: reduxLang.Weight, isSelected: false }
  ])

  const [colorsAttr, setColorsAttr] = useState([
    { name: "red", isSelected: true },
    { name: "green", isSelected: false },
    { name: "blue", isSelected: false }
  ])

  const [sizeAttr, setSizeAttr] = useState([
    { name: "L", isSelected: true },
    { name: "M", isSelected: false },
    { name: "S", isSelected: false },
    { name: "XL", isSelected: false }
  ])

  const [weightAttr, setWeightAttr] = useState([
    { name: "2kg", isSelected: true },
    { name: "3kg", isSelected: false },
    { name: "5kg", isSelected: false }
  ])
  const [sliderValue, setSliderValue] = useState(0)

  function sortByText(text, isSelected) {
    return (
      <TouchableOpacity
        style={[
          styles.sortByText,
          {
            borderBottomColor: theme.secondryBackgroundColor
          }
        ]}
      >
        <Text
          style={[
            styles.sortByTextStyle,
            {
              color: !isSelected ? theme.textColor : theme.primary,
              fontSize: theme.appFontSize.mediumSize,
              fontFamily: theme.appFontSize.fontFamily
            }
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.primaryBackgroundColor }
      ]}
    >
      {/* // Modal View */}

      {/* //Sort by Modal View start*/}
      <Modal
        visible={modalVisibleSortBy}
        transparent={true}
        animationType={"slide"}
      >
        <TouchableWithoutFeedback
          onPress={() => setModalVisibleSortBy(!modalVisibleSortBy)}
        >
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View
          style={[
            styles.modalView,
            {
              backgroundColor: theme.primaryBackgroundColor
            }
          ]}
        >
          <Text
            style={[
              styles.headerSortText,
              {
                color: theme.textColor,
                fontSize: theme.appFontSize.largeSize,
                fontFamily: theme.appFontSize.fontFamily
              }
            ]}
          >
            {reduxLang.SortBy}
          </Text>

          {sortByText(reduxLang.Recommended, false)}
          {sortByText(reduxLang.BestSelling, true)}
          {sortByText(reduxLang.LowtoHigh, false)}
          {sortByText(reduxLang.HightoLow, false)}
          {sortByText(reduxLang.Newest, false)}
        </View>
      </Modal>
      {/* //Modal View end*/}

      {/* //Modal View start*/}
      <Modal visible={modalVisible} transparent={true} animationType={"slide"}>
        <TouchableWithoutFeedback
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View
          style={[
            styles.modalView,
            {
              backgroundColor: theme.primaryBackgroundColor
            }
          ]}
        >
          <Text
            style={[
              styles.filterText,
              {
                color: theme.textColor,
                fontSize: theme.appFontSize.largeSize
              }
            ]}
          >
            {reduxLang.Filters}
          </Text>

          <Text
            style={[
              styles.labelText,
              {
                color: theme.textColor,
                fontSize: theme.appFontSize.mediumSize
              }
            ]}
          >
            {reduxLang.ProductsCategory}
          </Text>

          <View style={styles.recentSearchArrayView}>
            {productsCategoryList.map((value, index) =>
              tagsFun(
                theme,
                productsCategoryList,
                index,
                setProductsCategoryList
              )
            )}
          </View>

          <Text
            style={[
              styles.labelText,
              {
                color: theme.textColor,
                fontSize: theme.appFontSize.mediumSize
              }
            ]}
          >
            {reduxLang.ProductTags}
          </Text>

          <View style={styles.recentSearchArrayView}>
            {productsTagsList.map((value, index) =>
              tagsFun(theme, productsTagsList, index, setProductsTagsList)
            )}
          </View>

          <View style={styles.sliderTextView}>
            <Text
              style={[
                styles.sliderTextValue,
                {
                  color: theme.textColor,
                  fontSize: theme.appFontSize.mediumSize
                }
              ]}
            >
              {"$0"}
            </Text>

            <Text
              style={[
                styles.sliderTextValue,
                styles.sliderTextBold,
                {
                  color: theme.primary,
                  fontSize: theme.appFontSize.mediumSize
                }
              ]}
            >
              {"$" + sliderValue}
            </Text>

            <Text
              style={[
                styles.sliderTextValue,
                {
                  color: theme.textColor,
                  fontSize: theme.appFontSize.mediumSize
                }
              ]}
            >
              {"$1000"}
            </Text>
          </View>

          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1000}
            step={1}
            value={0}
            minimumTrackTintColor={theme.primary}
            maximumTrackTintColor={theme.secondryBackgroundColor}
            thumbTintColor={theme.primary}
            onValueChange={value => setSliderValue(value)}
          />

          <Text
            style={[
              styles.labelText,
              {
                color: theme.textColor,
                fontSize: theme.appFontSize.mediumSize
              }
            ]}
          >
            {reduxLang.Attributes}
          </Text>

          <View style={styles.recentSearchArrayView}>
            {attributes.map((value, index) =>
              attributesFun(theme, attributes, index, setAttributes)
            )}
          </View>

          {attributes[0].isSelected ? (
            <View style={styles.recentSearchArrayView}>
              {colorsAttr.map((value, index) =>
                colorsFun(theme, colorsAttr, index, setColorsAttr)
              )}
            </View>
          ) : null}

          {attributes[1].isSelected ? (
            <View style={styles.recentSearchArrayView}>
              {sizeAttr.map((value, index) =>
                tagsFun(theme, sizeAttr, index, setSizeAttr)
              )}
            </View>
          ) : null}

          {attributes[2].isSelected ? (
            <View style={styles.recentSearchArrayView}>
              {weightAttr.map((value, index) =>
                tagsFun(theme, weightAttr, index, setWeightAttr)
              )}
            </View>
          ) : null}

          <View style={styles.filterBtns}>
            <TouchableOpacity style={styles.clearFilter}>
              <Text
                style={{
                  color: theme.primary,
                  fontSize: theme.appFontSize.mediumSize
                }}
              >
                {reduxLang.ClearFilter}
              </Text>
            </TouchableOpacity>

            <CustomBtn
              onPressFun={() => {}}
              width={WIDTH * 0.3}
              theme={theme}
              title={reduxLang.Filter}
            ></CustomBtn>
          </View>
        </View>
      </Modal>
      {/* //Modal View end*/}

      {/* // main search page */}

      {/* //Search Header */}
      {searchHeader(
        theme,
        navigation,
        reduxLang,
        searchText,
        onChangeSearch,
        addSearchValueFun,
        recentTextArray,
        setModalVisible
      )}

      <View style={styles.selectedFilterText}>
        <Text
          style={[
            styles.selectedTextMargin,
            {
              color: theme.primary,
              fontSize: theme.appFontSize.mediumSize,
              fontFamily: theme.appFontSize.fontFamily
            }
          ]}
        >
          {reduxLang.BestSelling}
        </Text>

        <TouchableOpacity
          style={styles.sortByIconText}
          onPress={() => setModalVisibleSortBy(true)}
        >
          <Text
            style={{
              color: theme.textColor,
              fontSize: theme.appFontSize.mediumSize,
              fontFamily: theme.appFontSize.fontFamily
            }}
          >
            {reduxLang.SortBy}
          </Text>
          <FontAwesome
            style={[
              styles.paddingHori,
              {
                color: theme.secondry,
                fontSize: theme.appFontSize.largeSize
              }
            ]}
            name={"filter"}
          />
        </TouchableOpacity>
      </View>

      {/* //recent Label */}
      {/* {recentSearchLabel(theme, searchText, emptySearchListFun, reduxLang)} */}

      {/* //recentTextArray */}
      {
        // <View style={styles.recentSearchArrayView}>
        //   {recentTextArray.map((value, index) =>
        //     recentText(theme, value, index, onChangeSearch)
        //   )}
        // </View>
      }

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {filteredGallery.map((item, index) => (
          <View key={index}>
            <SearchListCard
              index={index}
              productDetailData={data}
              data={item}
              theme={theme}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  filterText: {
    alignSelf: "center"
  },
  sortByIconText: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end"
  },
  crossIcon: {
    borderLeftWidth: 1
  },
  sliderTextValue: {
    width: 50
  },
  sliderTextBold: {
    fontWeight: "bold"
  },
  sliderTextView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 20,
    paddingBottom: 0,
    paddingTop: 15
  },
  headerSortText: {
    alignSelf: "center",
    marginBottom: 10
  },
  horiPadding: {
    paddingHorizontal: 8
  },
  filterBtns: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center"
  },
  slider: {
    width: "70%",
    alignSelf: "center",
    marginTop: 10
  },
  searchView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  clearFilter: {
    margin: 14,
    padding: 5
  },
  scrollView: {
    flex: 1,
    marginVertical: 4
  },
  paddingHori: {
    paddingHorizontal: 5
  },
  selectedFilterText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 9,
    marginTop: 12
  },
  selectedTextMargin: {
    marginHorizontal: 6
  },
  labelText: {
    padding: 8,
    paddingHorizontal: 15,
    alignSelf: "flex-start"
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
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    padding: 9,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    bottom: 0,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
    position: "absolute",
    paddingBottom: 10
  },
  recentSearchArrayView: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
    paddingTop: 0,
    paddingBottom: 0
  },
  recentSearchTextView: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  sortByTextStyle: {
    padding: 14
  },
  sortByText: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1
  },
  colorsView: {
    borderRadius: 20,
    height: 20,
    width: 20,
    padding: 7,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    margin: Platform.OS === "ios" ? 8.5 : 9.5
  },
  textAttributes: {
    borderWidth: 1,
    marginBottom: 10
  },
  textTouchable: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    padding: 7,
    margin: 5,
    paddingTop: 5,
    paddingBottom: 5
  },
  closeIconView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  searchContainerView: {
    flexDirection: "row",
    width: "100%",
    paddingVertical:
      Platform.OS === "ios"
        ? HEADER_IOS_HEIGHT * 0.1
        : HEADER_ANDROID_HEIGHT * 0.12,
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.16,
    shadowRadius: 3.84,
    elevation: 2,
    paddingHorizontal: 14
  },
  searchTextView: {
    width: WIDTH * 0.85,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    borderRadius: 32,
    borderColor: "gray",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 0.2
  },
  paddingRi: {
    paddingRight: 5
  },
  textInput: {
    padding: Platform.OS === "android" ? 4 : 9,
    textAlign: I18nManager.isRTL ? "right" : "left",
    alignSelf: "center",
    width: "62%"
  }
})

const mapStateToProps = state => ({
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang,
  recentTextArray: state.searchReducer.searchList
})

const mapDispatchToProps = dispatch => ({
  emptySearchListFun: () => dispatch(emptySearchList()),
  addSearchValueFun: value => dispatch(addSearchValue(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
