// 產品卡片元件

import { SyntheticEvent } from 'react'
// import React from 'react';
import { Product } from '../types';

// ~useContext + useReducer方式
// import { useCart } from '@/context/complex/CartContext'

// ~Redux方式
// import { useDispatch } from 'react-redux';
// import { addToCart } from '@/store/redux/cartSlice';

// ~Zustand方式
import { useCartStore } from '@/store/zustand/useCartStore';

type TProps = {
  product: Product
}

const ProductCard = ({ product }: TProps) => {

  // ~useContext + useReducer方式
  // const { addToCart } = useCart();

  // ~Redux方式
  // const dispatch = useDispatch();

  // ~Zustand方式
  const addToCart = useCartStore((s) => s.addToCart);
  

  const handleAddToCart = () => {
    // addToCart(product);

    // ~Redux方式
    // dispatch(addToCart(product));

    // ~Zustand方式
    addToCart(product);
  }

  const handleError = (e:SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjFGNUY5Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDIyNVYxNzVIMTc1VjEyNVoiIGZpbGw9IiNFMkU4RjAiLz4KPHN2Zz4K';
  }

  const handleFormatPrice = (price: number) => {
    return new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency: 'TWD',
      minimumFractionDigits: 0,
    }).format(price);
  }

  return (
    <div className="product-card">
      <img 
        src={product.image} 
        alt={product.title}
        className="product-image"
        onError={handleError}
      />
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price">{handleFormatPrice(product.price)}</div>
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 18C5.9 18 5.01 18.9 5.01 20S5.9 22 7 22 8.99 21.1 8.99 20 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5H5.21L4.27 3H1V2ZM17 18C15.9 18 15.01 18.9 15.01 20S15.9 22 17 22 18.99 21.1 18.99 20 18.1 18 17 18Z" fill="white"/>
          </svg>
          加入購物車
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
