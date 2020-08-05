import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import Input from "../common/FormElements/Input";
import Button from "../common/FormElements/Button";
import Card from "../common/UIElements/Card";
import ErrorModal from "../common/UIElements/ErrorModal";
import LoadingSpinner from "../common/UIElements/LoadingSpinner";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../common/util/InputValidators";
import { useForm } from "../hooks/form-hook";
import * as actionTypes from "./usersActions/authActions";

import "./usersCss/Auth.css";

const Auth = ({ onAuth, onLogin, loading, error }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  let moveToTop = useRef();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          firstName: undefined,
          lastName: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          firstName: {
            value: "",
            isValid: false,
          },
          lastName: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      onLogin(formState.inputs.email.value, formState.inputs.password.value);
    } else {
      onAuth(
        formState.inputs.firstName.value,
        formState.inputs.lastName.value,
        formState.inputs.email.value,
        formState.inputs.password.value
      );
    }
  };

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    if (error) {
      setErrorMessage(error.error);
    }
  }, [loading, error]);

  const clearError = () => {
    setErrorMessage(null);
  };

  if (moveToTop.current) {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      <div className="auth__box">
        <Card className="authentication">
          {isLoading && <LoadingSpinner asOverlay />}
          <h2>Login Required</h2>
          <hr />
          <form onSubmit={authSubmitHandler} ref={moveToTop}>
            {!isLoginMode && (
              <>
                <Input
                  element="input"
                  type="text"
                  id="firstName"
                  label="First Name"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter your first name."
                  onInput={inputHandler}
                />
                <Input
                  element="input"
                  type="text"
                  id="lastName"
                  label="Last Name"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter your Last name."
                  onInput={inputHandler}
                />
              </>
            )}
            <Input
              element="input"
              id="email"
              type="email"
              label="E-Mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="password"
              type="password"
              label="Password"
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText="Please enter a valid password, at least 6 characters."
              onInput={inputHandler}
            />
            <Button
              type="submit"
              disabled={!formState.isValid}
              buttonClass="btnStyle"
            >
              {isLoginMode ? "LOGIN" : "SIGNUP"}
            </Button>
          </form>
          <Button inverse onClick={switchModeHandler} buttonClass="btnStyle">
            SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
          </Button>
        </Card>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (firstName, lastName, email, password) =>
      dispatch(actionTypes.Auth(firstName, lastName, email, password)),
    onLogin: (email, password) =>
      dispatch(actionTypes.LoginAuth(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
