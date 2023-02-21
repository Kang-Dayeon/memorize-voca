// ** react
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
// ** store
import {useWords} from '../store/useWords'

export const useTestWords = () => {
  // ** react
  const navigate = useNavigate()

  // ** recoil
  const { selectedStep, setSelectedStep } = useWords()

  // ** state
  const [currentIndex, setCurrentIndex] = useState(0)
  const [display, setDisplay] = useState(false)
  const [rightWords, setRightWords] = useState(null)
  const [randomAnswer, setRandomAnswer] = useState(null)

  // 테스트 진행
  const handleTest = (answer) => {
    if(selectedStep.length - 1 > currentIndex){
      setCurrentIndex(currentIndex => currentIndex + 1)
      handleRandom()
    } else if(selectedStep.length - 1 <= currentIndex) {
      setCurrentIndex(0)
      setDisplay(true)
    }
    setSelectedStep(
      selectedStep.map((item) => {
        if((selectedStep[currentIndex].korean === item.korean) && (item.korean === answer)){
          return {
            ...item,
            passedTest: true
          }
        } else if((selectedStep[currentIndex].korean === item.korean) && (item.korean !== answer)) {
          return {
            ...item,
            passedTest: false
          }
        } else {
          return {
            ...item,
          }
        }
      })
    )
  }

  // 재시험시
  const makeupExam = () => {
    selectedStep.map((item) => {
      return {
        ...item,
        passedTest: false
      }
    })
    setDisplay(false)
    setRightWords(null)
  }

  // 시험끝나면
  const endExam = () => {
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
    if(selectedStep){
      handleRandom()
      setRightWords(selectedStep.filter((item) => item.passedTest))
    }
  }, [selectedStep])

  return {
    currentIndex,
    display,
    rightWords,
    randomAnswer,
    handleTest,
    makeupExam,
    endExam
  }
}