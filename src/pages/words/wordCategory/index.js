// ** react hook
import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
// ** store
import {useUserStore} from '../../auth/store/useUser'
// ** icon
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBookBookmark} from '@fortawesome/free-solid-svg-icons'

const WordCategory = () => {
  // ** react
  const navigate = useNavigate()

  // ** recoil
  const {loginUser} = useUserStore()

  // ** state
  const [words, setWords] = useState(null)

  const handleNavigate = (key) => {
    navigate('/steps/' + key)
  }

  useEffect(() => {
    if(loginUser){
      setWords(loginUser.words)
    }
  }, [loginUser])

  return (
    <>
      <div className="wordsCategory">
      <h4 className="sub-title">category</h4>
        <ul className="list__wrap">
          {words ?
            words.map((list) => {
              return (
                <li className="list" onClick={() => handleNavigate(list.id)}>
                  <div className="list__title">
                    <span className="list__icon">
                      <FontAwesomeIcon icon={faBookBookmark} />
                    </span>
                    {list.category}
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