import React, { useEffect, useRef, useState } from "react"
import {
  Platform,
  Dimensions,
  StyleSheet,
  FlatList,
  View,
  Image,
  Animated,
  Modal,
  TouchableWithoutFeedback,
  I18nManager
} from "react-native"
import ImageViewer from "react-native-image-zoom-viewer"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { TouchableOpacity } from "react-native-gesture-handler"

const WIDTH = Dimensions.get("window").width
const HEIGHT = WIDTH * 1

function infiniteScroll(dataList, scrollRef) {
  const numberOfData = dataList.length
  let scrolValue = 0,
    scrolled = 0
  setInterval(function() {
    scrolled++
    if (scrolled < numberOfData) {
      if (Platform.OS === "ios") scrolValue = scrolValue + WIDTH
      else {
        scrolValue = scrolValue + WIDTH
      }
    } else {
      scrolValue = 0
      scrolled = 0
    }
    scrollRef?.current?.scrollToOffset({ animated: true, offset: scrolValue })
  }, 3000)
}

const bannerOne = ({ theme, images, autoMove }) => {
  const tempArray = []
  images.forEach((element, index) => {
    if (index <= 1) {
      tempArray.push(element)
    }
  })

  const [dataList, setDataList] = useState(tempArray)

  let imageList = useState([])[0]

  let scrollRef = useRef(null)
  const scrollX = useState(new Animated.Value(0))[0]
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  let position = Animated.divide(scrollX, WIDTH)

  useEffect(() => {
    let temp = 0
    dataList.map(imageUrl => {
      imageList.push(
        Object.create({
          url: Image.resolveAssetSource(imageUrl.url).uri.toString(),
          id: temp
        })
      )
      temp++
    })

    setDataList(dataList)
    if (scrollRef !== undefined && scrollRef !== null && autoMove)
      infiniteScroll(dataList, scrollRef)
  }, [imageList])

  return (
    <View>
      {/* image zoom modal */}

      <Modal visible={modalVisible} transparent>
        <ImageViewer
          index={selectedIndex}
          imageUrls={imageList}
          enableSwipeDown
          onSwipeDown={() => setModalVisible(!modalVisible)}
          renderHeader={() => (
            <TouchableWithoutFeedback
              style={[
                styles.modalCrossHeight,
                {
                  width: WIDTH,
                  backgroundColor: theme.textColor
                }
              ]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <FontAwesome
                onPress={() => setModalVisible(!modalVisible)}
                name={"close"}
                style={[
                  styles.crossIcon,
                  {
                    width: WIDTH,
                    fontSize: theme.appFontSize.largeSize,
                    color: theme.primaryTextColor
                  }
                ]}
              />
            </TouchableWithoutFeedback>
          )}
        />
      </Modal>

      {/* main image slider */}
      <FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        ref={scrollRef}
        data={dataList}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        horizontal={true}
        bounces={false}
        style={styles.scrollView}
        scrollEnabled
        snapToAlignment="center"
        scrollEventThrottle={16}
        decelerationRate={"fast"}
        keyExtractor={(item, index) => "key" + index}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedIndex(index)
                setModalVisible(!modalVisible)
              }}
            >
              <Image
                key={index}
                resizeMode={"cover"}
                source={item.url}
                style={[
                  styles.bannerImage,
                  {
                    backgroundColor: theme.backgroundImageColor
                  }
                ]}
              />
            </TouchableOpacity>
          )
        }}
      />

      {/* //donts container */}

      <View style={styles.dotContainer}>
        {tempArray.map((img, index) => {
          let opacity = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp"
          })
          return (
            <Animated.View
              key={index}
              style={[
                styles.indicator,
                {
                  opacity,
                  backgroundColor: theme.primaryTextColor
                }
              ]}
            ></Animated.View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    width: WIDTH,
    height: HEIGHT,
    alignSelf: "center"
  },
  crossIcon: {
    height: 100,
    left: 0,
    right: 0,
    paddingLeft: !I18nManager.isRTL ? 20 : 20,
    paddingRight: !I18nManager.isRTL ? 2 : 20,
    paddingTop: !I18nManager.isRTL ? (Platform.OS === "ios" ? 70 : 70) : 70,
    zIndex: 3,
    position: "absolute",
    top: 0,
    backgroundColor: "transparent"
  },
  indicator: {
    height: 6,
    width: 6,
    marginHorizontal: 3,
    borderRadius: 6,
    marginVertical: 2
  },
  modalCrossHeight: {
    height: 200,
    paddingLeft: 80
  },
  bannerImage: {
    width: Platform.OS === "ios" ? WIDTH : WIDTH,
    height: HEIGHT
  },
  dotContainer: {
    position: "absolute",
    bottom: 15,
    right: 15,
    transform: [{ rotateX: "180deg" }],
    backgroundColor: "rgba(1, 1, 1, 0.3)",
    padding: 1,
    paddingBottom: 3,
    paddingTop: 3,
    borderRadius: 12
  }
})

export default bannerOne
