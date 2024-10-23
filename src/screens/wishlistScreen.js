import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { connect } from "react-redux";
import AddtoCartPopUpModal from "../components/addtoCartPopUpModal";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Card from "../components/cardStyles/cardOne";
import renderFooter from "../components/renderFooter";
import AsyncStorage from "@react-native-async-storage/async-storage"
import SearchListCard from "../components/searchListCard";
import api from "../constants/api";
import { useWishlist } from "../context/WishlistContext";

const App = ({ navigation, theme, reduxLang, route }) => {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState();
  const [loader, setLoader] = useState(true);
  const [fab, setFab] = useState(false);
  const [addtoCartmodalVisible, setaddtoCartModalVisible] = useState(false);
  const [gridView, setGridView] = useState(true);
  const scrollRef = useRef(null);

const{fetchAllWishlistItems,wishlist}=useWishlist()

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      const userData = await AsyncStorage.getItem('USER');
      const user = JSON.parse(userData);
      setUserData(user);
      if (user && user.contact_id) {
        fetchAllWishlistItems(user.contact_id)
        
        
      }
      
    };

    fetchData();
    navigation.setOptions({
      headerTitle: reduxLang.Wishlist,
      headerStyle: {
        backgroundColor: theme.secondryBackgroundColor,
      },
      headerTintColor: theme.textColor,
      headerRight: () => (
        <TouchableOpacity onPress={() => setGridView((prev) => !prev)}>
          <FontAwesome
            style={{
              color: theme.secondry,
              fontSize: theme.appFontSize.largeSize + 4,
              marginHorizontal: 18,
            }}
            name={"th-large"}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, reduxLang, theme]);

  const handleDelete = async (id) => {
    api
    .post("/contact/deleteWishlistItem",{wish_list_id:id})
    .then(res => {      
      console.log('wishlists',res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  };
console.log('wishlist',wishlist);
  const clearAll = async () => {
    api
    .post("/contact/clearWishlistItems",{contact_id:userData.contact_id})
    .then(res => {      
      console.log('wishlists',res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  };

  const deleteLabel = () => (
    <View style={styles.deleteTextView}>
      <Text
        style={{
          color: theme.textColor,
          fontSize: theme.appFontSize.mediumSize,
        }}
      >
        {reduxLang.RemoveAll}
      </Text>
      <TouchableOpacity onPress={clearAll()}>
        <FontAwesome
          style={{
            color: theme.secondry,
            fontSize: theme.appFontSize.largeSize,
            borderColor: theme.primaryBackgroundColor,
          }}
          name={"trash"}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.primaryBackgroundColor },
      ]}
    >
      {deleteLabel()}

      {fab && (
        <TouchableOpacity
          style={[
            styles.fabStyle,
            {
              backgroundColor: theme.primary,
            },
          ]}
          onPress={() => {
            scrollRef?.current?.scrollToOffset({ animated: true, offset: 0 });
            setFab(false);
          }}
        >
          <FontAwesome
            name={"chevron-up"}
            style={[
              styles.fabIcon,
              {
                color: theme.secondryBackgroundColor,
                fontSize: theme.appFontSize.largeSize,
              },
            ]}
          />
        </TouchableOpacity>
      )}

      <AddtoCartPopUpModal
        productDetailData={data}
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
        keyExtractor={(item) => item?.id?.toString()} // Adjust according to your data structure
        data={wishlist}
        renderItem={({ item }) =>
          !gridView ? (
            <SearchListCard
              icon={"trash"}
              data={item}
              handleDelete={()=>handleDelete()} // Pass delete function to child component if needed
              reduxLang={reduxLang}
              theme={theme}
            />
          ) : (
            <Card
              data={item}
              whishlistTrash={true}
              reduxLang={reduxLang}
              theme={theme}
              addToCartFun={() => setaddtoCartModalVisible(!addtoCartmodalVisible)}
              onDelete={() => handleDelete(item.wish_list_id)} // Call delete function
            />
          )
        }
        ref={scrollRef}
        ListFooterComponent={renderFooter(theme, loader)}
        onScroll={(event) => {
          if (fab && event.nativeEvent.contentOffset.y >= 0 && event.nativeEvent.contentOffset.y < 300) {
            setFab(false);
          }
        }}
        onEndReached={() => {
          // Implement pagination or load more data if needed
          onEnDReachedCalledDuringMomentum = true;
        }}
        onEndReachedThreshold={0.3}
        onMomentumScrollBegin={() => {
          onEnDReachedCalledDuringMomentum = false;
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deleteTextView: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignItems: "center",
    paddingBottom: 10,
  },
  fabIcon: {
    paddingBottom: 2,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  colWrapper: {
    justifyContent: "space-between",
    margin: 5,
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: "transparent",
  },
});

const mapStateToProps = (state) => ({
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang,
});

export default connect(mapStateToProps, null)(App);
