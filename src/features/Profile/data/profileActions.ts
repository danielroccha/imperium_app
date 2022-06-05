import { Action, Dispatch } from "redux";

import IProfileModel from "@app/features/Profile/domain/models/IProfileModel";
import {
  LOADING_PROFILE,
  PROFILE,
} from "@app/features/Profile/data/profileTypes";

export const setLoadingProfileAction =
  (isLoading: boolean) => (dispatch: Dispatch<Action>) => {
    dispatch({ type: LOADING_PROFILE, payload: isLoading });
  };

export const setProfileAction =
  (profile: IProfileModel) => (dispatch: Dispatch<Action>) => {
    dispatch({ type: PROFILE, payload: profile });
  };
