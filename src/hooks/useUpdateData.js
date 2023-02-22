import {useEffect} from 'react'
import {useWords} from '../pages/words/store/useWords'
import {useUser} from '../pages/auth/store/useUser'

function useUpdateData() {
  // ** recoil
  const {selectedStep} = useWords()
  const {users, setUsers, loginUser, setLoginUser} = useUser()

  const addHistory = () => {
    setLoginUser((loginUser) => {
      return {
        ...loginUser,
        history: [
          ...loginUser.history,
          {
            category: selectedStep[0].category,
            step: selectedStep[0].step,
            words: selectedStep,
          },
        ],
      }
    })
  }

  // 로그인 유저의 희스토리를 스테이트에 담아줌
  useEffect(() => {
    if (loginUser) {
      const filterUser = users.filter((item) => item.id !== loginUser.id)
      filterUser.push(loginUser)
      setUsers([...filterUser])
    }
  }, [loginUser])

  // 로그인 유저가 레벨 학습시 히스토리 업로드
  useEffect(() => {
    if (selectedStep) {
      addHistory()
    }
  }, [selectedStep])

}

export default useUpdateData