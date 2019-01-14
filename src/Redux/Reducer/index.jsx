import { combineReducers } from "redux";
import { setDemoOne } from "./demoOne";
import { setDemoTwo } from "./demoTwo";

const store = combineReducers({
  setDemoOne,
  setDemoTwo
})
export default store