#### 安裝指令
```jsx
pnpm install zustand
```

#### 组件使用方式
📌 加入購物車
```jsx
import { useCartStore } from '@/store/zustand/useCartStore';

export default function Demo() {
  const { items, addToCart, getTotalPrice } = useCartStore();

    const handleAddToCart = () => {
      // ~Zustand方式
      addToCart(
        {id:1, title:"AAA", description:"", price:100, image:"", category:""}
      );
    }

  return (
    <div>
      <button onClick={ () => addToCart() }>
        加到購物車
      </button>

      <p>總金額：{ getTotalPrice() }</p>
    </div>
  );
}
```
