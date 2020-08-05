import PlaceholderService from "../../services/PlaceholderService";
const placeholderService = new PlaceholderService();

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAIL = "GET_USER_FAIL";

export function fetchUser(id) {
  return dispatch => {
    dispatch({
      type: GET_USER_REQUEST,
      payload: id,
    });

    placeholderService
      .getUser(id)
      .then(user => {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: user,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_USER_FAIL,
          error: true,
          payload: new Error("Fetch error"),
        });
      });
  };
}
