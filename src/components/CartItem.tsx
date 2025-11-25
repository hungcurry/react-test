// 購物車項目元件

import { SyntheticEvent } from 'react'
// import React from 'react';
import { CartItem } from '../types';
import { useCart } from '../context/CartContext';

type TProps = {
  data: CartItem;
}

const CartItemComponent= ({ data } : TProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(data.product.id, newQuantity);
  };

  const handleError = (e:SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjFGNUY5Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDIyNVYxNzVIMTc1VjEyNVoiIGZpbGw9IiNFMkU4RjAiLz4KPHN2Zz4K';
  }

  const handleRemove = () => {
    removeFromCart(data.product.id);
  };

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
