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

  // **type

  // ** state
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [display, setDisplay] = useState<boolean>(false)
  const [passedWords, setPassedWords] = useState([])
  const [failedWords, setFailedWords] = useState([])
  const [randomAnswer, setRandomAnswer] = useState([])
  const [filterPassed, setFilterPassed] = useState([])
  const [filterFailed, setFilterFailed] = useState([])

  // 테스트 내용 추가
  const addHistoryTest = () => {
    if(loginUser){
      setLoginUser((loginUser:any) => {
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
  const handleTest = (answer:any) => {
    if (selectedStep.length - 1 > currentIndex) {
      setCurrentIndex(currentIndex => currentIndex + 1)
      handleRandom()
    } else if (selectedStep.length - 1 <= currentIndex) {
      setCurrentIndex(0)
      setDisplay(true)
    }
    setSelectedStep(
      selectedStep.map((item:any) => {
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
    selectedStep.map((item:any) => {
      return {
        ...item,
        passedTest: false,
      }
    })
    setDisplay(false)
    setPassedWords([])
    setFailedWords([])
  }

  // 시험끝나면
  const endExam = () => {
    addHistoryTest()
    setDisplay(false)
    setPassedWords([])
    setFailedWords([])
    navigate('/')
  }

  // 한국어 리스트 랜덤으로 뿌려주기
  // error: 정답 포함 5개만 뿌려줘야되는데 갯수가 다르게 뿌려짐
  const handleRandom = () => {
    const randomArray:any = []
    randomArray.push(selectedStep[currentIndex].korean)
    for(let i = 0; i < 4; i++){
      let randomNum: number = Math.floor(Math.random() * words.length)
      if((randomArray.indexOf(randomNum) === -1)){
        randomArray.push(words[randomNum].korean)
      } else {
        i--
      }
    }
    randomArray.sort(() => Math.random() - 0.5)
    setRandomAnswer(randomArray)
  }

  useEffect(() => {
    if (selectedStep) {
      handleRandom()
      setPassedWords(selectedStep.filter((item:any) => item.passedTest))
      setFailedWords(selectedStep.filter((item:any) => !item.passedTest))
    }
  }, [selectedStep])

  useEffect(() => {
    if(passedWords.length > 0){
      const filterHistoryPass = loginUser.historyTest.passed.filter((item:any) => {
        return !failedWords.some((other:any) => item.id === other.id)
      })
      setFilterPassed(filterHistoryPass)
    }
    if(failedWords.length > 0){
      const filterHistoryFail = loginUser.historyTest.failed.filter((item:any) => {
        return !passedWords.some((other:any) => item.id === other.id)
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