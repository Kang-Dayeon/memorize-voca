// ** react
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
// ** store
import {useWords} from '../store/useWords'
import {useUser} from '../../auth/store/useUser'

export const useTestWords = () => {
  // TODO : 로그인 유저에 맞고 틀린 단어 추가시 기존 기록에서 틀린단어나 맞는 단어 중복되지 않게 필터링

  // ** react
  const navigate = useNavigate()

  // ** store
  const {selectedStep, setSelectedStep} = useWords()
  const {loginUser, setLoginUser} = useUser()

  // ** state
  const [currentIndex, setCurrentIndex] = useState(0)
  const [display, setDisplay] = useState(false)
  const [passedWords, setPassedWords] = useState(null)
  const [failedWords, setFailedWords] = useState(null)
  const [randomAnswer, setRandomAnswer] = useState(null)
  const [filterPassed, setFilterPassed] = useState(null)
  const [filterFailed, setFilterFailed] = useState(null)

  // 테스트 내용 추가
  const addHistoryTest = () => {
    if(loginUser){
      setLoginUser((loginUser) => {
        return {
          ...loginUser,
          historyTest: {
            passed: [
              ...filterPassed,
              ...passedWords,
            ],
            failed: [
              ...filterFailed,
              ...failedWords,
            ]
          }
        }
      })
    }
  }

  // 테스트 진행
  const handleTest = (answer) => {
    if (selectedStep.length - 1 > currentIndex) {
      setCurrentIndex(currentIndex => currentIndex + 1)
      handleRandom()
    } else if (selectedStep.length - 1 <= currentIndex) {
      setCurrentIndex(0)
      setDisplay(true)
    }
    setSelectedStep(
      selectedStep.map((item) => {
        if ((selectedStep[currentIndex].korean === item.korean) &&
          (item.korean === answer)) {
          return {
            ...item,
            passedTest: true,
          }
        } else if ((selectedStep[currentIndex].korean === item.korean) &&
          (item.korean !== answer)) {
          return {
            ...item,
            passedTest: false,
          }
        } else {
          return {
            ...item,
          }
        }
      }),
    )
  }

  // 재시험시
  const makeupExam = () => {
    selectedStep.map((item) => {
      return {
        ...item,
        passedTest: false,
      }
    })
    setDisplay(false)
    setPassedWords(null)
    setFailedWords(null)
  }

  // 시험끝나면
  const endExam = () => {
    addHistoryTest()
    setDisplay(false)
    setPassedWords(null)
    setFailedWords(null)
    navigate('/')
  }

  // 한국어 리스트 랜덤으로 뿌려주기
  const handleRandom = () => {
    const testWords = selectedStep.filter((item) => item.korean)
    testWords.sort(() => Math.random() - 0.5)
    setRandomAnswer(testWords)
  }

  useEffect(() => {
    if (selectedStep) {
      handleRandom()
      setPassedWords(selectedStep.filter((item) => item.passedTest))
      setFailedWords(selectedStep.filter((item) => !item.passedTest))
    }
  }, [selectedStep])

  useEffect(() => {
    if(passedWords !== null){
      const filterHistoryPass = loginUser.historyTest.passed.filter((item) => {
        return !failedWords.some((other) => item.id === other.id)
      })
      setFilterPassed(filterHistoryPass)
    }
    if(failedWords !== null){
      const filterHistoryFail = loginUser.historyTest.failed.filter((item) => {
        return !passedWords.some((other) => item.id === other.id)
      })
      setFilterFailed(filterHistoryFail)
    }
  }, [passedWords, failedWords])


  return {
    currentIndex,
    display,
    passedWords,
    randomAnswer,
    handleTest,
    makeupExam,
    endExam,
  }
}