import {atom, useRecoilState} from 'recoil'
import {users} from '../../../database/users'

const loginUserState = atom({
  key: 'loginUserState',
  default: {}
})

const usersState = atom({
  key: 'usersState',
  default: users
})

const isLoginState = atom({
  key: 'isLoginState',
  default: false
})

export const useLoginUserStore = () => {
  const [loginUser, setLoginUser] = useRecoilState(loginUserState)
  const [users, setUsers] = useRecoilState(usersState)
  const [isLogin, setIsLogin] = useRecoilState(isLoginState)

  return{
    loginUser,
    setLoginUser,
    users,
    setUsers,
    isLogin,
    setIsLogin
  }
}