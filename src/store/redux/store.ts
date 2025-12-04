import { configureStore } from '@reduxjs/toolkit';
// 匯入各 Slice 的 reducer
import cartReducer from '@/store/redux/cartSlice';

// import cartReducer from './cart/cartSlice';
// import userReducer from './user/userSlice';
// ✔ 你會把所有 Slice 掛到這裡
// ✔ 全專案就靠這個來提供狀態


// 順序性
// 1. 建立store/index.ts 進入點
// 2. 建立各個 slice (cartSlice.ts)
// 3. 在 store.ts 引入各個 slice 的 reducer 並 combine 起來
// 4. 建立Selector (cartSelectors.ts) 
//    把 RootState 傳進去 取得對應 slice 的資料
// 5. 在 App.tsx 用 <Provider> 把 store 傳進去


export const store = configureStore({
  // 引入需要全域檔案
  reducer: {  
    // !這裡寫法 會影響 useSelector 取值的名子  

    // 1.todoSlice,
    // 變成 state.todoSlice.todoList
      
    cart: cartReducer,
    // 變成 state.cart.items,
      
    // 3.user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
