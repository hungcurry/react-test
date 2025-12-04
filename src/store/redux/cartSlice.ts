import { createSlice, PayloadAction , current } from '@reduxjs/toolkit';
// PayloadAction<T> 只是 TypeScript 用來標記 payload 型別的，不加也能跑，加了比較安全。
// ✔ 好處 1：action.payload 會有型別提示
// 輸入 action.payload. 時 VS Code 會知道它是 number。



// RTK 最大優勢：可以直接修改 state（Immer 幫你產生不可變資料）
// → 不用 .map()、不用建立新陣列 👍

type TProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
};
type TCartItem = {
  product: TProduct;
  quantity: number;
};
type TCartState = {
  items: TCartItem[];
};
const initialState: TCartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  // initialState 是初始的狀態
  initialState,
  reducers: {
    // 加入購物車
    addToCart: (state, action: PayloadAction<TProduct>) => {
      // ⭐ 看資料結構方式 : current(state)
      console.log("state", current(state));
      console.log('action' , action);

      const existing = state.items.find((item) => item.product.id === action.payload.id);

      if (existing) {
        existing.quantity += 1;
      } 
      else {
        state.items.push({ 
          product: action.payload, 
          quantity: 1 
        });
      }
      console.log("state", current(state));
    },
    // 移除
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
    },
    // 更新數量
    updateQuantity: (state,action: PayloadAction<{ productId: number; quantity: number }>) => {
      const { productId, quantity } = action.payload;

      // 防呆: 數量小於等於0就移除該商品
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.product.id !== productId);
        return;
      }

      const existing = state.items.find((item) => item.product.id === productId);
      if (existing) {
        existing.quantity = quantity;
      }
    },
    // 清空購物車
    clearCart: (state) => {
      state.items = [];
    },
  },
});


// 1.actions
// 匯出 action creators（要給 React component 用）
export const { 
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart 
} = cartSlice.actions;
// 2.reducer
// 匯出 reducer（要給 store 用）
export default cartSlice.reducer;
