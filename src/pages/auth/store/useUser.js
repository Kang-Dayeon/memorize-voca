import {atom, useRecoilState} from 'recoil'
import {recoilPersist} from 'recoil-persist'
import {users} from '../../../database/users'

const {persistAtom} = recoilPersist()

const loginUserState = atom({
  key: 'loginUserState',
  default: null,
  effects_UNSTABLE: [persistAtom],
})

const usersState = atom({
  key: 'usersState',
  default: users,
  effects_UNSTABLE: [persistAtom],
})

const isLoginState = atom({
  key: 'isLoginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export const useUser = () => {
  const [loginUser, setLoginUser] = useRecoilState(loginUserState)
  const [users, setUsers] = useRecoilState(usersState)
  const [isLogin, setIsLogin] = useRecoilState(isLoginState)

  return {
    loginUser,
    setLoginUser,
    users,
    setUsers,
    isLogin,
    setIsLogin,
  }
}