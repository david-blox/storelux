import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import UserManagment from "./UserManagmet";
import UserProfileItem from "./UserProfileItem";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import * as actionTypes from "./usersActions/UserActions";
import "./usersCss/UserProfile.css";

const UserProfile = ({ userId, userData, user, loading, error, isDone }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!isDone && !loading) {
      userData(userId);
    }
    if (loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    if (error) {
      setErrorMessage(error.error);
    }
  }, [userData, userId, loading, error, isDone]);

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
      <div className="user-profile__wrapper">
        <UserManagment />
        {!isLoading && <UserProfileItem user={user} />}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    user: state.user.item,
    isDone: state.user.isDone,
    error: state.user.error,
    loading: state.user.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userData: (userId) => dispatch(actionTypes.userDataStart(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
