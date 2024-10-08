import React from "react"
import { StyleSheet, View } from "react-native"
import { connect } from "react-redux"
import CardOne from "./cardOne"
import CardTwo from "./cardTwo"
import CardThree from "./cardThree"
import CardFour from "./cardFour"
import CardFive from "./cardFive"
import CardSix from "./cardSix"
import CardSeven from "./cardSeven"
import CardEight from "./cardEight"
import CardNine from "./cardNine"
import CardTen from "./cardTen"

const card = ({
  data,
  theme,
  addToCartFun,
  index,
  whishlistTrash,
  cardStyle,
  productDetailData,
  reduxLang
}) => {
  return (
    <View style={[styles.container, { backgroundColor: "transparent" }]}>
      {cardStyle === 1 ? (
        <CardOne
          data={data}
          whishlistTrash={whishlistTrash}
          index={index}
          theme={theme}
          productDetailData={productDetailData}
          addToCartFun={addToCartFun}
        />
      ) : cardStyle === 2 ? (
        <CardTwo
          data={data}
          index={index}
          productDetailData={productDetailData}
          theme={theme}
        />
      ) : cardStyle === 3 ? (
        <CardThree
          data={data}
          index={index}
          productDetailData={productDetailData}
          theme={theme}
          addToCartFun={addToCartFun}
        />
      ) : cardStyle === 4 ? (
        <CardFour
          data={data}
          index={index}
          productDetailData={productDetailData}
          theme={theme}
        />
      ) : cardStyle === 5 ? (
        <CardFive
          data={data}
          index={index}
          productDetailData={productDetailData}
          theme={theme}
          addToCartFun={addToCartFun}
        />
      ) : cardStyle === 6 ? (
        <CardSix
          data={data}
          reduxLang={reduxLang}
          index={index}
          productDetailData={productDetailData}
          theme={theme}
          addToCartFun={addToCartFun}
        />
      ) : cardStyle === 7 ? (
        <CardSeven
          data={data}
          reduxLang={reduxLang}
          index={index}
          productDetailData={productDetailData}
          theme={theme}
          addToCartFun={addToCartFun}
        />
      ) : cardStyle === 8 ? (
        <CardEight
          data={data}
          index={index}
          productDetailData={productDetailData}
          theme={theme}
        />
      ) : cardStyle === 9 ? (
        <CardNine
          data={data}
          index={index}
          productDetailData={productDetailData}
          theme={theme}
          addToCartFun={addToCartFun}
        />
      ) : cardStyle === 10 ? (
        <CardTen
          data={data}
          index={index}
          productDetailData={productDetailData}
          theme={theme}
          addToCartFun={addToCartFun}
        />
      ) : (
        <CardOne
          data={data}
          index={index}
          productDetailData={productDetailData}
          theme={theme}
          addToCartFun={addToCartFun}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const mapStateToProps = state => ({
  theme: state.configReducer.theme,
  cardStyle: state.configReducer.cardStyle,
  reduxLang: state.configReducer.lang
})

export default connect(mapStateToProps, null)(card)
