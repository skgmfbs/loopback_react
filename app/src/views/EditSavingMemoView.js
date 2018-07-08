import axios from 'axios';

import AddSavingMemoView from './AddSavingMemoView';

import "../helpers/Utils";
import { Caption } from "../helpers/Constants";
import { AppSetting } from "../helpers/Utils";
import { ApplicationContext } from "../contexts/ApplicationContext";

export default class EditSavingMemo extends AddSavingMemoView {

  state = {
    isAuthenticated: undefined,
    recorderId: undefined,
    type: '',
    amount: 0.0,
    createdDate: undefined,
    updatedDate: undefined
  };

  API = 'api/savingmemos/{0}';

  componentWillMount() {
    axios.get(AppSetting.host
      + this.API.format(this.props.match.params.id)
      + '?access_token='
      + ApplicationContext.access_token)
      .then(res => {
        this.setState({
          isAuthenticated: true,
          recorderId: res.data.recorderId,
          type: res.data.type,
          amount: res.data.amount,
          createdDate: res.data.createdDate
        });
      }).catch(error => {
        if (error.response.status === 401) {
          this.setState({ isAuthenticated: false });
        } else {
          alert(error.response.data.error.message);
        }
      });
  }

  getButtonName = () => { return Caption.Memo.Action.EDIT.LONG_TEXT; }

  handleSubmit(event) {
    axios.put(AppSetting.host
      + this.API.format(this.props.match.params.id)
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
      recorderId: this.state.recorderId,
      type: this.state.type,
      amount: this.state.amount,
      createdDate: this.state.createdDate,
      updatedDate: new Date()
    };
  }
}