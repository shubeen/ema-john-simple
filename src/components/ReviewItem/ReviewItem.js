import React from 'react';

const ReviewItem = (props) => {
    console.log(props);
    const {name, quantity,key,removeProduct, price} = props.product
    const reviewItemStyle = {
        borderBottom:'1px solid lightgray',
        marginBottom: '10px',
        paddingBottom: '10px',
        marginLeft: '150px'
    }
    return (
        <div style={reviewItemStyle} className= 'review-item' >
            <h4 className='product-name' >{name}</h4>
            <p> Items Quantity: {quantity}</p>
            <p><small>Price :{price} </small></p>
            <br/>
            <button 
            onClick={() => props.removeProduct(key)}
            className='main-button'> Remove</button>
        </div>
    );
};

export default ReviewItem;