import React from 'react';
import classes from './Order.css';

const order = (props) => {
    return (
        <div className={classes.Order}>
            <p>Ingredients: Meat(2)</p>
            <p>Price: <strong>1</strong></p>
        </div>
    );
}

export default order;