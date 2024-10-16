import { Link } from "react-router-dom";

export default function SimpleProductListing({ id, name, price, path }) {
    return (
        <Link to={`/product/${id}`}>
            <div className={`max-w-xs rounded-md overflow-hidden shadow-lg hover:scale-105 transition duration-300`}>
                <img src={path} alt="Product" />
                <div className="py-4 px-4 bg-white">
                    <h3 className="text-lg font-semibold text-gray-600">{name}</h3>
                    <p className="mt-4 text-lg text-gray-500">${price.toFixed(2)}</p>
                </div>
            </div>
        </Link>
    );
}