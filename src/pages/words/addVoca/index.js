// ** react
import React, {useState, useEffect} from 'react'
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
import {useForm} from 'react-hook-form'

const AddVoca = ({display,toggleDisplay}) => {
  const {words,setWords} = useWords()

  // ** react library
  const { register, handleSubmit } = useForm()

  // ** hook
  const [value, setValue] = useInput({
    english: '',
    korean: '',
    step: step.level01,
    explanation: '',
  })

  // ** hook
  const {setData, selectedList} = useSelectList()

  const addVoca = (data) => {
    const newWords = {
      id: words[words.length - 1].id + 1,
      category: category.myWords,
      step: data.step,
      english: data.english,
      korean: data.korean,
      explanation: data.explanation,
    }
    setWords((words) => {
      return [
        ...words,
        newWords,
      ]
    })
    toggleDisplay()
  }

  useEffect(() => {
    if(display){
      setData(step)
    }
  }, [display])


  return (
    <Modal name={'Add Voca'} display={display}>
      <div className="add-words form">
        <div className="form__wrap">
          <form className="form__content" onSubmit={handleSubmit(addVoca, handleError)}>
            <div className="input__box">
              <label htmlFor="step">Level</label>
              <select id="step"
                      onChange={setValue}
                      value={value.step}
              >
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
              <input className="input" name="explanation" type="text" id="explanation"
                     value={value.explanation}
                     onChange={setValue}
              />
            </div>
            <div className="btn__wrap">
              <button className="btn" onClick={toggleDisplay}>
                <FontAwesomeIcon icon={faXmark}/>
              </button>
              <button className="btn" type="submit">
                <FontAwesomeIcon icon={faCheck}/>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  )
}

export default AddVoca