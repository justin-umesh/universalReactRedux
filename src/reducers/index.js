import { combineReducers } from 'redux';
import { update as home } from '../routes/home/update';
import { update as product } from '../routes/product/update';

export default combineReducers({
  home,
  product,
});
