import React, { Component } from "react";

import UserService from "../../services/UserService";
import UsersOverview from "./UsersOverview";
import Users from "./Users"
export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {

  }

  render() {
    console.log(this.state.content)
    console.log(this.props)
    return (
      <div className="container">
        <header className="jumbotron">
         <Users />
         {/*<UsersOverview />*/}
        </header>
      </div>
    );
  }
}
