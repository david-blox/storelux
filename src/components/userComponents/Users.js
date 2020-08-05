import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import UsersList from "./UsersList";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import * as actionTypes from "./usersActions/UserActions";
import { getUsersState } from "../store/rootReducers";

const Users = ({ loadUsers, loading, error, users, isDone, UsersState }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!UsersState) {
      loadUsers();
    }
    if (loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    if (error) {
      setErrorMessage(error.error);
    }
  }, [loading, error, loadUsers, isDone, UsersState]);

  const clearError = () => {
    setErrorMessage(null);
  };

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && <UsersList items={users} />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users.items,
    isDone: state.users.isDone,
    loading: state.users.loading,
    error: state.users.error,
    UsersState: getUsersState(state, state.users.isDone),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(actionTypes.getUsersRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
