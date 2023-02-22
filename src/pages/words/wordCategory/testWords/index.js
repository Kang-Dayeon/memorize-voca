// ** react
import React from 'react'
// ** store
import {useWords} from '../../store/useWords'
// ** hook
import {useTestWords} from '../../hook/useTestWords'
// ** component
import Modal from '../../../../components/modal/Modal'
// ** icon
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faArrowRotateRight,
  faXmark,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons'

const TestWords = () => {
  // TODO : 영어도 랜덤으로 보여주기

  // ** store
  const {selectedStep} = useWords()

  const {
    currentIndex,
    display,
    rightWords,
    randomAnswer,
    handleTest,
    makeupExam,
    endExam,
  } = useTestWords()

  if (!selectedStep) return

  return (
    <div className="test-words">
      <h4 className="sub-title">
        {`${selectedStep[currentIndex].category} ${selectedStep[currentIndex].step}`} Test
      </h4>
      <div className="test-words__content">
        <div className="card card__gray">
          {selectedStep[currentIndex].english}
        </div>
        <ul className="list__wrap">
          {
            randomAnswer !== null ?
              randomAnswer.map((list) => {
                return (
                  <li className="list list__round"
                      onClick={() => handleTest(list.korean)}>
                    <div className="list__title">
                      {list.korean}
                    </div>
                  </li>
                )
              }) : <></>
          }
        </ul>
      </div>
      <Modal name={'Result'} display={display}>
        <div className="result__count">
          <span>
            {rightWords !== null ? rightWords.length : 0}
          </span>
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
                          <FontAwesomeIcon icon={faCircleCheck}/>
                          :
                          <FontAwesomeIcon icon={faXmark}/>
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
            <FontAwesomeIcon icon={faArrowRotateRight}/>
          </button>
          <button className="btn" onClick={() => endExam()}>
            <FontAwesomeIcon icon={faCheck}/>
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default TestWords