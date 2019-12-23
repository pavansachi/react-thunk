import { createStore, applyMiddleware } from "redux";
import asyncReducer from "./reducers/User";
import thunk from "redux-thunk";
import axios from "axios";

const store = createStore(asyncReducer, applyMiddleware(thunk.withExtraArgument(axios)));

export default store;