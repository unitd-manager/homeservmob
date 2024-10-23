import React, { useLayoutEffect,useEffect, useRef, useState } from "react"
import {
  I18nManager,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  StatusBar
} from "react-native"
import { connect } from "react-redux"
import { useRoute } from "@react-navigation/native"
import AddtoCartPopUpModal from "../components/addtoCartPopUpModal"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons"
import SearchListCard from "../components/searchListCard"
import CustomBtn from "../components/customBtn"
import Slider from "@react-native-community/slider"
import renderFooter from "../components/renderFooter"
import Card from "../components/cardStyles/card"
import { WIDTH } from "../components/config"
import api from "../constants/api"
import CardOne from "../components/cardStyles/cardOne"

const header = (
  theme,
  navigation,
  reduxLang,
  gridView,
  setGridView,
  setModalVisibleSortBy,
  recentTextArray,
  setModalVisible,
  routeName
) => (
  <View
    style={[
      styles.searchContainerView,
      {
        backgroundColor: theme.primary
      }
    ]}
  >
    {routeName === "ShopScreen" ? (
      <View style={styles.paddingRi}>
        <Text
          style={{
            color: theme.primaryTextColor,
            fontSize: theme.appFontSize.largeSize,
            fontFamily: theme.appFontSize.fontFamily,
            fontWeight: "bold"
          }}
        >
          {reduxLang.Shop}
        </Text>
      </View>
    ) : (
      <TouchableOpacity
        style={[styles.paddingRi, styles.backIconStyle]}
        onPress={() => navigation.pop()}
      >
        <Ionicons
          style={[
            styles.backIcon,
            {
              color: theme.primaryTextColor,
              fontSize: theme.appFontSize.largeSize + 6
            }
          ]}
          name={I18nManager.isRTL ? "arrow-forward" : "arrow-back"}
        />
        <Text
          style={{
            color: theme.primaryTextColor,
            fontSize: theme.appFontSize.largeSize,
            fontFamily: theme.appFontSize.fontFamily,
            fontWeight: "bold"
          }}
        >
          {reduxLang.Shop}
        </Text>
      </TouchableOpacity>
    )}

    <View style={[styles.headerRow]}>
      <TouchableOpacity
        style={[styles.horiPadding, styles.sortByIconText]}
        onPress={() => setModalVisibleSortBy(true)}
      >
        <Ionicons
          style={[
            styles.paddingHori,
            {
              color: theme.primaryTextColor,
              fontSize: theme.appFontSize.largeSize + 8
            }
          ]}
          name={"repeat-outline"}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons
          style={[
            styles.horiPadding,
            styles.sortByIconText,
            {
              color: theme.primaryTextColor,
              fontSize: theme.appFontSize.largeSize + 8
            }
          ]}
          name={"options-outline"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.horiPadding, styles.sortByIconText]}
        onPress={() => setGridView(!gridView)}
      >
        <Ionicons
          style={[
            styles.paddingHori,
            {
              color: theme.primaryTextColor,
              fontSize: theme.appFontSize.largeSize + 4
            }
          ]}
          name={!gridView ? "grid-outline" : "tablet-landscape-outline"}
        />
      </TouchableOpacity>
    </View>
  </View>
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

