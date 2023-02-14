import './login.scss'
import React from 'react'
import {useLoginUserStore} from './store/useLoginUser'
import useInput from '../../hooks/useInput'

const Login = () => {
  const {users, setLoginUser, setIsLogin} = useLoginUserStore()

  const [value, setValue] = useInput({
    loginId: '',
    password: ''
  })

  const handleLogin = (loginId, password) => {
    if(!users.some((user) => user.loginId === loginId)) {
      alert('아이디가 일치하지 않습니다.')
    } else if(!users.some((user) => user.password === password)) {
      alert('비밀번호가 일치하지 않습니다')
    } else {
      setLoginUser(users.filter((user) => (user.loginId === loginId) && (user.password === password)))
      setIsLogin(true)
    }
  }

  return (
    <div className="login">
      <div className="login__wrap">
        <h3 className="login__title">Login</h3>
        <form className="login__form">
          <input className="input" name="loginId" value={value.loginId} onChange={setValue} type="text" placeholder="write your ID" />
          <input className="input" name="password" value={value.password} onChange={setValue} type="password" placeholder="write your password" />
          <button className="login__btn btn btn__big"
            onClick={() => (value.loginId === '') ? alert('write your ID') :
            (value.password === '') ? alert('write your password') :
              handleLogin(value.loginId, value.password)
          }>LOGIN</button>
        </form>
      </div>
    </div>
  )
}

export default Login