// ** react
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
// ** store
import {useWords} from '../store/useWords'
import {useUser} from '../../auth/store/useUser'

export const useTestWords = () => {
  // ** react
  const navigate = useNavigate()

  // ** store
  const {words, selectedStep, setSelectedStep} = useWords()
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
  // error: 정답 포함 5개만 뿌려줘야되는데 갯수가 다르게 뿌려짐
  const handleRandom = () => {
    const testWords = []
    const answer = selectedStep.find((item) => item.korean === selectedStep[currentIndex].korean)
    for(let i = testWords.length; i <= 4; i++){
      let randomIdx = Math.floor(Math.random() * words.length)
      if(testWords.map((item) => item !== words[randomIdx].korean) && words[randomIdx].korean !== answer.korean){
        testWords.push(words[randomIdx].korean)
      }
    }
    testWords.push(answer.korean)
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