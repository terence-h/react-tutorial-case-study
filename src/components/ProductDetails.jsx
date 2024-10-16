import { Fragment, useContext, useEffect, useState } from 'react';
import products from '../data/products.json';
import SimpleProductListing from './SimpleProductListing';
import { UserContext } from '../contexts/UserContext';
import { CartContext } from '../contexts/CartContext';

export default function ProductDetails({ id, name, specifications, price, path }) {
    const { loggedIn } = useContext(UserContext);
    const { addToCart } = useContext(CartContext);
    const [item, setItem] = useState({
        id: id,
        quantity: 1
    });

    // Update the ID and reset the quantity to 1 when the ID changes, this is necessary if navigating into the same route but different parameter
    useEffect(() => {
        setItem({
            id: id, quantity: 1
        });
    }, [id]);

    return (
        <div className="container mx-auto px-16">
            <div className="md:flex md:items-center">
                {/* <div className="w-full h-64 md:w-1/2 lg:h-96"> */}
                <img className="h-full w-full rounded-2xl object-cover max-w-lg mx-auto" src={path} alt="Product" />
                {/* </div> */}
                <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
                    <h3 className="text-lg font-semibold text-gray-600 mb-3">{name}</h3>
                    <p>CPU: {specifications.cpu}</p>
                    <p>Memory (RAM): {specifications.ram}</p>
                    <p>Storage: {specifications.storage}</p>
                    <p>Display: {specifications.display}</p>
                    <p>Graphics: {specifications.gpu}</p>
                    <p>Operating System: {specifications.os}</p>
                    <p className="text-lg text-gray-500 mt-3">${price.toFixed(2)}</p>
                    <hr className="my-3" />
                    <div className="mt-2">
                        <label className="text-gray-600 text-sm" htmlFor="count">Quantity:</label>
                        <div className="flex items-center mt-1">
                            <button className={`border rounded-md py-2 px-4 mr-2 disabled:text-gray-300`} disabled={item.quantity === 1}
                                onClick={() => { if (item.quantity === 1) return; setItem({ ...item, quantity: item.quantity - 1 }) }}>
                                -
                            </button>
                            <span className="text-gray-700 text-lg mx-2">{item.quantity}</span>
                            <button className="border rounded-md py-2 px-4 mr-2 disabled:text-gray-300" disabled={item.quantity === 5}
                                onClick={() => setItem({ ...item, quantity: item.quantity + 1 })}>
                                +
                            </button>
                            {/* <button className="text-gray-500 focus:outline-none focus:text-gray-700 hover:text-gray-700" onClick={clearCart}>Clear Cart</button> */}
                        </div>
                    </div>
                    <div className="flex items-center mt-6">
                        <button disabled={!loggedIn}
                            className="px-8 py-2 bg-stone-600 text-white text-sm font-medium rounded hover:bg-stone-500 focus:outline-none focus:bg-stone-500 disabled:bg-stone-300"
                            onClick={() => addToCart(item)}>Add To Cart
                        </button>
                    </div>
                    {!loggedIn && <p className='text-red-600'>You need to be logged in to add items to cart.</p>}
                </div>
            </div>
            <div className="mt-16">
                <h3 className="text-gray-600 text-2xl font-medium">More Products</h3>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                    {products.map((product) => {
                        if (product.id === id)
                            return <Fragment key={id}></Fragment>
                        return <SimpleProductListing key={product.id} id={product.id} name={product.name} price={product.price} path={product.path} />
                    })}
                </div>
            </div>
        </div>
    );
}