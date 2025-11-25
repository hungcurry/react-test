import type { TProduct , TProvideProduct } from '@/context/ProductContext'
import { ProductContext, useProduct } from '@/context/ProductContext'
import { useState } from 'react'

// 父元件=> Provider DataContext
function Products() {
  // 這邊看成2種宣告 所以TProvidProduct 使用2次
  // 一次物件型別 一次資料型別
  const ProductsData: TProduct = {
    title: 'PlayStation5',
    price: 15000,
  }
  const [data, setData] = useState<TProduct>(ProductsData)

  const provideValue: TProvideProduct = { data, setData }

  return (
    <ProductContext.Provider value={ provideValue }>
      <ul>
        <li key={data.title}>
          <Card {...data} />
        </li>
      </ul>
    </ProductContext.Provider>
  )
}
// 子元件 props 傳值
function Card({ title }: TProduct) {
  return (
    <div>
      <h5>子元件 產品名稱：{title}</h5>
      <hr />
      <Button />
    </div>
  )
}
// 孫子元件 => Inject  取 useProduct 
function Button() {
  const { data } = useProduct()

  const pay = () => {
    console.log(data)
    window.alert(`你已成功購買 ${data.title}`)
  }

  return (
    <button type="button" className="bg-blue-400 p-2" onClick={pay}>
      點我購買({data.price} $)
    </button>
  )
}

const UseContext: React.FC = () => {
  return (
    <div>
      <Products />
    </div>
  )
}

export default UseContext
