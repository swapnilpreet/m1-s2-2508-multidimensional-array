import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Product from '../pages/Product'
import Home from '../pages/Home'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/products' element={<Product/>}/>
        <Route path='/' element={<Home/>}/>
    </Routes>
  )
}

export default AllRoutes