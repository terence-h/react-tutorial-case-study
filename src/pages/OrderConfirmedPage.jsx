import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import products from '../data/products.json';

export default function OrderConfirmed() {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = useMemo(() => location.state || null, [location.state]);

    useEffect(() => {
        if (!formData)
            navigate("/");
    }, [formData, navigate])

    if (!formData)
        return <></>

    return (
        <div className="container md:w-3/4 py-5 mx-auto">
            <div className="px-5">
                <div className="mb-2">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-600">Order Confirmed</h1>
                </div>
            </div>
            <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800 rounded-lg shadow-md">
                <div className="w-full">
                    <div className="-mx-3 md:flex items-start">
                        <div className="px-3 md:w-7/12 lg:pr-10">
                            {Object.values(formData.order).map((cartItem) => {
                                const item = products.find(product => product.id === cartItem.id);
                                const itemSubTotal = (item.price * cartItem.quantity);

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
                                        <span className="font-semibold">${formData.subTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="w-full flex items-center">
                                    <div className="flex-grow">
                                        <span className="text-gray-600">Shipping</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semibold">${formData.shipping.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                                <div className="w-full flex items-center">
                                    <div className="flex-grow">
                                        <span className="text-gray-600">Total</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semibold">${(formData.subTotal + formData.shipping).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-3 md:w-5/12">
                            <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                                <div className="mb-2">
                                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Full Name</label>
                                    <p className="ml-1">{formData.fullName}</p>
                                </div>

                                <div className="mb-2">
                                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">E-mail</label>
                                    <p className="ml-1">{formData.email}</p>
                                </div>

                                <div className="mb-2">
                                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Address</label>
                                    <p className="ml-1">{formData.address}</p>
                                </div>

                                <div className="mb-2">
                                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Zip/Postal Code</label>
                                    <p className="ml-1">{formData.zipPostal}</p>
                                </div>
                            </div>
                            {/* <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                                    <div className="w-full p-3 border-b border-gray-200">
                                        <div className="mb-2">
                                            <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Name on card</label>
                                            <p>{formData.cardName}</p>
                                        </div>
                                        <div className="mb-2">
                                            <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Card number</label>
                                            <p>{formData.cardNumber}</p>
                                        </div>
                                        <div className="mb-2 -mx-2 flex items-end">
                                            <div className="px-2 w-1/3">
                                                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Expiration date</label>
                                                <p>{formData.cardExpMth}</p>
                                            </div>
                                            <div className="px-2 w-1/3">
                                                <p>{formData.cardExpMth}</p>
                                            </div>
                                            <div className="px-2 w-1/3">
                                                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Security code</label>
                                                <p>{formData.cardCVV}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}