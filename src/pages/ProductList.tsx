// 產品列表頁面

import React from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../data/products';

const ProductList: React.FC = () => {
  return (
    <>
      <Header />
      <div className="main-content">
        <h1 className="page-title">🛍️ 產品列表</h1>
        
        <div className="products-grid">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
