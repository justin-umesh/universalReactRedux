
import { handleActions } from 'redux-actions';
import initalModel from './model';

const FETCH_TODOS = 'FETCH_TODOS';

export const types = {
  FETCH_TODOS,
};

export const fetchTodos = () => async (dispatch, getState, api) => {
  const res = await api.get('/pets');
  dispatch({
    type: `${types.FETCH_TODOS}_FULFILLED`,
    payload: res.data.body,
  });
};

export const actions = {
  fetchTodos,
};

export const update = handleActions({

  [`${types.FETCH_TODOS}_PENDING`]: state => ({
    ...state,
    isPending: true,
  }),

  [`${types.FETCH_TODOS}_FULFILLED`]: (state, { payload }) => ({
    ...state,
    isPending: false,
    todos: payload,
  }),

  [`${types.FETCH_TODOS}_REJECTED`]: (state, { payload }) => ({
    ...state,
    isPending: false,
    error: payload,
  }),

}, initalModel);
