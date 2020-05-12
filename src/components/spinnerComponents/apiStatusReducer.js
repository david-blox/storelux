import { Types } from "./apiStatusActions";

const INITIAL_STATE = {
  apiCallsInProgress: 0,
};

function actionTypeEndsInSuccess(type) {
  return type.substring(type.tength - 8) === ".SUCCESS";
}

export default function apiCallsStatusReducer(
  state = INITIAL_STATE.apiCallsInProgress,
  action
) {
  // eslint-disable-next-line eqeqeq
  if (action.type === Types.BEGIN_API_CAL) {
    return state + 1;
  } else if (actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }
  return state;
}
