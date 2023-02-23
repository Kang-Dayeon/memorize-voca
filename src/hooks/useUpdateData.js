import {useEffect, useState} from 'react'
import {useWords} from '../pages/words/store/useWords'
import {useUser} from '../pages/auth/store/useUser'

function useUpdateData() {
  // ** recoil
  const {selectedStep} = useWords()
  const {users, setUsers, loginUser, setLoginUser} = useUser()

  const [testWord, setTestWord] = useState(null)

  // 학습한 내용 유저에 업데이트
  const addHistory = () => {
    setLoginUser((loginUser) => {
      return {
        ...loginUser,
        historyLearn: [
          ...loginUser.historyLearn,
          {
            category: selectedStep[0].category,
            step: selectedStep[0].step,
            date: new Date().toLocaleString()
          },
        ],
      }
    })
  }

  // 테스트 내용 업데이트시 중복되는 단어 필터링
  useEffect(() => {
    if(testWord !== null){
      const passWord = testWord.pass
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
            pass: filterPassWord,
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

  // 로그인 유저가 레벨 학습시 히스토리 업로드
  useEffect(() => {
    if (selectedStep) {
      addHistory()
    }
  }, [selectedStep])

}

export default useUpdateData