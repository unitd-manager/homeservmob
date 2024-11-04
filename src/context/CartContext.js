import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';
import api from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

const initialState = { items: [] };

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.basket_id !== action.payload.basket_id) };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.basket_id === action.payload.basket_id ? { ...item, ...action.payload.updates } : item
        ),
      };
    case 'GET_ITEM_BY_ID':
      return {
        ...state,
        selectedItem: state.items.find(item => item.id === action.payload.id),
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Fetch cart items on mount
  useEffect(async() => {
    
    const fetchCartItems = async (id) => {
      try {
        const response = await api.post('/orders/getBasket', { contact_id: id }); // Replace with your API endpoint
        
        dispatch({ type: 'SET_ITEMS', payload: response.data.data });
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    const userData = await AsyncStorage.getItem('USER');
    const user = JSON.parse(userData);
    if (user && user.contact_id) {
    fetchCartItems(user.contact_id);}
  }, []);
  const fetchAllCartItems = async (id) => {
    try {
      const response = await api.post('/orders/getBasket', { contact_id: id }); // Replace with your API endpoint
   
      dispatch({ type: 'SET_ITEMS', payload: response.data.data });
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };
  // Add item
  const addItem = async (item) => {
    try {
      const response = await api.post('/orders/insertbasketAddCart', item); // Replace with your API endpoint
      dispatch({ type: 'ADD_ITEM', payload: response.data });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // Remove item
  const removeItem = async (item) => {
    try {
      await api.post(`/orders/deleteBasket`,{basket_id:item.basket_id}); // Replace with your API endpoint
      dispatch({ type: 'REMOVE_ITEM', payload: item });
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // Update item
  const updateItem = async (updates) => {
    try {
      const response = await api.post(`/orders/updateCartItem`, updates); // Replace with your API endpoint
      dispatch({ type: 'UPDATE_ITEM', payload: { basket_id, updates: response.data } });
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  // Get item by ID (client-side)
  const getItemById = (id) => {
    const item = state.items.find(item => item.id === id);
    dispatch({ type: 'GET_ITEM_BY_ID', payload: { id } });
    return item; // Return the found item
  };

  return (
    <CartContext.Provider value={{ cart: state.items, addItem, removeItem, updateItem, getItemById,fetchAllCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
