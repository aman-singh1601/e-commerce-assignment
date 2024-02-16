import React, { useState } from 'react'
import Store from '../store'
import { useNotification } from '../components/useNotification';

const StoreProvider = ({children}) => {

    const [cart, setCart] = useState([]);
    const [cartSize, setCartSize] = useState(0);
    const [subTotal, setSubTotal] = useState(0);



    const  addToCart = (product) => {
            setCartSize((prev) => prev + 1);
            let flag= 0;
            let newCart = cart.map((item) => {
                if(item.id === product.id) {
                    flag = 1;
                    return {
                        ...item,
                        count: item.count + 1
                    }
                }
                return item;
            })
            setCart(prevCart => flag === 0 ? [product ,...prevCart]: newCart);
            setSubTotal(prevSubTotal => prevSubTotal + product.price);
            useNotification(`${product?.title} added to cart`, "info");
    };
    const removeFromCart = (product) => {
        setCart(prev => prev.filter( cartProduct => cartProduct.id === product.id ? {...product, count: product.count-1}: cartProduct));
    };
    const clearCart = () => {
        setCart([]);
    };

    return (
    <Store.Provider value={{ cart, cartSize, subTotal, addToCart, removeFromCart, clearCart}}>
        {children}
    </Store.Provider>
    )
}

export default StoreProvider;
