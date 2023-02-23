import React, {useState} from 'react'
// ** icon
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFaceSmile, faUserNinja, faCheck, faXmark, faClockRotateLeft} from '@fortawesome/free-solid-svg-icons'
// ** store
import {useUser} from '../auth/store/useUser'

const MyPage = () => {
  const { loginUser, setLoginUser } = useUser()

  const [rightWords, setRightWords] = useState(null)
  const [wrongWords, setWrongWords] = useState(null)

  return (
    <div className="my-page">
      <h4 className="sub-title">My Page</h4>
      <div className="card card__main">
        <ul className="list__wrap">
          <li className="list">
            <div className="list__title">
              <span className="list__icon">
                <FontAwesomeIcon icon={faFaceSmile} />
              </span>
              Name : {loginUser.name}
            </div>
          </li>
          <li className="list">
            <div className="list__title">
              <span className="list__icon">
                <FontAwesomeIcon icon={faUserNinja} />
              </span>
              Last Study :&nbsp;
              {loginUser.historyLearn[loginUser.historyLearn.length - 1].category}
              &nbsp;/&nbsp;
              {loginUser.historyLearn[loginUser.historyLearn.length - 1].step}
            </div>
          </li>
        </ul>
      </div>
      <h4 className="sub-title">Test Result</h4>
      <div className="btn__wrap">
        <button className="btn">
          <span className="btn__icon">
            <FontAwesomeIcon icon={faCheck} />
          </span>
          Right Word
        </button>
        <button className="btn">
          <span className="btn__icon">
            <FontAwesomeIcon icon={faXmark} />
          </span>
          Wrong Word
        </button>
      </div>
      <h4 className="sub-title">Timeline</h4>
      <div className="card card__gray">
        <ul className="list__wrap">
            {
              loginUser ?
                loginUser.historyLearn.map((item) => {
                  return (
                    <li className="list">
                      <div className="list__title">
                        <span className="list__icon">
                          <FontAwesomeIcon icon={faClockRotateLeft} />
                        </span>
                        [{item.category}] {item.step} {item.date}
                      </div>
                    </li>
                  )
                }) : <></>
            }
        </ul>
      </div>
    </div>
  )
}

export default MyPage