import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import products from '../data/products.json';
import { UserContext } from "../contexts/UserContext";
import { CartContext } from "../contexts/CartContext";

export default function Checkout() {
    const { loggedIn } = useContext(UserContext);
    const { cart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        address: "",
        zipPostal: "",
        cardName: "",
        cardNumber: "",
        cardExpMth: "",
        cardExpYear: "",
        cardCVV: "",
        order: { ...cart },
        subTotal: 0,
        shipping: 20
    });

    let subTotal = 0;

    useEffect(() => {
        if (!loggedIn || !cart || cart.length === 0)
            navigate("/");
    }, [cart, loggedIn, navigate])

    if (!loggedIn || !cart || cart.length === 0)
        return <></>

    function handleFormChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value, subTotal: subTotal, shipping: 20 })
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        clearCart();
        navigate("/orderconfirmed", { state: formData });
    }

    return (
        <div className="container md:w-3/4 py-5 mx-auto">
            <div className="px-5">
                <div className="mb-2">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-600">Checkout</h1>
                </div>
            </div>
            <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800 rounded-lg shadow-md">
                <div className="w-full">
                    <div className="-mx-3 md:flex items-start">
                        <div className="px-3 md:w-7/12 lg:pr-10">
                            {cart.map((cartItem) => {
                                const item = products.find(product => product.id === cartItem.id);
                                const itemSubTotal = (item.price * cartItem.quantity);
                                subTotal += itemSubTotal;

                                return (
                                    <div key={cartItem.id} className="w-full mx-auto mb-6 border-b border-gray-200 pb-6">
                                        <div className="w-full flex items-center">
                                            <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                                                <img src={item.path} alt="" />
                                            </div>
                                            <div className="flex-grow pl-3">
                                                <h6 className="font-semibold text-gray-600">{item.name}</h6>
                                                <p className="text-gray-400">x {cartItem.quantity}</p>
                                            </div>
                                            <span className="font-semibold text-gray-600 text-lg">${itemSubTotal.toFixed(2)}</span>
                                        </div>
                                    </div>
                                )
                            })}

                            <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                                <div className="w-full flex mb-3 items-center">
                                    <div className="flex-grow">
                                        <span className="text-gray-600">Subtotal</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semibold">${subTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="w-full flex items-center">
                                    <div className="flex-grow">
                                        <span className="text-gray-600">Shipping</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semibold">$20.00</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                                <div className="w-full flex items-center">
                                    <div className="flex-grow">
                                        <span className="text-gray-600">Total</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semibold">${(subTotal + 20).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-3 md:w-5/12">
                            <form onSubmit={handleOnSubmit}>
                                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                                    <div className="mb-2">
                                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Full Name</label>
                                        <input name="fullName" className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors" placeholder="John Smith" type="text" value={formData.name} onChange={handleFormChange} required />
                                    </div>

                                    <div className="mb-2">
                                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">E-mail</label>
                                        <input name="email" className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors" placeholder="johnsmith@gmail.com" type="email" value={formData.email} onChange={handleFormChange} required />
                                    </div>

                                    <div className="mb-2">
                                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Address</label>
                                        <textarea name="address" className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors" placeholder="123 A. St 45 #06-789" value={formData.address} onChange={handleFormChange} required />
                                    </div>

                                    <div className="mb-2">
                                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Zip/Postal Code</label>
                                        <input name="zipPostal" className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors" placeholder="123456" type="number" value={formData.zipPostal} onChange={handleFormChange} required />
                                    </div>
                                </div>
                                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                                    <div className="w-full p-3 border-b border-gray-200">
                                        <div className="mb-2">
                                            <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Name on card</label>
                                            <input name="cardName" className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors" placeholder="John Smith" type="text" value={formData.cardName} onChange={handleFormChange} required />
                                        </div>
                                        <div className="mb-2">
                                            <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Card number</label>
                                            <input name="cardNumber" className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors" placeholder="0000 0000 0000 0000" type="number" value={formData.cardNumber} onChange={handleFormChange} required />
                                        </div>
                                        <div className="mb-2 -mx-2 flex items-end">
                                            <div className="px-2 w-1/3">
                                                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Expiration date</label>
                                                <select name="cardExpMth" className="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors cursor-pointer" value={formData.cardExpMth} onChange={handleFormChange} required>
                                                    <option value="">MM</option>
                                                    <option value="01">01</option>
                                                    <option value="02">02</option>
                                                    <option value="03">03</option>
                                                    <option value="04">04</option>
                                                    <option value="05">05</option>
                                                    <option value="06">06</option>
                                                    <option value="07">07</option>
                                                    <option value="08">08</option>
                                                    <option value="09">09</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                </select>
                                            </div>
                                            <div className="px-2 w-1/3">
                                                <select name="cardExpYear" className="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors cursor-pointer" value={formData.cardExpYear} onChange={handleFormChange} required>
                                                    <option value="">yyyy</option>
                                                    <option value="2020">2024</option>
                                                    <option value="2025">2025</option>
                                                    <option value="2026">2026</option>
                                                    <option value="2027">2027</option>
                                                    <option value="2028">2028</option>
                                                    <option value="2029">2029</option>
                                                    <option value="2030">2030</option>
                                                    <option value="2031">2031</option>
                                                    <option value="2032">2032</option>
                                                    <option value="2033">2033</option>
                                                    <option value="2034">2034</option>
                                                </select>
                                            </div>
                                            <div className="px-2 w-1/3">
                                                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Security code</label>
                                                <input name="cardCVV" className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors" placeholder="000" type="number" value={formData.cardCVV} onChange={handleFormChange} required />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="block w-full max-w-xs mx-auto bg-blue-500 hover:bg-blue-500 focus:bg-blue-500 text-white rounded-lg px-3 py-2 font-semibold"><i className="mdi mdi-lock-outline mr-1"></i>Pay Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}