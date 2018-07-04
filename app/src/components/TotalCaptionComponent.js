import React from 'react';
import { Type } from "../helpers/Constants";

export default class TotalCaptionComponent extends React.Component {

    state = {
        text: '',
        collection: []
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({
            text: this.props.text,
            collection: this.props.collection
        });
    }

    render() {
        return (
            <caption>{this.state.text}: {this.getTotalAmount()}</caption>
        );
    }

    getTotalAmount = () => {
        var total = 0;
        this.state.collection.forEach(x => {
            if (x.amount !== undefined
                && Number.parseFloat(x.amount) !== NaN) {
                if (x.type === Type.INCOME) {
                    total += Number.parseFloat(x.amount);
                } else {
                    total -= Number.parseFloat(x.amount);
                }
            }
        });

        return total;
    }
}