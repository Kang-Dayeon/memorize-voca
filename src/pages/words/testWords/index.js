// ** react
import React, { useState } from "react"
import {useNavigate} from 'react-router-dom'

// ** store
import { useWords } from "../store/useWords"
import useUpdateData from '../store/useUpdateData'

// ** component
import Modal from '../../../components/modal/Modal'

// ** icon
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faArrowRotateRight, faXmark, faCircleCheck} from '@fortawesome/free-solid-svg-icons'

const TestWords = () => {
  // ** react
  const navigate = useNavigate()

  // ** recoil
  const { selectedStep, setSelectedStep} = useWords()

  // ** state
  const [current, setCurrent] = useState(0)
  const [display, setDisplay] = useState(false)
  const [right, setRight] = useState(null)

  // ** hooks
  useUpdateData()

  // 테스트 진행
  const handleTest = (answer) => {
    if(selectedStep.length - 1 > current){
      setCurrent(current => current + 1)
    } else if(selectedStep.length - 1 <= current) {
      setCurrent(0)
      setDisplay(true)
    }
    setSelectedStep(
      selectedStep.map((item) => {
        if((selectedStep[current].korean === item.korean) && (item.korean === answer)){
          return {
            ...item,
            passedTest: true
          }
        } else if((selectedStep[current].korean === item.korean) && (item.korean !== answer)) {
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
    setRight(selectedStep.filter((item) => item.passedTest))
  }

  const makeupExam = () => {
    selectedStep.map((item) => {
      return {
        ...item,
        passedTest: false
      }
    })
    setDisplay(false)
    setRight(null)
  }

  const endExam = () => {
    setDisplay(false)
    setRight(null)
    navigate('/')
  }

  if(!selectedStep) return

  return (
    <div className="test-words">
      <h4 className="sub-title">Test</h4>
      <div className="test-words__content">
        <div className="card card__gray">{selectedStep[current].english}</div>
        <ul className="list__wrap">
          {
            selectedStep.map((list) => {
              return (
                <li className="list list__round" onClick={() => handleTest(list.korean)}>
                  <div className="list__title">
                    {list.korean}
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
      <Modal name={'Result'} display={display}>
        <div className="result__count">
          <span>{right !== null ? right.length : 0}</span>
          &nbsp;/&nbsp;
          {selectedStep.length}
        </div>
        <ul className="list__wrap">
          {
            selectedStep.map((list) => {
              return (
                <li className={`list ${list.passedTest ? 'right' : 'wrong'}`}>
                  <div className="list__title">
                    <span>
                      {
                        list.passedTest ? 
                        <FontAwesomeIcon icon={faCircleCheck} /> : <FontAwesomeIcon icon={faXmark} />
                      }
                    </span>
                    {list.english} = {list.korean}
                  </div>
                </li>
              )
            })
          }
        </ul>
        <div className="btn__wrap">
          <button className="btn" onClick={() => makeupExam()}>
            <FontAwesomeIcon icon={faArrowRotateRight} />
          </button>
          <button className="btn" onClick={() => endExam()}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default TestWords