// import { getFirebase } from "react-redux-firebase";

export const REQUEST_SIGNUP = "REQUEST_SIGNUP";
export const FETCH_SIGNUP = "FETCH_SIGNUP";

export const REQUEST_SIGNIN = "REQUEST_SIGNIN";
export const FETCH_SIGNIN = "FETCH_SIGNIN";

export const signup = ({ email, password }) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();

    dispatch({ type: REQUEST_SIGNUP });
    return firebase.createUser({ email, password }, { email }).then(user => {
      return dispatch({ type: FETCH_SIGNUP, payload: user });
    });
  };
};

export const signin = ({ email, password }) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();

    dispatch({ type: REQUEST_SIGNIN });
    return firebase.login({ email, password }).then(user => {
      return dispatch({ type: FETCH_SIGNIN, payload: user });
    });
  };
};
