import { ADD_SEARCH_VALUE, EMPTY_SEARCH_LIST } from '../actions/actions';
import { searchList } from '../types/types';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

type initialStateProp = {
  searchList: string[];
};

const initialState: initialStateProp = {
  searchList: ['Shirt'],
};

function searchListReducer(state = initialState, action: searchList) {
  switch (action.type) {
    case ADD_SEARCH_VALUE:
      state.searchList = [...state.searchList, action.value]
      return { ...state };
    case EMPTY_SEARCH_LIST:
      state.searchList = [];
      return { ...state };
    default:
      return state;
  }
}

const persistConfig = {
  key: 'searchList',
  storage: AsyncStorage,
  whitelist: ['searchList'], // only navigation will be persisted
};
export default persistReducer(persistConfig, searchListReducer);
