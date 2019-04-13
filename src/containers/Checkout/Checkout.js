import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            bacon: 1,
            cheese: 1
        }
    }

    onCheckoutCancelled = () => {
        this.props.history.goBack();
    };

    onCheckoutContiuniued = () => {
        this.props.history.replace('/chcekout/contact-data');
    };

    render() {
        return (
            <div>
                <CheckoutSummary
                    checkoutCancelled={this.onCheckoutCancelled}
                    checkoutContiniued={this.onCheckoutContiuniued}
                    ingredients={this.state.ingredients} />
            </div>
        );
    }
}

export default Checkout;