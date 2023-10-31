import React from 'react'
import { Routes,Route } from 'react-router-dom'
import LoginForm from './Login'
import RegistrationForm from './Register'
import Home from './user/Home'
import AdminHome from './admin/AdminHome'
import SellerHome from './seller/SellerHome'

function MainRouter() {
  return (
    <div>
      <Routes>
        {/*  */}
        <Route path="/" element={<LoginForm />} />
        <Route path='register' element={<RegistrationForm/>}/>



        {/* user */}
        <Route path='/user-dashboard' element={<Home/>}/>


        {/* admin */}
        <Route path='admin-dashboard'element={<AdminHome/>}/>


        {/* seller */}
        <Route path='seller-dashboard'element={<SellerHome/>}/>


    </Routes>
    </div>
  )
}

export default MainRouter
