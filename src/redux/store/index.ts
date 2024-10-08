import { createStore, combineReducers } from 'redux';
import { persistStore } from 'redux-persist';
import configReducer from '../reducers/reducers';
import whishListReducer from '../reducers/whishListReducer';
import searchReducer from '../reducers/searchReducer';

const Cr = combineReducers({
  configReducer,
  whishListReducer,
  searchReducer
});

let store: any = createStore(Cr);
let persistor = persistStore(store);
export { store, persistor };
