import React from "react"
import { StyleSheet, Text, View, Image } from "react-native"

const CategoryThree = ({ name, url, theme,price,priceNet,qtyy }) => {
  
  const discount = priceNet ? parseFloat(priceNet) : 0;
  // const price = parseFloat(price);
  console.log('price',price)
  // Calculate the discount amount from the percentage
  const discountAmount = (price * discount) / 100;

  // Price after applying the discount percentage
  // const priceAfterDiscount = price - discountAmount;

  // Calculate total for the product and add to the running total
 
  const discountTotalAmount = (price - discountAmount);
  console.log('discountTotalAmount',discountTotalAmount)
  const percentagesym = priceNet ? "%" : '';

  return (
    <View
      key={1}
      style={[
        styles.touchableOpacity,
        {
          backgroundColor: theme.primaryBackgroundColor
        }
      ]}
    >
      <Image
        source={url}
        resizeMode={"cover"}
        style={[
          styles.imageBackground,
          {
            backgroundColor: theme.backgroundImageColor
          }
        ]}
      />

      <View style={styles.productNameView}>
        <View style={styles.priceRowInnerContainer}>
          <Text
            style={[
              styles.productPriceText,
              {
                color: theme.textColor,
                fontSize: theme.appFontSize.mediumSize,
                fontFamily: theme.appFontSize.fontFamily
              }
            ]}
          >
           Rs: {discountTotalAmount}
          </Text>

          <Text
            style={[
              styles.discountPriceText,
              {
                color:"red",
                fontSize: theme.appFontSize.smallSize,
                fontFamily: theme.appFontSize.fontFamily
              }
            ]}
          >
            {price}
          </Text>
          <Text
            style={[
              styles.productPriceText,
              {
                color: theme.textColor,
                fontSize: theme.appFontSize.mediumSize,
                fontFamily: theme.appFontSize.fontFamily
              }
            ]}
          >
           {priceNet}{percentagesym}
          </Text>
        </View>
        <Text
          style={[
            styles.productNameText,
            {
              color: theme.textColor,
              fontSize: theme.appFontSize.mediumSize,
              fontFamily: theme.appFontSize.fontFamily
            }
          ]}
          numberOfLines={1}
        >
          {name}
        </Text>

        <Text
          style={[
            styles.productNameText,
            {
              color: theme.secondry,
              fontSize: theme.appFontSize.smallSize,
              fontFamily: theme.appFontSize.fontFamily
            }
          ]}
          numberOfLines={1}
        >
        QTY :{qtyy}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  touchableOpacity: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    margin: 10,
    borderRadius: 6,
    marginTop: 0,
    marginBottom: 0
  },
  priceRowInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    justifyContent: "flex-start"
  },
  productNameText: {
    width: 200,
    paddingBottom: 8,
    textAlign: "left"
  },
  productPriceText: {
    fontWeight: "bold",
    textAlign: "left"
  },
  discountPriceText: {
    textDecorationLine: "line-through",
    textAlign: "left",
    paddingHorizontal: 10
  },
  imageBackground: {
    height: 80,
    width: 85,
    margin: 6,
    marginTop: 10,
    borderRadius: 8
  },
  productNameView: {
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "flex-start"
  }
})

export default CategoryThree
