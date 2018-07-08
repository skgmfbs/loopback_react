import React from 'react';
import { Link } from "react-router-dom";

export default class ActionLinkComponent extends React.Component {

    state = {
        to: '',
        text: '',
        style: '',
        cssClass: ''
    };

    componentWillMount() {
        this.setState({
            to: this.props.to,
            text: this.props.text,
            style: this.getSytle(),
            cssClass: this.props.cssClass
        });
    }

    render() {
        return (
            <Link
                to={this.state.to}
                className={"btn btn-" + this.state.style + " " + this.state.cssClass}>
                {this.state.text}
            </Link>
        );
    }

    getSytle = () => {
        return (this.props.style === '' || this.props.style === undefined)
            ? 'primary'
            : this.props.style;
    }
}