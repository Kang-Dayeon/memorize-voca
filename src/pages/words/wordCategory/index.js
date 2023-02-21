// ** react
import React from 'react'
import { useNavigate } from 'react-router-dom'
// ** database
import { category } from '../../../database/words'
// ** icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookBookmark } from '@fortawesome/free-solid-svg-icons'

const WordCategory = () => {
  // ** react
  const navigate = useNavigate()

  const handleNavigate = (key) => {
    navigate('/steps/' + key)
  }

  return (
    <>
      <div className="wordsCategory">
      <h4 className="sub-title">category</h4>
        <ul className="list__wrap">
          <li className="list" onClick={() => handleNavigate(category.middleSchool)}>
            <div className="list__title">
              <span className="list__icon">
                <FontAwesomeIcon icon={faBookBookmark} />
              </span>
              {category.middleSchool}
            </div>
          </li> 
          <li className="list" onClick={() => handleNavigate(category.highSchool)}>
            <div className="list__title">
              <span className="list__icon">
                <FontAwesomeIcon icon={faBookBookmark} />
              </span>
              {category.highSchool}
            </div>
          </li> 
        </ul>
      </div>
    </>
  )
}

export default WordCategory