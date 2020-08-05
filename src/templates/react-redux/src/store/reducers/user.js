import {
  GET_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
} from "../actions/user";

const initialState = {
  error: null,
  isLoading: true,
  user: null,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { ...state, isLoading: true, error: null };
    case GET_USER_SUCCESS:
      return { ...state, isLoading: false, user: action.payload };
    case GET_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    default:
      return state;
  }
}
