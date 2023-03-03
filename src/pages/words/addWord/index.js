// ** react
import React, {useEffect} from 'react'
import {useForm} from 'react-hook-form'
// ** component
import Modal from '../../../components/modal/Modal'
// ** icon
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faXmark} from '@fortawesome/free-solid-svg-icons'
// ** hook
import {useSelectList} from '../hook/useSelectList'
// ** store
import {useWords} from '../store/useWords'
import {category, step} from '../../../database/words'

const AddWord = ({display, toggleDisplay}) => {
  const {words, setWords} = useWords()

  // ** react library
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful }
  } = useForm({defaultValues: {
      english: '',
      korean: '',
      level: step.level01,
      explanation: '',
    }})

  // ** hook
  const {setData, selectedList} = useSelectList()

  const addWord = (data) => {
    if(words.map((item) => item.english === data.english)){
      alert('a word that already exists')
    } else {
      const newWord = {
        id: words[words.length - 1].id + 1,
        category: category.myWords,
        step: data.level,
        english: data.english,
        korean: data.korean,
        explanation: data.explanation,
      }
      setWords((words) => {
        return [
          ...words,
          newWord,
        ]
      })
    }
    toggleDisplay()
  }

  const handleError = (errors) => {
    errors.level ? alert(errors.level.message)
      : errors.english ? alert(errors.english.message)
        : errors.korean ? alert(errors.korean.message)
          : errors.explanation ? alert(errors.explanation.message)
            : alert('error')
  }

  useEffect(() => {
    if (display) {
      setData(step)
    }
  }, [display])

  useEffect(() => {
    if(formState.isSubmitSuccessful){
      reset({
        english: '',
        korean: '',
        level: step.level01,
        explanation: '',
      })
    }
  }, [formState, isSubmitSuccessful, reset])

  return (
    <Modal name={'Add Word'} display={display}>
      <form className="add-words" onSubmit={handleSubmit(addWord, handleError)}>
        <div className="form__wrap">
          <div className="input__box">
            <label htmlFor="step">Level</label>
            <select id="step"
                    {...register('level', {
                      required: 'Select level'
                    })}>
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
                   {...register('english', {
                     required: 'Write English words',
                     pattern: {
                       value: /^[a-zA-z]/,
                       message: 'You can write only english'
                     }
                   })}
            />
          </div>
          <div className="input__box">
            <label htmlFor="ko">Korean</label>
            <input className="input" name="korean" type="text" id="ko"
                   {...register('korean', {
                     required: 'Write korean mean',
                     pattern: {
                       value: /^[가-힣a-zA-Z]/,
                       message: 'You can write only korean'
                     }
                   })}
            />
          </div>
          <div className="input__box">
            <label htmlFor="explanation">Explanation</label>
            <input className="input" name="explanation" type="text"
                   id="explanation"
                   {...register('explanation', {
                     required: 'Write words meaning',
                   })}
            />
          </div>
        </div>
        <div className="btn__wrap">
          <button className="btn" onClick={toggleDisplay} type="button">
            <FontAwesomeIcon icon={faXmark}/>
          </button>
          <button className="btn" type="submit">
            <FontAwesomeIcon icon={faCheck}/>
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddWord