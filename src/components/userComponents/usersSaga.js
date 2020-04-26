import { takeLatest, call, fork, put } from "redux-saga/effects";
import * as actions from "./usersActions";
import * as api from "../../api/users";

function* getUsers() {
  try {
    const resultUsers = yield call(api.getUsers);
    yield put(
      actions.getUsersSuccess({
        items: resultUsers.data,
      })
    );
    console.log(resultUsers);
  } catch (e) {
    yield put(
      actions.userError({
        error: "An error happend when trying to get Users",
      })
    );
  }
}

function* watchGetUsersRequest() {
  yield takeLatest(actions.Types.GET_USERS_REQUEST, getUsers); //takeEvery it works like while(true)
}

const userSagas = [fork(watchGetUsersRequest)];

export default userSagas;
