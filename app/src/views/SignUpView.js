import React from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';

import { Caption } from "../helpers/Constants";
import { AppSetting } from "../helpers/Utils";

import ActionLinkComponent from '../components/ActionLinkComponent';

export default class SignUpView extends React.Component {

  state = {
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    registered: false
  };

  API = 'api/Recorders';

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.id === 'username') {
      this.setState({ username: event.target.value });
    } else if (event.target.id === 'email') {
      this.setState({ email: event.target.value });
    } else if (event.target.id === 'password') {
      this.setState({ password: event.target.value });
    } else if (event.target.id === 'confirm_password') {
      this.setState({ confirm_password: event.target.value });
    }
  }

  handleSubmit(event) {
    if (this.validate()) {
      axios.post(AppSetting.host + this.API, this.createRequestBody())
        .then(res => {
          alert("registered successfully");
          this.setState({ registered: true });
        }).catch(error => {
          alert(error.response.data.error.message);
        });
    }
    event.preventDefault();
  }

  validate() {
    if (this.state.password !== this.state.confirm_password) {
      alert("password not same.");
      return false;
    }
    return true;
  }

  createRequestBody = () => {
    return {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
  }

  render() {
    if (this.state.registered) {
      return (<Redirect to={Caption.SIGNIN.URI} />);
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
              <label htmlFor="email">Email</label>
              <input id="email" type="email" className="form-control" required
                value={this.state.email}
                onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" className="form-control" required
                value={this.state.password}
                onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="confirm_password">Confirm Password</label>
              <input id="confirm_password" type="password" className="form-control" required
                value={this.state.confirm_password}
                onChange={this.handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">
              {Caption.SIGNUP.LONG_TEXT}
            </button>
            <ActionLinkComponent
              to={Caption.BACK.URI}
              text={Caption.BACK.LONG_TEXT}
              style="light"
              cssClass="ml-3">
            </ActionLinkComponent>
          </form>
        </div>
      </div>
    );
  }
}