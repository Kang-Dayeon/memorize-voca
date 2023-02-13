import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Login from '../pages/auth/login'
import {useLoginUserStore} from '../pages/auth/store/useLoginUser'
import WordCategory from '../pages/words/wordCategory'

const Router = () => {
  const {isLogin} = useLoginUserStore()

  const homeRoute = () => {
    if(isLogin) {
      return '/wordCategory'
    } else  {
      return '/login'
    }
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to={homeRoute()}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/wordCategory" element={<WordCategory />} />
      </Routes>
    </>
  )
}

export default Router