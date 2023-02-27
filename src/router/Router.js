// ** react
import React, {useEffect} from 'react'
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'
// ** store
import {useUser} from '../pages/auth/store/useUser'
// ** pages
import SignIn from '../pages/auth/signIn'
import SignUp from '../pages/auth/signUp'
import WordCategory from '../pages/words/wordCategory'
import Steps from '../pages/words/wordCategory/steps'
import Memorize from '../pages/words/wordCategory/memorize'
import TestVoca from '../pages/words/wordCategory/testVoca'
import MyPage from '../pages/mypage'
import Passed from '../pages/mypage/testResult/passed'
import Failed from '../pages/mypage/testResult/failed'

const Router = () => {
  // ** react
  const navigate = useNavigate()

  // ** recoil
  const {isLogin} = useUser()

  const homeRoute = () => {
    if (isLogin) {
      return '/wordCategory'
    } else {
      return '/sign-in'
    }
  }

  useEffect(() => {
    if (isLogin) {
      navigate('/wordCategory')
    } else {
      navigate('/sign-in')
    }
  }, [isLogin])

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to={homeRoute()}/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/wordCategory" element={<WordCategory/>}/>
        <Route path="/steps/:key" element={<Steps/>}/>
        <Route path="/memorize/:key" element={<Memorize/>}/>
        <Route path="/test-voca" element={<TestVoca/>}/>
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/pass" element={<Passed />} />
        <Route path="/fail" element={<Failed />} />
      </Routes>
    </>
  )
}

export default Router