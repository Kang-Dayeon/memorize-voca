// ** react
import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

// ** store
import { useUserStore } from '../pages/auth/store/useUser'

// ** pages
import Login from '../pages/auth/login'
import WordCategory from '../pages/words/wordCategory'
import Steps from '../pages/words/wordCategory/steps'
import Memorize from '../pages/words/wordCategory/memorize'
import TestWords from '../pages/words/testWords'

const Router = () => {
  // ** react
  const navigate = useNavigate()

  // ** recoil
  const {isLogin} = useUserStore()

  const homeRoute = () => {
    if(isLogin) {
      return '/wordCategory'
    } else  {
      return '/login'
    }
  }

  useEffect(() => {
    if(isLogin){
      navigate('/wordCategory')
    } else {
      navigate('/login')
    }
  }, [isLogin])

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to={homeRoute()}/>} />
        <Route path="/wordCategory" element={<WordCategory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/steps/:key" element={<Steps />} />
        <Route path="/memorize/:key" element={<Memorize />} />
        <Route path="/testWords/" element={<TestWords />} />
      </Routes>
    </>
  )
}

export default Router