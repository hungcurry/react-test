import { createContext, useContext } from 'react'

// 影響檔案
// ```jsx
// // 資料
// context/ProductContext.tsx

// // 元件
// ProvidProduct.tsx
// ```

export type TProduct = {
  title: string
  price: number
}

// 背起來 很難記
type Setter<T> = React.Dispatch<React.SetStateAction<T>>

export type TProvideProduct = {
  data: TProduct
  setData: Setter<TProduct>
}

// 宣告Context 要放在全域
// Context 一開始是 null ,但之後真正使用時會是 TProvidProduct 型別
export const ProductContext = createContext<TProvideProduct | null>(null)

export function useProduct() {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('Context not found.')
  }
  return context
}
