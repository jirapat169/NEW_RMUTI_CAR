import React, { Component } from "react";
import Dashboard from "../../components/Dashboard";

const Home = (props) => {
  return <Dashboard {...props}>{props.env["mode"]}</Dashboard>;
};

export default Home;
