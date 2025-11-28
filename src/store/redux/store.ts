import { configureStore } from '@reduxjs/toolkit';
// 匯入各 Slice 的 reducer
import cartReducer from '@/store/redux/cartSlice';

// import cartReducer from './cart/cartSlice';
// import userReducer from './user/userSlice';
// ✔ 你會把所有 Slice 掛到這裡
// ✔ 全專案就靠這個來提供狀態

export const store = configureStore({
  reducer: {  
    //  這裡寫法 會影響 useSelector 取值的名子    
    cart: cartReducer,
    // 變成 state.cart.items,
    // user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
