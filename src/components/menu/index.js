// ** react
import React, {useState} from 'react'
import {Link} from 'react-router-dom'

// ** icon
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faHouse, faSquarePlus} from '@fortawesome/free-solid-svg-icons'
import AddWords from '../../pages/words/addVoca'

const Navigation = () => {
  const [display, setDisplay] = useState(false)
  const toggleDisplay = () => {
    setDisplay(!display)
  }
  return (
    <div className="anb">
      <div className="anb__wrap">
        <ul className="anb-list">
          <li className="anb-list__item">
            <Link to={'/mypage'}>
              <FontAwesomeIcon icon={faUser}/>
            </Link>
          </li>
          <li className="anb-list__item">
            <Link to={'/'}>
              <FontAwesomeIcon icon={faHouse}/>
            </Link>
          </li>
          <li className="anb-list__item" onClick={() => toggleDisplay()}>
            <Link>
              <FontAwesomeIcon icon={faSquarePlus}/>
            </Link>
          </li>
        </ul>
        <AddWords display={display} toggleDisplay={toggleDisplay} />
      </div>
    </div>
  )
}

export default Navigation