import React, { Component } from 'react';
import { connect } from "react-redux";

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withError from '../../hoc/withError/withError';
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        /*axios.get('ingredients.json')
            .then(res => {
                this.setState({ ingredients: res.data })
            })
            .catch(err => {
                this.setState({ error: true })
            });*/
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContiniueHandler = () => {
        //alert('You continiue!');
        /*
        this.setState({ loading: true });
        const order = {
            ingredients: this.store.ingredients,
            price: this.store.totalPrice,
            customer: {
                name: "WB",
                adress: {
                    street: "Testst 1",
                    zipcode: "12345",
                    country: "Poland"
                },
                email: "test@test.com"
            },
            deliveryMethod: "fastest"
        }
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch(err => {
                this.setState({ loading: false, purchasing: false });
            });
        */
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) +
                '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIgredientAdded}
                        ingredientRemoved={this.props.onIgredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseContinued={this.purchaseContiniueHandler}
                purchaseCancelled={this.purchaseCancelHandler} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIgredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIgredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withError(BurgerBuilder, axios));