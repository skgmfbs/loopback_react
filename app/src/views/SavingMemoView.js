import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import "../helpers/Utils";
import { Caption } from "../helpers/Constants";
import { AppSetting } from "../helpers/Utils";
import { ApplicationContext } from "../contexts/ApplicationContext";

import ActionLinkComponent from "../components/ActionLinkComponent";
import TotalCaptionComponent from "../components/TotalCaptionComponent";

export default class SavingMemoView extends React.Component {

    state = {
        isAuthenticated: undefined,
        items: []
    };

    API = 'api/savingmemos';
    DELETE_API = 'api/savingmemos/{0}';

    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {
        axios.get(AppSetting.host
            + this.API
            + '?access_token='
            + ApplicationContext.access_token)
            .then(res => {
                this.setState({
                    isAuthenticated: true,
                    items: res.data
                });
            }).catch(error => {
                if (error.response.status === 401) {
                    this.setState({ isAuthenticated: false });
                } else {
                    alert(error.response.data.error.message);
                }
            });
    }

    handleDelete(event) {
        var id = event.target.id;
        axios.delete(AppSetting.host
            + this.DELETE_API.format(id)
            + '?access_token='
            + ApplicationContext.access_token)
            .then(res => {
                var items = this.state.items;
                var index = items.findIndex(x => x.id == id);
                items.splice(index, 1);
                this.setState({ items: items });
            }).catch(error => {
                alert(error.response.data.error.message);
            });

        event.preventDefault();
    }

    render() {
        if (this.state.isAuthenticated === false) {
            return (<Redirect to={Caption.SIGNIN.URI} />);
        }
        return (
            <div className="container w-75 pt-3">
                <div className="row m-1">
                    <div className="col-12">
                        <ActionLinkComponent
                            to={Caption.Memo.Action.ADD.URI}
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
                    <th scope="row">{index + 1}</th>
                    <td>{item.type}</td>
                    <td>{item.amount}</td>
                    <td>
                        {(item.updatedDate) ? item.updatedDate : item.createdDate}
                    </td>
                    <td>
                        <ActionLinkComponent
                            to={Caption.Memo.Action.EDIT.URI.format(item.id)}
                            text={Caption.Memo.Action.EDIT.SHORT_TEXT}
                            style="link"
                            cssClass="float-left" />
                        <button id={item.id}
                            type="button" className="btn btn-danger float-right"
                            onClick={this.handleDelete}>Del</button>
                    </td>
                </tr>)
        }, this);
    }
}