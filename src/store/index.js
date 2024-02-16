import React, { useContext } from 'react';

const Store =  React.createContext({
    cart: [],
    cartSize: 0,
    addToCart: (product) => {},
    removeFromCart: (product) => {},
    clearCart: () => {},
});

export default Store;

export const useStore = () => useContext(Store);
