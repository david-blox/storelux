import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron } from "reactstrap";

const HomePage = () => (
  <Jumbotron>
    <h1>WELCOME TO STORELUX</h1>
    <p>Welcome to the responsive web sore online for everyone</p>
    <Link to="about" className="btn btn-primary btn-lg">
      Learn more
    </Link>
  </Jumbotron>
);

export default HomePage;
