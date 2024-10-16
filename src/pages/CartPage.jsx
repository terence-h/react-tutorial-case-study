import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import products from '../data/products.json';
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

export default function Cart() {
    const { loggedIn } = useContext(UserContext);
    const { cart, clearCart, removeFromCart, incrementQuantity, decrementQuantity } = useContext(CartContext);
    let subTotal = 0;

    if (!loggedIn) {
        return (
            <div className="container mx-auto text-center">
                <h1 className="text-3xl font-bold">Your need to be logged in to access the cart</h1>
            </div>
        );
    } else if (cart.length === 0) {
        return (
            <div className="container mx-auto text-center">
                <h1 className="text-3xl font-bold">Your cart is empty</h1>
            </div>
        );
    }


    return (
        <div className="bg-gray-100 h-screen py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-row md:w-3/4">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-600 mb-2">Cart</h1>
                    <button className="text-red-600 ml-auto mr-5" onClick={clearCart}>Clear Cart</button>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-3/4">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left font-semibold">Product</th>
                                        <th className="text-left font-semibold">Price</th>
                                        <th className="text-left font-semibold">Quantity</th>
                                        <th className="text-left font-semibold">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((cartItem) => {
                                        const item = products.find(product => product.id === cartItem.id);
                                        const itemSubTotal = (item.price * cartItem.quantity);
                                        subTotal += itemSubTotal;

                                        return (
                                            <tr key={cartItem.id}>
                                                <td className="py-4">
                                                    <div className="flex items-center">
                                                        <img className="h-16 w-16 mr-4" src={item.path} alt="Product" />
                                                        <span className="font-semibold">{item.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4">${item.price.toFixed(2)}</td>
                                                <td className="py-4">
                                                    <div className="flex items-center">
                                                        <button className="border rounded-md py-2 px-4 mr-2 disabled:text-gray-300"
                                                            onClick={() => decrementQuantity(cartItem.id)}>
                                                            -
                                                        </button>
                                                        <span className="text-center w-8">{cartItem.quantity}</span>
                                                        <button className="border rounded-md py-2 px-4 ml-2 disabled:text-gray-300" disabled={cartItem.quantity === 5}
                                                            onClick={() => incrementQuantity(cartItem.id)}>
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="py-4">${itemSubTotal.toFixed(2)}</td>
                                                <td className="py-6 text-red-600"><button onClick={() => removeFromCart(cartItem.id)}>Delete</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="md:w-1/4">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-semibold mb-4">Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>${subTotal.toFixed(2)}</span>
                            </div>
                            {/* <div className="flex justify-between mb-2">
                                <span>Taxes</span>
                                <span>$1.99</span>
                            </div> */}
                            <div className="flex justify-between mb-2">
                                <span>Shipping</span>
                                <span>$20.00</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between mb-5">
                                <span className="font-semibold">Total</span>
                                <span className="font-semibold">${(subTotal + 20).toFixed(2)}</span>
                            </div>
                            <Link to="/checkout" className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}