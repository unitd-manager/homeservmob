import { ADD_VALUE, SUB_VALUE } from '../actions/actions';
import { ListAction } from '../types/types';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

type initialStateProp = {
  whishList: number;
};

const initialState: initialStateProp = {
  whishList: 0,
};

function whishListReducer(state = initialState, action: ListAction) {
  switch (action.type) {
    case ADD_VALUE:
      state.whishList = state.whishList + action.counter;
      return { ...state };
    case SUB_VALUE:
      state.whishList = state.whishList - action.counter;
      return { ...state };
    default:
      return state;
  }
}

const persistConfig = {
  key: 'whishlist',
  storage: AsyncStorage,
  whitelist: ['counter'], // only navigation will be persisted
};
export default persistReducer(persistConfig, whishListReducer);
