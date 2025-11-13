// 購物車頁面

import React from 'react';
import CartItemComponent from '../components/CartItem';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cartItems, clearCart, getTotalPrice } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency: 'TWD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (cartItems.length === 0) {
    return (
      <div className="main-content">
        <h1 className="page-title">🛒 購物車</h1>
        <div className="cart-container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 18C5.9 18 5.01 18.9 5.01 20S5.9 22 7 22 8.99 21.1 8.99 20 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5H5.21L4.27 3H1V2ZM17 18C15.9 18 15.01 18.9 15.01 20S15.9 22 17 22 18.99 21.1 18.99 20 18.1 18 17 18Z" fill="#64748b"/>
              </svg>
            </div>
            <h3>購物車是空的</h3>
            <p>快去產品列表頁面選購商品吧！</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <h1 className="page-title">🛒 購物車</h1>
      
      <div className="cart-container">
        {cartItems.map((item) => (
          <CartItemComponent key={item.product.id} item={item} />
        ))}
        
        <div className="cart-summary">
          <div className="total-price">
            總計：{formatPrice(getTotalPrice())}
          </div>
          <button 
            className="add-to-cart-btn"
            onClick={clearCart}
            style={{ 
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              marginTop: '1rem'
            }}
          >
            🗑️ 清空購物車
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
