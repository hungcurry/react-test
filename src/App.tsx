// 主要 App 元件

import React from 'react'
import { Routes, Route } from 'react-router-dom'

// ~useContext + useReducer方式
// import { CartProvider } from '@/context/complex/CartContext'

// ~Redux方式
// import { Provider } from 'react-redux';
// import { store } from '@/store/redux/store';

import Navbar from './components/Navbar' 
// Pages
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import Cart from './pages/Cart'

const App: React.FC = () => {

  return (

    // !影響檔案
    // App.tsx
    // Navbar.tsx
    // ProductCard.tsx
    // Cart.tsx
    // CartItem.tsx

    // ~useContext + useReducer方式
    // <CartProvider>
    //   <div className="App">
    //     <Navbar />

    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/products" element={<ProductList />} />
    //       <Route path="/cart" element={<Cart />} />
    //     </Routes>
    //   </div>
    // </CartProvider>

    // ~Redux方式
    // <Provider store={store}>
    //   <div className="App">
    //     <Navbar />

    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/products" element={<ProductList />} />
    //       <Route path="/cart" element={<Cart />} />
    //     </Routes>
    //   </div>
    // </Provider>

    // ~Zustand方式
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>

  )
}

export default App
