import React from 'react';

const ReviewItem = (props) => {
    console.log(props);
    const {name, quantity} = props.product
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
            <br/>
            <button className='main-button'> Remove</button>
        </div>
    );
};

export default ReviewItem;