// 購物車項目元件

import { SyntheticEvent } from 'react'
// import React from 'react';
import { CartItem } from '../types';

// ~useContext + useReducer方式
import { useCart } from '@/context/complex/CartContext'

// ~Redux方式
// import { useDispatch } from 'react-redux';
// import { updateQuantity , removeFromCart } from '@/store/redux/cartSlice';

// ~Zustand方式
// import { useCartStore } from '@/store/zustand/useCartStore';

type TProps = {
  data: CartItem;
}

const CartItemComponent= ({ data } : TProps) => {
  // ~useContext + useReducer方式
  const { updateQuantity, removeFromCart } = useCart();

  // ~Redux方式
  // const dispatch = useDispatch();

  // ~Zustand方式
  // const updateQuantity = useCartStore((s) => s.updateQuantity);
  // const removeFromCart = useCartStore((s) => s.removeFromCart);

  const handleQuantityChange = (newQuantity: number) => {
    // ~useContext + useReducer方式
    updateQuantity(data.product.id, newQuantity);

    // ~Redux方式
    // dispatch(updateQuantity({ productId: data.product.id, quantity: newQuantity }));

    // ~Zustand方式
    // updateQuantity(data.product.id, newQuantity);
  };

  const handleRemove = () => {
    // ~useContext + useReducer方式
    // removeFromCart(data.product.id);

    // ~Redux方式
    // dispatch(removeFromCart(data.product.id));

    // ~Zustand方式
    removeFromCart(data.product.id);
  };

  const handleError = (e:SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjFGNUY5Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDIyNVYxNzVIMTc1VjEyNVoiIGZpbGw9IiNFMkU4RjAiLz4KPHN2Zz4K';
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency: 'TWD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="cart-item">
      <img 
        src={data.product.image} 
        alt={data.product.title}
        className="cart-item-image"
        onError={ handleError}
      />
      <div className="cart-item-info">
        <div className="cart-item-title">{data.product.title}</div>
        <div className="cart-item-price">{formatPrice(data.product.price)}</div>
      </div>
      <div className="cart-item-controls">
        <button 
          className="quantity-btn"
          onClick={() => handleQuantityChange(data.quantity - 1)}
          disabled={data.quantity <= 1}
        >
          −
        </button>
        <span className="quantity-display">{data.quantity}</span>
        <button 
          className="quantity-btn"
          onClick={() => handleQuantityChange(data.quantity + 1)}
        >
          +
        </button>
        <button 
          className="remove-btn"
          onClick={handleRemove}
        >
          移除
        </button>
      </div>
    </div>
  );
};

export default CartItemComponent;
