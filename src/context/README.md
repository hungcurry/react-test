#### 1.pure 影響檔案
```jsx
// 只使用 useContext
context/pure/ProductContext.tsx
```

#### 组件使用方式
```jsx
components/ProvidProduct.tsx

import type { TProduct , TProvideProduct } from '@/context/pure/ProductContext'
import { ProductContext, useProduct } from '@/context/pure/ProductContext'
```



#### 2.complex 影響檔案
```jsx
// 混和使用 useContext + useReducer 完整範例

// jsx-基本範例
context/complex/BaseContent.jsx
// TSx-基本範例
context/complex/CartContext.tsx

// TS-完整購物車範例 (~~看這個就好~~ )
context/complex/CountContext.tsx
```

#### 组件使用方式
```jsx
import { CartProvider } from '@/context/complex/CartContext'
import Child from './components/Child'

<CartProvider>
  <div className="App">
    <Child />
  </div>
</CartProvider>
```
