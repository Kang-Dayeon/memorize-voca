// ** react
import React from 'react'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
// ** store
import {useUser} from '../store/useUser'

const SignIn = () => {
  // ** store
  const {users, setLoginUser, setIsLogin} = useUser()

  // ** react library
  const {register, handleSubmit} = useForm()

  const handleLogin = (data) => {
    if (!users.some((user) => user.loginId === data.loginId)) {
      alert('아이디가 일치하지 않습니다.')
    } else if (!users.some((user) => user.password === data.password)) {
      alert('비밀번호가 일치하지 않습니다')
    } else {
      const find = users.find(
        (user) => (user.loginId === data.loginId) &&
          (user.password === data.password))
      setLoginUser({...find})
      setIsLogin(true)
    }
  }

  const handleError = (errors) => {
    errors.loginId ?
      alert(errors.loginId.message) :
      alert(errors.password.message)
  }

  return (
    <div className="form">
      <div className="form__wrap">
        <h3 className="form__title">Sign in</h3>
        <form className="form__content"
              onSubmit={handleSubmit(handleLogin, handleError)}>
          <input className="input"
                 type="text"
                 placeholder="write your ID"
                 {...register('loginId', {
                   required: 'Check your ID',
                 })}
          />
          <input className="input"
                 type="password"
                 placeholder="write your password"
                 {...register('password', {
                   required: 'Check your password',
                 })}
          />
          <button className="form__btn btn" type="submit">Sign in</button>
        </form>
        <div className="form__link-box">
          <span>You don't have account? </span>
          <Link to={'/sign-up'}>Sign up</Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn