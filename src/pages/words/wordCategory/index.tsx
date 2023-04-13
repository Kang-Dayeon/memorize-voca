// ** react
import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
// ** database
import {category} from '../../../database/words'
// ** icon
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBookBookmark} from '@fortawesome/free-solid-svg-icons'
// ** hook
import {useSelectList} from '../hook/useSelectList'

const WordCategory = () => {
  // ** react
  const navigate = useNavigate()

  // ** hook
  const {setData, selectedList} = useSelectList()

  const handleNavigate = (key) => {
    navigate('/steps/' + key)
  }

  useEffect(() => {
    if (category) {
      setData(category)
    }
  }, [category])

  return (
    <>
      <div className="wordsCategory">
        <h4 className="sub-title">category</h4>
        <ul className="list__wrap">
          {
            selectedList !== null ?
              selectedList.map((item) => {
                return (
                  <li className="list" onClick={() => handleNavigate(item)}>
                    <div className="list__title">
                      <span className="list__icon">
                        <FontAwesomeIcon icon={faBookBookmark}/>
                      </span>
                      {item}
                    </div>
                  </li>
                )
              }) : <></>
          }
        </ul>
      </div>
    </>
  )
}

export default WordCategory