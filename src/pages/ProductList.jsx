import SimpleProductListing from '../components/SimpleProductListing';
import products from '../data/products.json';

export default function ProductList() {
    return (
        <div className="container mx-auto flex flex-row flex-wrap gap-10 justify-center">
            {products.map((product) => (
                <SimpleProductListing key={product.id} id={product.id} name={product.name} price={product.price} path={product.path} />
            ))}
        </div>
    );
}