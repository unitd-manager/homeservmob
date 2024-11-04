import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  backgroundColor,
  View,
  Image,
  Alert,
  StatusBar
} from "react-native"
import api from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WishlistContext = createContext();

const initialState = { items: [] };

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.wish_list_id !== action.payload.wish_list_id) };
      case 'REMOVE_ITEM_CONTACT':
        return { ...state, items: state.items.filter(item => item.contact_id !== action.payload.contact_id) };
  
      case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.wish_list_id === action.payload.wish_list_id ? { ...item, ...action.payload.updates } : item
        ),
      };
    case 'GET_ITEM_BY_ID':
      return {
        ...state,
        selectedItem: state.items.find(item => item.wish_list_id === action.payload.wish_list_id),
      };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Fetch cart items on mount
  useEffect(async() => {
    
    const fetchWishlistItems = async (id) => {
      try {
        const response = await api.post('/contact/getFavByContactId', { contact_id: id }); 
        console.log('resp of fetchwishlistItems ',response.data.data);
        response.data.data.forEach(element => {
          element.tag = String(element.tag).split(",")
        })
        response.data.data.forEach(el => {
          el.images = String(el.images).split(",")
        })
        dispatch({ type: 'SET_ITEMS', payload: response.data.data });
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    const userData = await AsyncStorage.getItem('USER');
    const user = JSON.parse(userData);
    if (user && user.contact_id) {
    fetchWishlistItems(user.contact_id);}
  }, []); 
  const fetchAllWishlistItems = async (id) => {
    try {
      const response = await api.post('/contact/getFavByContactId', { contact_id: id }); // Replace with your API endpoint
     console.log('resp of fetchAllCartItems ',response.data.data);
     response.data.data.forEach(element => {
      element.tag = String(element.tag).split(",")
    })
    response.data.data.forEach(el => {
      el.images = String(el.images).split(",")
    })
      dispatch({ type: 'SET_ITEMS', payload: response.data.data });
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };
  // Add item
  const addWishlistItem = async (item) => {
    try {
      const response = await api.post('/contact/insertToWishlist', item); 
      // if (response.status === 200) {
             
      //             Alert.alert('Product Add to Wishlist');
      //       return response;
             
    
      //           }// Replace with your API endpoint
      dispatch({ type: 'ADD_ITEM', payload: response.data.data });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // Remove item
  const removeWishlistItem = async (item) => {
    try {
      console.log('item',item);
      await api.post(`/contact/deleteWishlistItem`,{wish_list_id:item.wish_list_id}); // Replace with your API endpoint
      dispatch({ type: 'REMOVE_ITEM', payload: item });
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const removeWishlistItemContact = async (item) => {
    try {
      console.log('item',item);
      await api.post(`/contact/clearWishlistItems`,{contact_id:item.contact_id}); // Replace with your API endpoint
      dispatch({ type: 'REMOVE_ITEM_CONTACT', payload: item });
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };


  // Update item
  const updateWishlistItem = async (updates) => {
    try {
      const response = await api.put(`/orders/updateCartItem`, updates); // Replace with your API endpoint
      dispatch({ type: 'UPDATE_ITEM', payload: { id, updates: response.data } });
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  // Get item by ID (client-side)
  const getWishlistItemById = (id) => {
    const item = state.items.find(item => item.wish_list_id === id);
    dispatch({ type: 'GET_ITEM_BY_ID', payload: { id } });
    return item; // Return the found item
  };

  return (
    <WishlistContext.Provider value={{ wishlist: state.items, addWishlistItem,removeWishlistItemContact, removeWishlistItem, updateWishlistItem, getWishlistItemById,fetchAllWishlistItems }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
