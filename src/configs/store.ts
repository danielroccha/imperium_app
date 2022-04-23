import {
    legacy_createStore as createStore,
    applyMiddleware,
    combineReducers,
    Dispatch,
} from "redux";
import ReduxThunk from "redux-thunk";

import auth from "@app/features/Login/data/login-reducer";
import { IAuthenticationFlowState } from "@app/features/Login/data/login-types";

export type RootState = {
    auth: IAuthenticationFlowState;
};

const appReducer = combineReducers<RootState>({
    auth,
});

export const store = createStore(appReducer, {}, applyMiddleware(ReduxThunk));

export const dispatchStore = store.dispatch as Dispatch<any>;

export default appReducer;
