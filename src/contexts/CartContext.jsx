import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const cart = window.localStorage.getItem("cart");

        if (!cart) {
            window.localStorage.setItem("cart", JSON.stringify([]));
            return [];
        }

        return JSON.parse(cart);
    });

    // Sync cart with localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Add item to cart
    function addToCart(item) {
        setCart((prevCart) => {
            // Check if item already exists
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
            
            if (existingItem) {
                // Increment quantity
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem
                );
            } else {
                // Add new item with quantity 1
                return [...prevCart, { ...item, quantity: item.quantity }];
            }
        });
    };

    // Remove item from cart
    function removeFromCart(id) {
        setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== id));
    };

    // Clear entire cart
    function clearCart() {
        setCart([]);
    };

    // Increment item quantity
    function incrementQuantity(id) {
        setCart((prevCart) =>
            prevCart.map((cartItem) =>
                cartItem.id === id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            )
        );
    };

    // Decrement item quantity
    function decrementQuantity(id) {
        setCart((prevCart) =>
            prevCart
                .map((cartItem) =>
                    cartItem.id === id
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                )
                .filter((cartItem) => cartItem.quantity > 0) // Remove if quantity <= 0
        );
    };


    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart, removeFromCart, incrementQuantity, decrementQuantity }}>
            {children}
        </CartContext.Provider>
    );
}