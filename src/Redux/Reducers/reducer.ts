import { combineReducers } from "redux";
import { UserSlice } from "../Slices/user.slice";

/**COMBINE ALL REDUCERS */
export const reducers = combineReducers({
  user: UserSlice.reducer,
});
