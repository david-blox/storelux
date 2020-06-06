import React, { useState, useEffect, useContext } from "react";

import UserManagment from "./UserManagmet";
import UserProfileItem from "./UserProfileItem";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../common/context/auth-context";
import "./usersCss/UserProfile.css";


const UserProfile = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${auth.userId}`
        );
        setLoadedUser(responseData.user);
        console.log(responseData.user);
      } catch (err) {}
    };
    fetchUserInfo();
  }, [sendRequest, auth.userId]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <div className="user-profile__wrapper">
        <UserManagment />
        {!isLoading && loadedUser && <UserProfileItem user={loadedUser} />}
      </div>
    </>
  );
};

export default UserProfile;
