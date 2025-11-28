// 主要 App 元件

import React from 'react'
import { Routes, Route } from 'react-router-dom'

// ~useContext + useReducer方式
// import { CartProvider } from './context/CartContext'

// ~Redux方式
import { Provider } from 'react-redux';
import { store } from '@/store/redux/store';

// ~Zustand方式


import Navbar from './components/Navbar'
// Pages
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import Cart from './pages/Cart'

const App: React.FC = () => {

  return (

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
    <Provider store={store}>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Provider>

    // ~Zustand方式

  )
}

export default App
