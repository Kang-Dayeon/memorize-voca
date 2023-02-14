import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useWords} from '../store/useWords'
import './wordCategory.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBookBookmark} from '@fortawesome/free-solid-svg-icons'

const WordCategory = () => {
  const navigate = useNavigate()

  const {words,setSelectedCategory} = useWords()

  const handleNavigate = (key) => {
    navigate('/steps/' + key)
  }

  return (
    <>
      <div className="words">
        <ul className="words-list__wrap">
          {
            words.map((list) => {
              return (
                <li className="words-list" onClick={() => handleNavigate(list.category)}>
                  <div className="words-title">
                    <span className="words-title__icon">
                      <FontAwesomeIcon icon={faBookBookmark} />
                    </span>
                    {list.category}
                  </div>
                </li>
                )
            })
          }
        </ul>
      </div>
    </>
  )
}

export default WordCategory