import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import './Product.css';

const Product = (props) => {

    console.log(props);
    const { img, name, seller, price, stock } = props.product
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4>{name}</h4>
                <br />
                <p><small>By: {seller}</small></p>
                <h4>Price: $ {price}</h4>
                <p><small>Only {stock} left in available - please order soon</small></p>
                <button className='main-button' onClick={()=> props.handleAddProduct(props.product)}><FontAwesomeIcon icon={ faShoppingCart }/>  Add to cart</button>
            </div>



        </div>
    );
};

export default Product;