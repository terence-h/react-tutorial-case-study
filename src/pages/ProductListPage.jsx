import { useState } from 'react';
import SimpleProductListing from '../components/SimpleProductListing';
import products from '../data/products.json';

export default function ProductList() {
    const [filter, setFilter] = useState("");

    function onChangeFilter(e) {
        setFilter(e.target.value);
        console.log(e.target.value);
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-600 text-center mb-5">Products</h1>
            <div className='flex justify-center'>
                <select name="filter" className="form-select w-fit px-3 py-2 mb-4 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors cursor-pointer" value={filter} onChange={onChangeFilter}>
                    <option value="">Show All PC</option>
                    <option value="windows">Show Windows PC only</option>
                    <option value="macos">Show MacOS PC only</option>
                </select>
            </div>

            <div className='flex flex-row flex-wrap gap-10 justify-center'>
                {products
                    .filter((product) => filter === "" || product.category === filter)
                    .map((product) => (
                        <SimpleProductListing key={product.id} id={product.id} name={product.name} price={product.price} path={product.path} />
                    ))}
            </div>
        </div>
    );
}