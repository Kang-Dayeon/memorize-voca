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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [display, setDisplay] = useState(false)
  const [passedWords, setPassedWords] = useState([])
  const [failedWords, setFailedWords] = useState([])
  const [randomAnswer, setRandomAnswer] = useState([])
  const [filterPassed, setFilterPassed] = useState([])
  const [filterFailed, setFilterFailed] = useState([])

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

    // forEach를 사용하여 각 항목 업데이트
    // const updatedSelectedStep = [...selectedStep];
    // updatedSelectedStep.map((item, index) => {
    //   return {
    //     ...item,
    //     passedTest:
    //       index === currentIndex &&
    //       item.korean === answer &&
    //       selectedStep[currentIndex].korean === answer,
    //   };
    // });
    //
    // setSelectedStep(updatedSelectedStep);

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
  const handleRandom = () => {
    const randomArray = []
    randomArray.push(selectedStep[currentIndex].korean)
    for(let i = 0; i < 4; i++){
      let randomNum = Math.floor(Math.random() * words.length)
      if((randomArray.indexOf(randomNum) === -1)){
        randomArray.push(words[randomNum].korean)
      } else {
        i--
      }
    }
    randomArray.sort(() => Math.random() - 0.5)
    setRandomAnswer(randomArray)

    // const answer = selectedStep[currentIndex].korean
    // randomArray.push(selectedStep[currentIndex].korean)
    // while (randomArray.length < 4){
    //   const randomNum = Math.floor(Math.random() * words.length)
    //   const randomWord = words[randomNum].korean
    //
    //   if(!randomArray.includes(randomWord) && randomWord !== answer){
    //     randomArray.push(randomWord)
    //   }
    // }
    //
    // const randomPosition = Math.floor(Math.random() * 5)
    // randomArray.splice(randomPosition, 0, answer)
    // setRandomAnswer(randomArray)
  }

  useEffect(() => {
    if (selectedStep) {
      handleRandom()
      setPassedWords(selectedStep.filter((item) => item.passedTest))
      setFailedWords(selectedStep.filter((item) => !item.passedTest))
    }
  }, [selectedStep])

  useEffect(() => {
    if(passedWords.length > 0){
      const filterHistoryPass = loginUser.historyTest.passed.filter((item) => {
        return !failedWords.some((other) => item.id === other.id)
      })
      setFilterPassed(filterHistoryPass)
    }
    if(failedWords.length > 0){
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