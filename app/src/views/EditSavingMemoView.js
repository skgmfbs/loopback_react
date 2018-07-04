import AddSavingMemoView from './AddSavingMemoView';

import { Type, Caption } from "../helpers/Constants";

export default class EditSavingMemo extends AddSavingMemoView {

  state = {
    type: '',
    amount: 0.0
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({ type: Type.INCOME });
  }

  getButtonName = () => { return Caption.Memo.Action.EDIT.LONG_TEXT; }

  handleSubmit(event) {
    alert('Update: ' + JSON.stringify(this.state));
    event.preventDefault();
  }
}