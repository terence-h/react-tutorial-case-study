import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { lazy, Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";

const ProductList = lazy(() => import('./pages/ProductListPage'));
const DetailedProduct = lazy(() => import('./pages/DetailedProductPage'));
const Cart = lazy(() => import('./pages/CartPage'));
const Checkout = lazy(() => import('./pages/CheckoutPage'));
const OrderConfirmed = lazy(() => import('./pages/OrderConfirmedPage'));
const NotFound = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<DetailedProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orderconfirmed" element={<OrderConfirmed />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <ScrollToTop />
    </BrowserRouter>
  );
}