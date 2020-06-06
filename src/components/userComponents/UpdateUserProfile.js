import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import Card from "../common/UIElements/Card";
import Button from "../common/FormElements/Button";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import ErrorModal from "../common/UIElements/ErrorModal";
import Input from "../common/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../common/util/InputValidators";
import UserManagment from "./UserManagmet";
import { useForm } from "../hooks/form-hook";
import { useHttpClient } from "../hooks/http-hook";
import "./usersCss/UserForm.css";

const UpdateUserProfile = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();

  const userId = useParams().userId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      firstName: {
        value: "",
        isValid: false,
      },
      lastName: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${userId}`
        );
        setLoadedUser(responseData.user);
        setFormData(
          {
            firstName: {
              value: responseData.user.firstName,
              isValid: true,
            },
            lastName: {
              value: responseData.user.lastName,
              isValid: true,
            },
            email: {
              value: responseData.user.email,
              isValid: true,
            },
            address: {
              value: responseData.user.address,
              isValid: true,
            },
            phone: {
              value: responseData.user.phone,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };

    fetchUser();
  }, [setFormData, userId, sendRequest]);

  const updateUserSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/users/${userId}`,
        "PATCH",
        JSON.stringify({
          firstName: formState.inputs.firstName.value,
          lastName: formState.inputs.lastName.value,
          email: formState.inputs.email.value,
          address: formState.inputs.address.value,
          phone: formState.inputs.phone.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push(`/user/profile`);
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <div className="user-profile__wrapper">
        <UserManagment />
        {isLoading && (
          <div className="loadingSpinerPosion">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && loadedUser && (
          <Card className="update-user__form">
            <form onSubmit={updateUserSubmitHandler}>
              <div className="info">
                <div className="user-profile__profile-name">
                  <div className="avatar-size">
                    {/* <Avatar image={user.image} alt={user.firstName} /> */}
                  </div>
                  <div className="user-profile__title">
                    <h4>User Email:</h4>
                    <Input
                      id="email"
                      element="input"
                      validators={[VALIDATOR_EMAIL()]}
                      errorText="Please enter a valid email address."
                      onInput={inputHandler}
                      initialValue={loadedUser.email}
                      initialValid={true}
                    />
                  </div>
                </div>
                <div className="user-profile__profile-info">
                  <div className="user-profile__profile-info__title">
                    <label>First Name:</label>
                    <label>Last Name:</label>
                    <label>Address:</label>
                    <label>Phone Number:</label>
                  </div>
                  <div className="user-profile__profile-info__content">
                    <div className="user-profile__input-container">
                      <Input
                        id="firstName"
                        element="input"
                        type="text"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        errorText="Please enter a valid First Name"
                        initialValue={loadedUser.firstName}
                        initialValid={true}
                      />
                      <Input
                        id="lastName"
                        element="input"
                        type="text"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        errorText="Please enter a valid Last Name"
                        initialValue={loadedUser.lastName}
                        initialValid={true}
                      />
                      <Input
                        id="address"
                        element="input"
                        type="text"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        errorText="Please enter a valid Address"
                        initialValue={loadedUser.address}
                        initialValid={true}
                      />
                      <Input
                        id="phone"
                        element="input"
                        type="text"
                        validators={[VALIDATOR_MINLENGTH(10)]}
                        onInput={inputHandler}
                        errorText="Please enter a valid phone Numer"
                        initialValue={loadedUser.phone}
                        initialValid={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="user-profile__footer">
                <Button type="submit" disabled={!formState.isValid}>
                  UPDATE PROFILE
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </>
  );
};

export default UpdateUserProfile;