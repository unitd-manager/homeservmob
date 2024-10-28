import React, { useState } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { HEADER_IOS_HEIGHT, HEADER_ANDROID_HEIGHT, } from "../../components/config"
import ReviewStar from "../reviewStar"
import { HEIGHT } from "../config"
import { useNavigation } from "@react-navigation/native"
import imageBase from "../../constants/imageBase"
import AddtoCartPopUpModal from "../../components/addtoCartPopUpModal"

const CardOne = ({
  data,
  theme,
  // addToCartFun,
  onDelete,
  reduxLang,
  backgroundColor,
  index,
  whishlistTrash,
  productDetailData
}) => {
  const navigation = useNavigation()
  const [addtoCartmodalVisible, setaddtoCartModalVisible] = useState(false)
  const [update, setUpdate] = useState(false)
  const addToCartFun =()=>{

    setaddtoCartModalVisible(!addtoCartmodalVisible);
    setUpdate(!update)
  }

  const discount = data.discount_percentage ? parseFloat(data.discount_percentage) : 0;
    
      const discountAmount = (data.price * discount) / 100;
    
      const discountTotalAmount = (data.price - discountAmount);

      const percentagesym = data.discount_percentage ? "%" : '';


  return (
    <View style={styles.container}>
      <View
        key={index}
        style={[
          styles.touchableOpacity,
          {
            backgroundColor: backgroundColor
              ? backgroundColor
              : theme.secondryBackgroundColor
          }
        ]}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.push("ProductDetail", {
              productId: data,datas:productDetailData
            })
          }
        >
          <Image
            source={{ uri: `${imageBase}${data.images}` }}
            resizeMode={"cover"}
            borderRadius={8}
            style={[
              styles.imageBackground,
              {
                backgroundColor: backgroundColor
                  ? backgroundColor
                  : theme.backgroundImageColor
              }
            ]}
          />
        </TouchableOpacity>

        <View style={styles.productNameView}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%"
            }}
          >
            <Text
              numberOfLines={1}
              style={[
                styles.productNameText,
                styles.bold,
                {
                  color: theme.textColor,
                  fontSize: theme.appFontSize.mediumSize,
                  fontFamily: theme.appFontSize.fontFamily
                }
              ]}
            >
              {data.title}
            </Text>
            <AddtoCartPopUpModal
             productDetailData={data}
            theme={theme}
            reduxLang={reduxLang}
            addtoCartmodalVisible={addtoCartmodalVisible}
            setaddtoCartModalVisible={setaddtoCartModalVisible}
            update={update}
            setUpdate={setUpdate}
      />
            {whishlistTrash ? (
              <TouchableOpacity  onPress={() =>
                onDelete()
              } style={{ zIndex: 3 }}>
                <FontAwesome
                  style={{
                    color: theme.secondry,
                    fontSize: theme.appFontSize.largeSize
                  }}
                  name={"trash"}
                />
              </TouchableOpacity>
            ) : (
              <View />
            )}
          </View>
          <View style={styles.priceRowInnerContainer}>
          <Text
            numberOfLines={1}
            style={[
              {
                color: theme.textColor,
                fontSize: theme.appFontSize.smallSize,
                fontFamily: theme.appFontSize.fontFamily,
                width: "35%"
              }
            ]}
          >
           Rs :{discountTotalAmount}
   
          </Text>
          { data.discount_percentage !==null &&
          <Text
            numberOfLines={1}
            style={[
              // styles.discountPriceText,
              {
                color:'red',
                fontSize: theme.appFontSize.smallSize,
                fontFamily: theme.appFontSize.fontFamily,
                width: "20%",
                textDecorationLine: "line-through",
   

    paddingBottom:
      Platform.OS === "ios"
        ? HEADER_IOS_HEIGHT * 0.05
        : HEADER_ANDROID_HEIGHT * 0.04
              }
            ]}
          >
           {data.price}
          </Text>
  }  
  { data.discount_percentage !==null &&
          <Text
              style={[
               
                {
                  color:'green',
                  fontSize: theme.appFontSize.mediumSize,
                  fontFamily: theme.appFontSize.fontFamily
                }
              ]}
            >
              {data.discount_percentage}{percentagesym}
            </Text>
}
          </View>
          <View style={styles.cartIconContainer}>
            <ReviewStar
              theme={theme}
              counterValue={5}
              starSize={theme.appFontSize.smallSize - 1}
            ></ReviewStar>

            <TouchableOpacity onPress={addToCartFun} style={{ zIndex: 3 }}>
              <FontAwesome
                style={{
                  color: theme.secondry,
                  fontSize: theme.appFontSize.largeSize
                }}
                name={"cart-plus"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    margin: 4
  },
  cartIconContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    flex: 0.5,
    margin: 0,
    marginVertical: 4,
    alignItems: "center"
  },
  productNameText: {
    paddingVertical: 3
  },
  bold: {
    fontWeight: "bold"
  },
  quantity: {
    width: "78%",
    textAlign: "left"
  },
  touchableOpacity: {
    borderRadius: 6,
    width: "100%",
    justifyContent: "center"
  },
  imageBackground: {
    height: HEIGHT * 0.22,
    width: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "transparent"
  },
  priceRowInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 0,
   
  },
  discountPriceText: {
    textDecorationLine: "line-through",
    textAlign: "left",
    paddingHorizontal: 10,
    paddingBottom:
      Platform.OS === "ios"
        ? HEADER_IOS_HEIGHT * 0.05
        : HEADER_ANDROID_HEIGHT * 0.04
  },
  
  productNameView: {
    marginHorizontal: 10,
    alignItems: "flex-start",
    marginVertical: 6
  }
})

export default CardOne
