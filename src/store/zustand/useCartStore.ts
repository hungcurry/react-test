import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
// pnpm install immer
import { immer } from 'zustand/middleware/immer'

// ----------- Types -----------
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

type TCartStore = {
  items: TCartItem[];
  addToCart: (product: TProduct) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
};

// ----------- v5寫法 + devtools -----------
// export const useCartStore = create<TCartStore>()(
//   devtools(
//     (set, get) => ({
//       items: [],

//       // items: [
//       //   {
//       //     product: {
//       //       id: number;
//       //       title: string;
//       //       description: string;
//       //       price: number;
//       //       image: string;
//       //       category: string;
//       //     };
//       //     quantity: number;
//       //   },
//       // ]

//       // 🔥有使用 get：後面通常用 set( {} )
//       // 🔥不使用 get：
//             * 完整版：set((state) => { return {…} })
//             * 簡寫版：set((state) => ({ … }))

//       addToCart: (product) => {
//         const { items } = get();
//         console.log('store', get());
//         console.log('items', items);

//         const existing = items.find(item => item.product.id === product.id);

//         if (existing) {
//           set({
//             items: items.map(item =>
//               item.product.id === product.id
//                 ? { ...item, quantity: (item.quantity ?? 0)+ 1 }
//                 : item
//             )
//           });
//         } 
//         else {
//           set({
//             items: [
//               ...items, 
//               { product, quantity: 1 }
//             ]
//           });
//         }
//       },
//       removeFromCart: (productId) => {
//         const { items } = get();
//         set({ items: items.filter(item => item.product.id !== productId) });
//       },
//       updateQuantity: (productId, quantity) => {
//         const { items } = get();

//         // 防呆: 數量小於等於0就移除該商品
//         if (quantity <= 0) {
//           set({ 
//             items: items.filter(item => item.product.id !== productId) 
//           });
//           return;
//         }

//         set({
//           items: items.map(item =>
//             item.product.id === productId
//               ? { ...item, quantity }
//               : item
//           )
//         });
//       },
//       clearCart: () => {
//         set({ items: [] });
//       },

//       // computed values
//       // Getter運算後的結果（必須先呼叫）
//       getTotalItems: () => {
//         return get().items.reduce((total, item) => total + item.quantity, 0);
//       },
//       getTotalPrice: () => {
//         return get().items.reduce((total, item) => total + item.product.price * item.quantity,0);
//       },

      
//     }),
//     { 
//       // devtools 中顯示的 store 名稱
//       name: 'cart-store',
//       // 只在開發環境啟用
//       enabled: process.env.NODE_ENV === 'development'
//     }
//   )
// );



// ----------- v5寫法 + devtools + Immer -----------
export const useCartStore = create<TCartStore>()(
  devtools(
    immer((set, get) => ({
      items: [],

      // items: [
      //   {
      //     product: {
      //       id: number;
      //       title: string;
      //       description: string;
      //       price: number;
      //       image: string;
      //       category: string;
      //     };
      //     quantity: number;
      //   },
      // ]

      // ❌ 不要 return
      // 🔥用 set( (state) ⇒ { .. } )

      addToCart: (product) => {
        set((state) => {
          // Immer 草稿階段 → console.log 看不到正常資料
          const existing = state.items.find((item) => item.product.id === product.id)

          if (existing) {
            existing.quantity += 1
          } 
          else {
            state.items.push({
              product,
              quantity: 1,
            })
          }
        }, false, "cart/addToCart")

        // 🔥 真正的狀態（已經 commit 完成）
        console.log("AFTER:", get().items);

      },
      removeFromCart: (productId) => {
        set((state) => {
          // Immer 草稿階段 → console.log 看不到正常資料
          state.items = state.items.filter((item) => item.product.id !== productId)
        }, false, "cart/removeFromCart")
      },
      updateQuantity: (productId, quantity) => {
        set((state) => {
          // Immer 草稿階段 → console.log 看不到正常資料

          // 防呆: 數量小於等於0就移除該商品
          if (quantity <= 0) {
            state.items = state.items.filter((item) => item.product.id !== productId)
            return
          }

          const existing = state.items.find((item) => item.product.id === productId)
          if (existing) {
            existing.quantity = quantity
          }
        }, false, "cart/updateQuantity")
      },
      clearCart: () => {
        set((state) => {
          // Immer 草稿階段 → console.log 看不到正常資料
          state.items = []
        }, false, "cart/clearCart")

        // 🔥 真正的狀態（已經 commit 完成）
        console.log("AFTER:", get().items);
      },

      // computed values
      // Getter運算後的結果（必須先呼叫）
      // Getter 類型（不進 Immer / 不進 DevTools）
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.product.price * item.quantity,0);
      },


    })),
    {
      // devtools 中顯示的 store 名稱
      name: 'cart-store',
      // 只在開發環境啟用
      enabled: process.env.NODE_ENV === 'development'
    }
  )
)
