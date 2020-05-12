import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as usersAction from "../userComponents/usersActions";
import TextInput from "../common/TextInput";

class Registration extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password_confirmation: "",
    registrationErrors: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("form submitted", this.state);
    this.props.createUser(this.state);
  };

  render() {
    console.log(this.props);
    return (
      <div className="form-group" style={{ width: 500 }}>
        <form onSubmit={this.handleSubmit}>
          <TextInput
            type="text"
            label="First Name"
            name="firstName"
            placeholder="First Name"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
          <TextInput
            type="text"
            label="Last Name"
            name="lastName"
            placeholder="Last Name"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
          <TextInput
            type="email"
            label="Email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <TextInput
            type="password"
            label="Password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <TextInput
            type="password"
            label="Password Confirmation"
            name="password_confirmation"
            placeholder="Password Confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
          />
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    );
  }
}

Registration.propTypes = {
  createUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  createUser: usersAction.signUpUserRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
