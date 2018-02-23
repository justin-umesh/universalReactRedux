
import { handleActions } from 'redux-actions';
import initalModel from './model';

const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export const types = {
  FETCH_PRODUCTS,
};

export const fetchProducts = () => async (dispatch, getState, api) => {
  const res = await api.post('/pets');
  console.log('fetch product========', res.data.body);
  dispatch({
    type: `${types.FETCH_PRODUCTS}_FULFILLED`,
    payload: res.data.body,
  });
};

export const actions = {
  fetchProducts,
};

export const update = handleActions({

  [`${types.FETCH_PRODUCTS}_PENDING`]: state => ({
    ...state,
    isPending: true,
  }),

  [`${types.FETCH_PRODUCTS}_FULFILLED`]: (state, { payload }) => ({
    ...state,
    isPending: false,
    product: payload,
  }),

  [`${types.FETCH_PRODUCTS}_REJECTED`]: (state, { payload }) => ({
    ...state,
    isPending: false,
    error: payload,
  }),

}, initalModel);
