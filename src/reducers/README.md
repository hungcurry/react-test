```jsx
// 基本使用方式
BaseReducer.jsx

// 只抽離更新邏輯出來
CartReducer.ts
```

#### 组件使用方式
```jsx
元件使用
import { useReducer } from "react";
import { cartReducer } from "@/reducers/cartReducer";

const initialState: State[] = [];

export default function Cart() {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addItem = () => {
    dispatch({
      type: "ADD",
      payload: { id: Date.now(), name: "Product A" },
    });
  };

  return (
    <div>
      <button onClick={addItem}>加入商品</button>
    </div>
  );
}
```
