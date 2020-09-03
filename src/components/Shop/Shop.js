import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
      const first20 = fakeData.slice(0,20);
      const [products,setProducts]= useState(first20);
      const [cart, setCart] = useState([]);
        useEffect(()=>{
            const savedCart = getDatabaseCart();
            const productKeys= Object.keys(savedCart);
            const previousCart = productKeys.map(existingKeys =>{
                const product = fakeData.find(pd => pd.key ===existingKeys);
                product.quantity = savedCart[existingKeys];
                return product;
            })
            setCart(previousCart);


        },[])
      const handleAddProduct = (product)=>{
          console.log('product added', product)
          const toBeAddedKey = product.key;
          const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
          let count = 1;
          let newCart;
          if (sameProduct){
              count = sameProduct.quantity +1;
              sameProduct.quantity= count;
              const others = cart.filter(pd => pd.key !== toBeAddedKey);
              newCart= [...others, sameProduct];
          }
          else{
              product.quantity =1;
              newCart = [...cart, product];
          }
          setCart(newCart);
          
          addToDatabaseCart(product.key, count);
      }

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(pd => <Product
                            key= {pd.key} 
                            handleAddProduct = {handleAddProduct}
                            product={pd}
                            showAddToCart={true}>

                        </Product>)
                }
                
        </div>
        <div className="cart-container">
            <Cart cart={cart}>
            <Link to ='/review'>
            <button className="main-button" > Review Order</button>
            </Link>
            </Cart>
        </div>
        </div>
    );
};

export default Shop;