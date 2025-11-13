// 購物車項目元件

import React from 'react';
import { CartItem } from '../types';
import { useCart } from '../context/CartContext';

interface CartItemComponentProps {
  item: CartItem;
}

const CartItemComponent: React.FC<CartItemComponentProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.product.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.product.id);
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
        src={item.product.image} 
        alt={item.product.title}
        className="cart-item-image"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjFGNUY5Ii8+CjxwYXRoIGQ9Ik0zNSAzNUg0NVY0NUgzNVYzNVoiIGZpbGw9IiNFMkU4RjAiLz4KPC9zdmc+';
        }}
      />
      <div className="cart-item-info">
        <div className="cart-item-title">{item.product.title}</div>
        <div className="cart-item-price">{formatPrice(item.product.price)}</div>
      </div>
      <div className="cart-item-controls">
        <button 
          className="quantity-btn"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          −
        </button>
        <span className="quantity-display">{item.quantity}</span>
        <button 
          className="quantity-btn"
          onClick={() => handleQuantityChange(item.quantity + 1)}
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
