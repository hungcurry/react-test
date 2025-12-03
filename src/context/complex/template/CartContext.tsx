// 購物車狀態管理 Context

import { createContext, useContext, useReducer, ReactNode } from 'react';
// import { CartItem, Product, CartContextType } from '../types';

// 1. 定義資料的型別
// #region types total
// 實際 資料架構
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
type TProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}
type TCartItem = {
  product: TProduct;
  quantity: number;
}
// 購物車狀態
type TCartState = {
  items: TCartItem[];
}
// #endregion

// 2. 定義 action 型別
type TCartAction =
  | { type: 'ADD_TO_CART'; payload: TProduct }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' };

// 3. Context 型別：一定要寫 <TProvid | null>
type TProvid = {
  cartItems: TCartItem[];
  addToCart: (product: TProduct) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// 4.初始狀態 ( 請注意通常初始的狀態會是一個物件 / 能隨時擴充)。
const initialState: TCartState = {
  items: [],
};
// 5. 建立 Context
const CartContext = createContext<TProvid | null>(null)
// 自訂 Hook - 讓元件更容易使用 Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('Context not found.')
  }
  return context;
}

// 6. reducer：TS 自動推論 state 與 action 型別
const cartReducer = (state: TCartState, action: TCartAction): TCartState => {
  console.log(`state` , state);
  console.log(`action` , action);

  // state : {
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
  // }

  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      
      if (existingItem) {
        // 如果商品已存在，增加數量
        return {
          ...state,
          // 這邊要比對id  所以用map跑回圈 
          items: state.items.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: (item.quantity ?? 0) + 1 }
              : item
          ),
        };
      } 
      else {
        // 如果商品不存在，新增到購物車
        return {
          ...state,
          // 製作新陣列 記憶體有變 React 才會重新渲染, 不能用push() 媽的...
          items: [...state.items, { product: action.payload, quantity: 1 }],
        };
      }
    }
    
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload),
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.product.id !== productId),
        };
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        ),
      };
    }
    
    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
      };
    }
    
    default:
      return state;
  }
};

// 7. 父元件=> Provider
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: TProduct) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const provideValue = {
    cartItems: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return (
    <CartContext.Provider value={ provideValue }>
      {/* 使用 children 類似開 slot 功能 才有辦法引入其他元件 */}
      {/* 並且 export const App */}
      {/* import Child from './components/Child' */}
      {/* <Child /> */}

      { children }
    </CartContext.Provider>
  );
};

// 使用方式
// import { CartProvider } from '@/context/complex/CartContext'
// import Child from './components/Child'

// <CartProvider>
//   <div className="App">
//     <Child />
//   </div>
// </CartProvider>