const App = ({
  navigation,
  theme,
  reduxLang,
  recentTextArray,
  addSearchValueFun,
  emptySearchListFun
}) => {
  // Header Settings
  const route = useRoute()
  const { categoryIds } = route.params;
 

  useEffect(() => {
    navigation.setOptions({
      headerTitle: reduxLang.Shop,
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

  ////////
  const [categories, setCategories] = useState([])

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
  
 
  const [data, setdata] = useState(1)

  const categoryTitle =(categoryId)=>{
  
 

    if(categoryId === '0'){
      api
      .get("/product/getAllProducts")
      .then(res => {
        res.data.data.forEach(element => {
          element.title = String(element.title).split(",")
        
          
        })
        res.data.data.forEach(el => {
          el.images = String(el.images).split(",")
          
        })
        setdata(res.data.data)
        
      })
      .catch(err => {
        console.log("error", err)
      })
 
    }else{
      api
      .post("/category/getProductByCategory", { category_id:categoryId })
      .then(res => {
        setdata(res.data.data)
        
      })
      .catch(err => {
        console.log(err)
      })
     
 
    }
   
  }


  useLayoutEffect(() => {
    
    categoryTitle(categoryIds)
  }, [])
  const [loader, setLoader] = useState(false)
  const [fab, setFab] = useState(false)
  let scrollRef = useRef(null)
  let onEnDReachedCalledDuringMomentum

  // const [addtoCartmodalVisible, setaddtoCartModalVisible] = useState(false)
  const [item, setItem] = useState()
  const handleScroll = event => {
    if (
      fab &&
      event.nativeEvent.contentOffset.y >= 0 &&
      event.nativeEvent.contentOffset.y < 300
    ) {
      setFab(false)
    }
  }

  const onEndReached = () => {
    // handleLoadMore()
    onEnDReachedCalledDuringMomentum = true
  }

  

  const [selectedTab, setSelectedTab] = React.useState(categoryIds)

  const [modalVisible, setModalVisible] = useState(false)
  const [gridView, setGridView] = useState(true)

  const [modalVisibleSortBy, setModalVisibleSortBy] = useState(false)

  const [productsCategoryList, setProductsCategoryList] = useState([
    { name: "Men", isSelected: false },
    { name: "Women", isSelected: false },
    { name: "T-Shirts", isSelected: false },
    { name: "Jackets", isSelected: false },
    { name: "Bags", isSelected: false },
    { name: "Posters", isSelected: false },
    { name: "Uncategorized", isSelected: false }
  ])

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
  const [statusBar, setStatusBar] = useState(theme.primary)
  const [statusBarStyle, setStatusBarStyle] = useState("light-content")

  useEffect(() => {
    return () => {
      setStatusBar(theme.StatusBarColor)
      setStatusBarStyle(theme.barStyle)
    }
  }, [])
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
      {fab ? (
        <TouchableOpacity
          style={[
            styles.fabStyle,
            {
              backgroundColor: theme.primary
            }
          ]}
          onPress={() => {
            scrollRef?.current?.scrollToOffset({
              animated: true,
              offset: 0
            })
            setFab(false)
          }}
        >
          <FontAwesome
            name={"chevron-up"}
            style={[
              styles.fabIcon,
              {
                color: theme.secondryBackgroundColor,
                fontSize: theme.appFontSize.largeSize
              }
            ]}
          />
        </TouchableOpacity>
      ) : null}
      <StatusBar barStyle={statusBarStyle} backgroundColor={statusBar} />

      {/* <StatusBar backgroundColor={theme.primary} /> */}
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

      {/* <AddtoCartPopUpModal
        productDetailData={item}
        theme={theme}
        reduxLang={reduxLang}
        addtoCartmodalVisible={addtoCartmodalVisible}
        setaddtoCartModalVisible={setaddtoCartModalVisible}
      /> */}

      {/* //Search Header */}
      {header(
        theme,
        navigation,
        reduxLang,
        gridView,
        setGridView,
        setModalVisibleSortBy,
        recentTextArray,
        setModalVisible,
        route.name
      )}

      <View
        style={[
          styles.listViewStyle,
          {
            backgroundColor: theme.primary
          }
        ]}
      >
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={categories}
          horizontal
          style={{
            borderColor: theme.textColor,
            backgroundColor: theme.primary
          }}
          keyExtractor={(items, index) => index.toString()}
          renderItem={item => (
            <TouchableOpacity
              onPress={() => {
                
               
                categoryTitle(item.item.category_id)
                if (selectedTab !== item.item.category_id) {
                  
                  setdata(data)
                  const delay = setInterval(function() {
                    // setdata(data)
                     clearInterval(delay)
                    categoryTitle(item.item.category_id)
                  }, 2000)
                  setSelectedTab(item.item.category_id)
                 
                  
                }
              }}
              style={[
                styles.selectedTabStyles,
                { backgroundColor: theme.primary }
              ]}
            >
              <Text
                style={[
                  styles.horiCategoryText,
                  {
                    color:
                      selectedTab === item.item.category_id
                        ? theme.primaryTextColor
                        : theme.primaryDark,
                    fontSize: theme.appFontSize.largeSize,
                    fontFamily: theme.appFontSize.fontFamily,
                    fontWeight: selectedTab === item.item.category_id ? "bold" : "normal"
                  }
                ]}
              >
                {item.item.category_title}
              </Text>
              {selectedTab === item.item.category_id ? (
                <View
                  style={[
                    styles.selectedBorder,
                    { backgroundColor: theme.primaryTextColor }
                  ]}
                />
              ) : (
                <View />
              )}
            </TouchableOpacity>
          )}
        />
      </View>

      {/* // product loader */}

      {renderFooter(theme, data.length === 0)}

      <FlatList
        style={styles.flatListStyle}
        showsVerticalScrollIndicator={false}
        numColumns={gridView ? 2 : 1}
        keyExtractor={(item, index) => index.toString()}
        data={data}
        key={gridView ? "h" : "v"}
        columnWrapperStyle={gridView ? styles.colWrapper : null}
        renderItem={item =>
          !gridView ? (
            <SearchListCard
              productDetailData={data}
              data={item.item}
              reduxLang={reduxLang}
              index={item.index}
              theme={theme}
            />
          ) : (
            <CardOne
              productDetailData={data}
              data={item.item}
              reduxLang={reduxLang}
              index={item.index}
              theme={theme}
              // addToCartFun={() => {
              //   setItem(item.item);
              //   setaddtoCartModalVisible(!addtoCartmodalVisible);
              // }}
            />
          )
        }
        ref={scrollRef}
        ListFooterComponent={renderFooter(theme, loader)}
        onScroll={handleScroll}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        onMomentumScrollBegin={() => {
          onEnDReachedCalledDuringMomentum = false
        }}
      />
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
  horiCategoryText: {
    paddingHorizontal: 6
  },
  sortByIconText: {
    flexDirection: "row",
    alignItems: "center"
  },
  selectedTabStyles: {
    marginHorizontal: 3,
    padding: 5
  },
  selectedBorder: {
    padding: 2,
    borderRadius: 18,
    marginVertical: 8
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
  listViewStyle: {
    paddingBottom: 100,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60
  },
  flatListStyle: {
    marginTop: -100
  },
  backIcon: {
    paddingRight: 10
  },
  fabStyle: {
    zIndex: 5,
    position: "absolute",
    right: 25,
    bottom: 50,
    alignItems: "center",
    height: 46,
    width: 46,
    borderRadius: 400,
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  fabIcon: {
    paddingBottom: 2
  },
  clearFilter: {
    margin: 14,
    padding: 5
  },
  paddingHori: {
    paddingHorizontal: 5
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
  backIconStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  colWrapper: {
    justifyContent: "space-between",
    margin: 5,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: "transparent"
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
  searchContainerView: {
    flexDirection: "row",
    width: "100%",
    height: 54,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  paddingRi: {
    paddingRight: 5
  }
})

const mapStateToProps = state => ({
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang,
  recentTextArray: state.searchReducer.searchList
})

export default connect(mapStateToProps, null)(App)
