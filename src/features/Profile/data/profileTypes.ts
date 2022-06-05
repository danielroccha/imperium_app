import IProfileModel from "@app/features/Profile/domain/models/IProfileModel";

export const PROFILE = "PROFILE";
export const LOADING_PROFILE = "LOADING_PROFILE";

export interface IProfileState {
  profile: IProfileModel | null;
  loading: boolean;
}

interface ProfileFlowAction {
  type: typeof PROFILE;
  payload: IProfileModel;
}

interface LoadingProfileFlowAction {
  type: typeof LOADING_PROFILE;
  payload: boolean;
}

export type ProfileFlowActionsTypes =
  | ProfileFlowAction
  | LoadingProfileFlowAction;
