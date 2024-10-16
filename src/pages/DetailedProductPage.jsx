import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import products from '../data/products.json';
import ProductDetails from "../components/ProductDetails";

export default function DetailedProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const product = products.find(product => product.id.toString() === id);

    useEffect(() => {
        if (!product)
            navigate('/');
    }, [navigate, product]);

    if (!product)
        return <></>

    return (
        <>
            <ProductDetails id={product.id} name={product.name} specifications={product.specifications} price={product.price} path={product.path} />
        </>
    );
}