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
  const [rightWords, setRightWords] = useState(null)
  const [wrongWords, setWrongWords] = useState(null)
  const [randomAnswer, setRandomAnswer] = useState(null)

  // 테스트 내용 추가
  const addHistoryTest = () => {
    setLoginUser((loginUser) => {
      return {
        ...loginUser,
        historyTest: {
          pass: [
            ...loginUser.historyTest.pass.filter((item) => wrongWords.some((other) => item.id !== other.id)),
            ...rightWords,
          ],
          failed: [
            ...loginUser.historyTest.failed.filter((item) => rightWords.some((other) => item.id !== other.id)),
            ...wrongWords,
          ]
        }
      }
    })
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
    setRightWords(null)
  }

  // 시험끝나면
  const endExam = () => {
    addHistoryTest()
    setDisplay(false)
    setRightWords(null)
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
      setRightWords(selectedStep.filter((item) => item.passedTest))
      setWrongWords(selectedStep.filter((item) => !item.passedTest))
    }
  }, [selectedStep])

  return {
    currentIndex,
    display,
    rightWords,
    randomAnswer,
    handleTest,
    makeupExam,
    endExam,
  }
}