// ** react
import React, {useEffect} from 'react'
// ** component
import Modal from '../../../components/modal/Modal'
// ** icon
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faXmark} from '@fortawesome/free-solid-svg-icons'
// ** hook
import useInput from '../../../hooks/useInput'
import {useSelectList} from '../hook/useSelectList'
// ** store
import {useWords} from '../store/useWords'
import {category, step} from '../../../database/words'

const AddWord = ({display, toggleDisplay}) => {
  const {words, setWords} = useWords()

  // ** hook
  const [value, setValue] = useInput({
    english: '',
    korean: '',
    step: step.level01,
    explanation: '',
  })

  // ** hook
  const {setData, selectedList} = useSelectList()

  const addWord = () => {
    const newWord = {
      id: words[words.length - 1].id + 1,
      category: category.myWords,
      step: value.step,
      english: value.english,
      korean: value.korean,
      explanation: value.explanation,
    }
    setWords((words) => {
      return [
        ...words,
        newWord,
      ]
    })
    toggleDisplay()
  }

  useEffect(() => {
    if (display) {
      setData(step)
    }
  }, [display])

  return (
    <Modal name={'Add Word'} display={display}>
      <form className="add-words">
        <div className="form__wrap">
          <div className="input__box">
            <label htmlFor="step">Level</label>
            <select id="step" onChange={setValue} value={value.step}>
              {
                selectedList !== null ?
                  selectedList.map((item) => {
                    return (
                      <option value={item}>{item}</option>
                    )
                  }) : <></>
              }
            </select>
          </div>
          <div className="input__box">
            <label htmlFor="en">English</label>
            <input className="input" name="english" type="text" id="en"
                   value={value.english}
                   onChange={setValue}
            />
          </div>
          <div className="input__box">
            <label htmlFor="ko">Korean</label>
            <input className="input" name="korean" type="text" id="ko"
                   value={value.korean}
                   onChange={setValue}
            />
          </div>
          <div className="input__box">
            <label htmlFor="explanation">Explanation</label>
            <input className="input" name="explanation" type="text"
                   id="explanation"
                   value={value.explanation}
                   onChange={setValue}
            />
          </div>
        </div>
        <div className="btn__wrap">
          <button className="btn" onClick={toggleDisplay}>
            <FontAwesomeIcon icon={faXmark}/>
          </button>
          <button className="btn"
                  onClick={(e) => (value.step === null) ?
                    alert('level을 선택 해주세요.')
                    :
                    (value.english === '') ? alert('영단어를 입력 해주세요')
                      : (value.korean === '') ? alert('뜻을 입력 해주세요')
                        : (value.explanation === '') ? alert('단어를 설명 해주세요')
                          : addWord()
                  }>
            <FontAwesomeIcon icon={faCheck}/>
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddWord