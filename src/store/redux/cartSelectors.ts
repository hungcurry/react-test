import { useSelector } from 'react-redux';
import { RootState } from '@/store/redux/store';

// state 資料
// cart: {
//   items:[
//     {
//       "product": {
//         "id": 1,
//         "title": "MacBook Pro 16\"",
//         "description": "配備 M3 Pro 晶片的專業級筆記型電腦，適合開發者和創作者使用",
//         "price": 79900,
//         "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
//         "category": "電腦"
//       },
//       "quantity": 1
//     },
//     {
//       "product": {
//         "id": 2,
//         "title": "iPhone 15 Pro",
//         "description": "最新款 iPhone，搭載 A17 Pro 晶片，支援 USB-C 連接",
//         "price": 36900,
//         "image": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
//         "category": "手機"
//       },
//       "quantity": 1
//     },
//   ]
// }


// 取得購物車全部 items
export const useCartItems = () => {
  return useSelector((state: RootState) => {
    // console.log('state' , state)
    return state.cart.items; 
  });
};

// 取得總商品數量
export const useTotalItems = () => {
  return useSelector((state: RootState) => {
    const totalItems = state.cart.items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    return totalItems;
  });
};

// 取得總價格
export const useTotalPrice = () => {
  return useSelector((state: RootState) => {
    const totalPrice = state.cart.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    },0);

    return totalPrice;
  }); 
};
