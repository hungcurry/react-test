#### 安裝指令
```jsx
pnpm add @reduxjs/toolkit react-redux
```

```jsx
src/
  store/
    store.ts  ← 全專案唯一的 store
    cart/
      cartSlice.ts
      cartSelectors.ts
    user/
      userSlice.ts
      userSelectors.ts
```

#### Redux Toolkit 影響檔案
```jsx
App.tsx
Navbar.tsx
ProductCard.tsx
Cart.tsx
CartItem.tsx
//---
store/redux/*
```

#### 组件使用方式
📌 加入購物車
```jsx
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/redux/cartSlice';

const dispatch = useDispatch();

dispatch(addToCart(product));
```

📌 取得購物車資料（用 selector）
```jsx
import { useTotalItems } from '@/store/redux/cartSelectors';
const cartItems = useTotalItems();
```

📌 總數量 & 總價格
```jsx
import { useCartItems , useTotalPrice } from '@/store/redux/cartSelectors';
const cartItems = useCartItems();
const getTotalPrice = useTotalPrice();
```

📌 更新數量
```jsx
dispatch(updateQuantity({ productId: 10, quantity: 3 }));
```


📌 移除商品 / 清空購物車
```jsx
dispatch(removeFromCart( id ));
dispatch(clearCart());
```



