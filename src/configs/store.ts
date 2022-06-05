import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
  Dispatch,
} from "redux";
import ReduxThunk from "redux-thunk";

import authReducer from "@app/features/Login/data/loginReducer";
import profileReducer from "@app/features/Profile/data/profileReducer";
import { IAuthenticationFlowState } from "@app/features/Login/data/loginTypes";
import { IProfileState } from "@app/features/Profile/data/profileTypes";

export type RootState = {
  auth: IAuthenticationFlowState;
  profile: IProfileState;
};

const appReducer = combineReducers<RootState>({
  auth: authReducer,
  profile: profileReducer,
});

export const store = createStore(appReducer, {}, applyMiddleware(ReduxThunk));

export const dispatchStore = store.dispatch as Dispatch<any>;

export default appReducer;
