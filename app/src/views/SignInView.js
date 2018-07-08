import React from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';

import { Caption } from "../helpers/Constants";
import { AppSetting } from "../helpers/Utils";
import { ApplicationContext } from "../contexts/ApplicationContext";

import ActionLinkComponent from '../components/ActionLinkComponent';

export default class SignInView extends React.Component {

  state = {
    username: '',
    password: '',
    isLoggedIn: false
  };

  API = 'api/Recorders/login';

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.id === 'username') {
      this.setState({ username: event.target.value });
    } else if (event.target.id === 'password') {
      this.setState({ password: event.target.value });
    }
  }

  handleSubmit(event) {
    axios.post(AppSetting.host + this.API, this.createRequestBody())
      .then(res => {
        ApplicationContext.userId = res.data.userId;
        ApplicationContext.access_token = res.data.id;
        this.setState({ isLoggedIn: true });
      }).catch(error => {
        alert(error.response.data.error.message);
      });

    event.preventDefault();
  }
  createRequestBody = () => {
    return {
      username: this.state.username,
      password: this.state.password
    };
  }

  render() {
    if (this.state.isLoggedIn) {
      return (<Redirect to={Caption.Memo.URI} />);
    }
    return (
      <div className="container w-50 pt-3">
        <div className="row m-5">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input id="username" type="text" className="form-control" required
                value={this.state.username}
                onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" className="form-control" required
                value={this.state.password}
                onChange={this.handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">
              {Caption.SIGNIN.LONG_TEXT}
            </button>
            <ActionLinkComponent
              to={Caption.SIGNUP.URI}
              text={Caption.SIGNUP.LONG_TEXT}
              cssClass="ml-3">
            </ActionLinkComponent>
          </form>
        </div>
      </div>
    );
  }
}