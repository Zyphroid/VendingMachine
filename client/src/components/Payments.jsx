import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render() {
        return (
            <StripeCheckout 
                name="EveryMatrix"
                description={`Pay to add ${this.props.amount} credits`}
                amount={this.props.amount * 100}
                token={(token) => this.props.handleToken(token, this.props.amount)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn green">Add credits</button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);
