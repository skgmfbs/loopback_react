import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { Type, Caption } from "../helpers/Constants";
import { AppSetting } from "../helpers/Utils";
import { ApplicationContext } from "../contexts/ApplicationContext";

import ActionLinkComponent from "../components/ActionLinkComponent";

export default class AddSavingMemoView extends React.Component {

  state = {
    isAuthenticated: undefined,
    type: '',
    amount: 0.0
  };

  API = 'api/savingmemos';

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({
      isAuthenticated: ApplicationContext.access_token !== undefined
        && ApplicationContext.access_token !== '',
      type: Type.INCOME
    });
  }

  getButtonName = () => { return Caption.Memo.Action.ADD.LONG_TEXT; }

  handleChange(event) {
    this.setState({ amount: event.target.value });
  }
  handleTypeChange(event) {
    this.setState({
      type: event.target.value
    });
  }

  handleSubmit(event) {
    axios.post(AppSetting.host
      + this.API
      + '?access_token='
      + ApplicationContext.access_token, this.createRequestBody())
      .then(res => {
        this.props.history.push('/memo');
      }).catch(error => {
        alert(error.response.data.error.message);
      });

    event.preventDefault();
  }
  createRequestBody = () => {
    return {
      type: this.state.type,
      amount: this.state.amount
    };
  }

  render() {
    if (this.state.isAuthenticated === false) {
      return (<Redirect to={Caption.SIGNIN.URI} />);
    }
    return (
      <div className="container w-50 pt-3">
        <div className="row m-5">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Type</label>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="type" id="type1"
                  value={Type.INCOME}
                  checked={this.state.type === Type.INCOME}
                  onChange={this.handleTypeChange} />
                <label className="form-check-label" htmlFor="type1">
                  {Type.INCOME}
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="type" id="type2"
                  value={Type.EXPENSE}
                  checked={this.state.type === Type.EXPENSE}
                  onChange={this.handleTypeChange} />
                <label className="form-check-label" htmlFor="type2">
                  {Type.EXPENSE}
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input id="amount" type="number" className="form-control text-right"
                value={this.state.amount}
                onChange={this.handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">{this.getButtonName()}</button>
            <ActionLinkComponent
              to={Caption.Memo.Action.BACK.URI}
              text={Caption.Memo.Action.BACK.LONG_TEXT}
              style="light"
              cssClass="ml-3">
            </ActionLinkComponent>
          </form>
        </div>
      </div>
    );
  }
}