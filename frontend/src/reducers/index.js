import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import themeReducer from "./themeReducer";

const reducer = combineReducers({
	user: userReducer,
	theme: themeReducer,
});

const store = configureStore({
	reducer,
});

export default store;
