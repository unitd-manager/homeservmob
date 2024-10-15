import React , { useRef, useState, useEffect,useLayoutEffect }from "react"
import { StyleSheet,Alert, Text, View, TouchableOpacity, Image } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import imageBase from "../constants/imageBase"
import api from "../constants/api"

const CategoryThree = ({
  data,
  theme,
  index,
  backgroundColor,
  icon,
  productDetailData
}) => {
  const navigation = useNavigation()
  const [user, setUserData] = useState();

  const getUser = async () => {
    let userData = await AsyncStorage.getItem('USER');
    userData = JSON.parse(userData);
    setUserData(userData);
  };

  const contactId = user ? user.contact_id : null;


  useEffect(() => {
    getUser();
  }, [contactId]);

  const Insert = () => {
    // if (contactId) {
    //     Alert.alert('Please fill in all fields');
    //     return;
    // }
    
    
    const wishData = {
        contact_id: user.contact_id,
        product_id:data.product_id, 
    };
    console.log('wishData',wishData)
    console.log('datafromProduct',data.product_id)
    api
        .post('/contact/insertToWishlist', wishData)
        .then(response => {
            if (response.status === 200) {

             Alert.alert('Product Add to Wishlist');

            } else {
                console.error('Error');
            }
        })
        .catch(error => {
          
            console.error('Error:', error);
        }

        );

};
  return (
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
          navigation.navigate("Wishlist", {
            dataImages: productDetailData
          })
        }
      >
        <Image
           source={{ uri: `${imageBase}${data.images}` }}
          resizeMode={"contain"}
          style={[
            styles.imageBackground,
            {
              backgroundColor: theme.backgroundImageColor
            }
          ]}
        />
      </TouchableOpacity>
      <View style={styles.productNameView}>
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
          {data.title}
        </Text>

        <Text
          style={[
            styles.productCountText,
            {
              color: theme.primary,
              fontSize: theme.appFontSize.smallSize + 1,
              fontFamily: theme.appFontSize.fontFamily
            }
          ]}
        >
        Rs :{data.price}
        </Text>
      </View>
      <TouchableOpacity style={styles.heartIcon}  onPress={() => {
              Insert()
            }} >
        <FontAwesome
          style={{
            color: theme.secondry,
            fontSize: icon
              ? theme.appFontSize.largeSize
              : theme.appFontSize.mediumSize
          }}
          name={icon ? icon : "heart"}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  touchableOpacity: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    margin: 10,
    borderRadius: 6,
    marginTop: 5,
    marginBottom: 5,
    elevation: 0.2,
    shadowColor: "#000",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 1
  },
  productNameText: {
    width: 200,
    paddingBottom: 3,
    textAlign: "left"
  },
  heartIcon: {
    paddingHorizontal: 8,
    position: "absolute",
    right: 5,
    top: 12
  },
  productCountText: {
    paddingTop: 3,
    paddingBottom: 8
  },
  imageBackground: {
    height: 90,
    width: 92,
    margin: 6,
    borderRadius: 8
  },
  productNameView: {
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 10,
    alignSelf: "center"
  }
})

export default CategoryThree
