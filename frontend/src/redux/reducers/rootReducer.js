import { combineReducers } from 'redux';
import notesReducer from './notesReducer';
import buyerReducer from './buyerReducer';
import sellerReducer from './sellerReducer';

export default combineReducers({
  notesReducer,
  buyerReducer,
  sellerReducer,
}); 

