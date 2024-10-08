import React, { useEffect, useRef, useState } from "react"
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Text
} from "react-native"
import { connect } from "react-redux"
import AddtoCartPopUpModal from "../components/addtoCartPopUpModal"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Card from "../components/cardStyles/cardOne"
import renderFooter from "../components/renderFooter"
import SearchListCard from "../components/searchListCard"

const App = ({ navigation, theme, reduxLang, route }) => {
  let [temp, setTempdata] = useState(
    route.params === undefined
      ? [
          {
            url: require("../images/shirtsTwo/CustomSize43.png"),
            productName: reduxLang.JBL,
            quantity: "120 " + reduxLang.Products
          },
          {
            url: require("../images/shirtsTwo/CustomSize43.png"),
            productName: reduxLang.Sony,
            quantity: "650 " + reduxLang.Products
          },
          {
            url: require("../images/shirtsTwo/CustomSize43.png"),
            productName: reduxLang.Sony,
            quantity: "432 " + reduxLang.Products
          },
          {
            url: require("../images/shirtsTwo/CustomSize43.png"),
            productName: reduxLang.Bose,
            quantity: "678 " + reduxLang.Products
          },
          {
            url: require("../images/shirtsTwo/CustomSize43.png"),
            productName: reduxLang.BeatsbyDre,
            quantity: "789 " + reduxLang.Products
          },
          {
            url: require("../images/shirtsTwo/CustomSize43.png"),
            productName: reduxLang.Skullcandy,
            quantity: "120 " + reduxLang.Products
          },
          {
            url: require("../images/shirtsTwo/CustomSize43.png"),
            productName: reduxLang.Beyerdynamic,
            quantity: "650 " + reduxLang.Products
          },
          {
            url: require("../images/shirtsTwo/CustomSize43.png"),
            productName: reduxLang.AKGAcoustics,
            quantity: "432 " + reduxLang.Products
          },
          {
            url: require("../images/shirtsTwo/CustomSize43.png"),
            productName: reduxLang.Skullcandy,
            quantity: "678 " + reduxLang.Products
          },
          {
            url: require("../images/shirtsTwo/CustomSize43.png"),
            productName: reduxLang.Beyerdynamic,
            quantity: "789 " + reduxLang.Products
          }
        ]
      : route.params.dataImages
  )

  useEffect(() => {
    navigation.setOptions({
      headerTitle: reduxLang.Wishlist,
      headerStyle: {
        backgroundColor: theme.secondryBackgroundColor
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setGridView(pre => !pre)
          }}
        >
          <View>
            <FontAwesome
              style={{
                color: theme.secondry,
                fontSize: theme.appFontSize.largeSize + 4,
                marginHorizontal: 18
              }}
              name={"th-large"}
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

  const [gridView, setGridView] = useState(true)
  let [data, setdata] = useState(temp)

  const [loader, setLoader] = useState(true)
  const [fab, setFab] = useState(false)
  let scrollRef = useRef(null)
  let onEnDReachedCalledDuringMomentum

  const [addtoCartmodalVisible, setaddtoCartModalVisible] = useState(false)

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

  // const handleLoadMore = () => {
  //   if (data.length > 9) {
  //     setFab(true)
  //   }
  //   if (data.length < 20) {
  //     setLoader(true)
  //     const delay = setInterval(function() {
  //       setLoader(false)
  //       let temp = data.concat(data)
  //       setdata(temp)
  //       clearInterval(delay)
  //     }, 3000)
  //   }
  // }

  const deleteLabel = () => (
    <View style={styles.deleteTextView}>
      <Text
        style={{
          color: theme.textColor,
          fontSize: theme.appFontSize.mediumSize
        }}
      >
        {reduxLang.RemoveAll}
      </Text>

      <TouchableOpacity>
        <FontAwesome
          style={{
            color: theme.secondry,
            fontSize: theme.appFontSize.largeSize,
            borderColor: theme.primaryBackgroundColor
          }}
          name={"trash"}
        />
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.primaryBackgroundColor }
      ]}
    >
      {deleteLabel()}

      {/* //fab Button */}

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

      {/* // Modal  start */}

      <AddtoCartPopUpModal
        productDetailData={temp}
        theme={theme}
        reduxLang={reduxLang}
        addtoCartmodalVisible={addtoCartmodalVisible}
        setaddtoCartModalVisible={setaddtoCartModalVisible}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={gridView ? 2 : 1}
        key={gridView ? "h" : "v"}
        columnWrapperStyle={gridView ? styles.colWrapper : null}
        removeClippedSubviews={true}
        legacyImplementation={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={10}
        keyExtractor={(item, index) => index.toString()}
        data={data}
        renderItem={item =>
          !gridView ? (
            <SearchListCard
              icon={"trash"}
              data={item.item}
              productDetailData={temp}
              reduxLang={reduxLang}
              index={item.index}
              theme={theme}
            />
          ) : (
            <Card
              data={item.item}
              productDetailData={temp}
              whishlistTrash={true}
              reduxLang={reduxLang}
              index={item.index}
              theme={theme}
              addToCartFun={() =>
                setaddtoCartModalVisible(!addtoCartmodalVisible)
              }
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
  headingText: {
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingHorizontal: 23,
    paddingVertical: 15
  },
  deleteTextView: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignItems: "center",
    paddingBottom: 10
  },
  fabIcon: {
    paddingBottom: 2
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
  colWrapper: {
    justifyContent: "space-between",
    margin: 5,
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: "transparent"
  }
})

const mapStateToProps = state => ({
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang
})

export default connect(mapStateToProps, null)(App)
