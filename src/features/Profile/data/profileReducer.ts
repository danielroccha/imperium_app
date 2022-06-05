import { IProfileState, ProfileFlowActionsTypes } from "./profileTypes";

const INITIAL_STATE: IProfileState = {
  profile: null,
  loading: false,
};

export default (
  state = INITIAL_STATE,
  action: ProfileFlowActionsTypes,
): IProfileState => {
  switch (action.type) {
    case "LOADING_PROFILE":
      return { ...state, loading: action.payload };

    case "PROFILE":
      return { ...state, profile: action.payload };

    default:
      return state;
  }
};
