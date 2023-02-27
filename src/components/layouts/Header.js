// ** react hook
import React from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
// ** icon
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'
// ** hook
import useUpdateData from '../../hooks/useUpdateData'

const Header = () => {
  // ** react
  const navigate = useNavigate()
  const location = useLocation()

  // ** hook
  useUpdateData()

  return (
    <div className="header">
      <div className="back-arrow">
        {
          ((location.pathname === '/sign-in') ||
            (location.pathname === '/wordCategory')) ? <></>
            : <button className="btn" onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faAngleLeft}/>
            </button>
        }
      </div>
      <h1 className="header__title">Memorize VOCA 📚</h1>
    </div>
  )
}

export default Header