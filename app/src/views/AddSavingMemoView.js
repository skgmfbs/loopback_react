import React from 'react';

import { Type, Caption } from "../helpers/Constants";

import ActionLinkComponent from "../components/ActionLinkComponent";

export default class AddSavingMemoView extends React.Component {

  state = {
    type: '',
    amount: 0.0
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({ type: Type.INCOME });
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
    alert('Add: ' + JSON.stringify(this.state));
    event.preventDefault();
  }

  render() {
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
              to="/"
              text={Caption.BACK}
              style="light"
              cssClass="ml-3">
            </ActionLinkComponent>
          </form>
        </div>
      </div>
    );
  }
}