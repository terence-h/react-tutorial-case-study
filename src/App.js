import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { lazy, Suspense } from "react";

const ProductList = lazy(() => import('./pages/ProductList'));
const DetailedProduct = lazy(() => import('./pages/DetailedProduct'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<DetailedProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}