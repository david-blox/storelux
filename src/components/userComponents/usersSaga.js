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

function* signUpUser(action) {
  try {
    const user = yield call(api.createUser, {
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
      email: action.payload.email,
      password: action.payload.password,
    });
    console.log(user);
  } catch (e) {
    yield put(
      actions.userError({
        error: "an error happend when trying add new user",
      })
    );
  }
}

function* watchSignupUserRequest() {
  yield takeLatest(actions.Types.USER_SIGNUP_REQUEST, signUpUser);
}

const userSagas = [fork(watchGetUsersRequest), fork(watchSignupUserRequest)];

export default userSagas;
