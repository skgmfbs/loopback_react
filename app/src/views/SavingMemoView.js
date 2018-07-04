import React from 'react';
import { Type, Caption } from "../helpers/Constants";

import ActionLinkComponent from "../components/ActionLinkComponent";
import TotalCaptionComponent from "../components/TotalCaptionComponent";

export default class SavingMemoView extends React.Component {

    state = {
        items: []
    };

    componentWillMount() {
        this.setState(
            {
                items: [{
                    id: 1,
                    type: Type.INCOME,
                    amount: 105,
                    createdDate: new Date().toLocaleString()
                }, {
                    id: 2,
                    type: Type.EXPENSE,
                    amount: 50,
                    createdDate: new Date().toLocaleString()
                }]
            }
        );
    }

    render() {
        return (
            <div className="container w-75 pt-3">
                <div className="row m-1">
                    <div className="col-12">
                        <ActionLinkComponent
                            to="/add"
                            text={Caption.Memo.Action.ADD.LONG_TEXT}
                            cssClass="float-right" />
                    </div>
                </div>
                <div className="row">
                    <table className="table">
                        <TotalCaptionComponent
                            text="Total"
                            collection={this.state.items} />
                        <thead className="table-primary">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Type</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Date</th>
                                <th style={{ width: '150px' }} className="w-5" scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableBody()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    renderTableBody() {
        return this.state.items.map(function (item, index) {
            return (
                <tr key={item.id}>
                    <th scope="row">{index}</th>
                    <td>{item.type}</td>
                    <td>{item.amount}</td>
                    <td>{item.createdDate}</td>
                    <td>
                        <ActionLinkComponent
                            to={"edit/" + item.id}
                            text={Caption.Memo.Action.EDIT.SHORT_TEXT}
                            style="link"
                            cssClass="float-left" />
                        <button type="button" className="btn btn-danger float-right">Del</button>
                    </td>
                </tr>)
        });
    }
}