import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './component/Home/Home'
import Admin from './component/admin/Admin'
import Search from './component/admin/adProduct/Search/Search'
import ProductDetailed from './component/productDetailed/ProductDetailed'
import Render from './component/render/Product'
import Cart from './pages/cart/Cart'
import Login from './pages/login/Login'
import Register from './pages/register/Register'


export default function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path="/category/:id" element={<Render />} />
            <Route path="/search" element={<Search />} />
            <Route path="/ProductDetailed/:id" element={<ProductDetailed />} />
        </Routes>
    )
}
