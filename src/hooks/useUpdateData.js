import {useEffect, useState} from 'react'
import {useUser} from '../pages/auth/store/useUser'

function useUpdateData() {
  // ** recoil
  const {users, setUsers, loginUser, setLoginUser} = useUser()

  // ** state
  const [testWord, setTestWord] = useState(null)

  // 테스트 내용 업데이트시 중복되는 단어 필터링
  useEffect(() => {
    if(testWord){
      const passWord = testWord.passed
      const failedWord = testWord.failed
      const filterPassWord = passWord.reduce((acc,current) => {
        if(acc.findIndex(({id}) => id === current.id) === -1){
          acc.push(current)
        }
        return acc
      }, [])
      const filterFailedWord = failedWord.reduce((acc,current) => {
        if(acc.findIndex(({id}) => id === current.id) === -1){
          acc.push(current)
        }
        return acc
      }, [])

      setLoginUser((loginUser) => {
        return {
          ...loginUser,
          historyTest: {
            passed: filterPassWord,
            failed: filterFailedWord,
          },
        }
      })
    }
  }, [testWord])


  // 로그인 유저 정보 변하면 실행될 함수
  useEffect(() => {
    if (loginUser) {
      const filterUser = users.filter((item) => item.id !== loginUser.id)
      filterUser.push(loginUser)
      setUsers([...filterUser])
      // 테스트 히스토리 생기면 변수에 업로드
      if(loginUser.historyTest){
        setTestWord(loginUser.historyTest)
      }
    }
  }, [loginUser])

}

export default useUpdateData