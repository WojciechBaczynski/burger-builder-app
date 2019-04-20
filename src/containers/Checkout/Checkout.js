import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            bacon: 1,
            cheese: 1
        }
    };

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        this.setState({ ingredients: ingredients });
    };

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
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        );
    };
}

export default Checkout;