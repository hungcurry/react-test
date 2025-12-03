#### 安裝指令
```jsx
pnpm install zustand
pnpm install immer
```

#### Zustand 影響檔案
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
import { useCartStore } from '@/store/zustand/useCartStore';

export default function Demo() {
    // 禁止解構 useStore()，一律用 selector 精準訂閱，
    // 避免整個 store 被訂閱造成無效 rerender。
    // vue用法 : const { updateTodo } = TodoStore()
    
    // React正確用法
    const addToCart = useCartStore(s => s.addToCart);
    // Getter運算後的結果（必須先呼叫）
    const getTotalPrice = useCartStore(s => s.getTotalPrice() );
    
    const handleAddToCart = () => {
      const product = {
        id:1, 
        title:"AAA", 
        description:"", 
        price:100, 
        image:"", 
        category:""
      }
      // ~Zustand方式
      addToCart(product);
    }

  return (
    <div>
      <button onClick={ handleAddToCart }>
        加到購物車
      </button>

      <p>總金額：{ getTotalPrice }</p>
    </div>
  );
}
```
