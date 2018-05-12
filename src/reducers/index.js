import { combineReducers } from "redux";
import { firebaseStateReducer as firebase } from "react-redux-firebase";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";

export default combineReducers({
  routing: routerReducer,
  firebase,
  form: formReducer
});
