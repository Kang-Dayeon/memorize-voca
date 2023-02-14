import React,{useEffect} from 'react'
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import Login from '../pages/auth/login'
import {useLoginUserStore} from '../pages/auth/store/useLoginUser'
import WordCategory from '../pages/words/wordCategory'
import Steps from '../pages/words/wordCategory/steps/Steps'

const Router = () => {
  const navigate = useNavigate()

  const {isLogin} = useLoginUserStore()

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
      </Routes>
    </>
  )
}

export default Router