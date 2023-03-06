import React from 'react'
import {useNavigate} from 'react-router-dom'
// ** icon
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faFaceSmile,
  faUserNinja,
  faCheck,
  faXmark,
  faClockRotateLeft,
} from '@fortawesome/free-solid-svg-icons'
// ** store
import {useUser} from '../auth/store/useUser'
import {useWords} from '../words/store/useWords'

const MyPage = () => {
  // ** store
  const {loginUser, setIsLogin, resetUser} = useUser()
  const {resetWords} = useWords()

  // ** react
  const navigate = useNavigate()

  const navigateResult = (key) => {
    navigate('/result/' + key)
  }

  const navigateFail = () => {
    navigate('/fail')
  }

  const navigateRelearning = () => {
    navigate('/relearning')
  }

  const signOut = () => {
    setIsLogin(false)
    resetUser()
    resetWords()
    navigate('/')
  }

  return (
    <div className="my-page">
      <h4 className="sub-title">My Page</h4>
      <div className="card card__main">
        <ul className="list__wrap">
          <li className="list">
            <div className="list__title">
              <span className="list__icon">
                <FontAwesomeIcon icon={faFaceSmile}/>
              </span>
              Name : {loginUser.name}
            </div>
          </li>
          {
            loginUser.historyLearn.length > 0 ?
              <li className="list">
                <div className="list__title">
                  <span className="list__icon">
                    <FontAwesomeIcon icon={faUserNinja}/>
                  </span>
                  Last Study :&nbsp;
                  {loginUser.historyLearn[loginUser.historyLearn.length -
                  1].category}
                  &nbsp;/&nbsp;
                  {loginUser.historyLearn[loginUser.historyLearn.length -
                  1].step}
                </div>
              </li> :
              <li className="list">
                <div className="list__title">
                  <span className="list__icon">
                    <FontAwesomeIcon icon={faUserNinja}/>
                  </span>
                  Last Study :&nbsp;
                </div>
              </li>
          }
        </ul>
      </div>
      <h4 className="sub-title">Test Result</h4>
      <div className="btn__wrap">
        <button className="btn btn__big" onClick={() => navigateResult('pass')}>
          <span className="btn__icon">
            <FontAwesomeIcon icon={faCheck}/>
          </span>
          Passed
        </button>
        <button className="btn btn__big" onClick={() => navigateResult('fail')}>
          <span className="btn__icon">
            <FontAwesomeIcon icon={faXmark}/>
          </span>
          Failed
        </button>
      </div>
      <h4 className="sub-title">Failed Words Relearning</h4>
      <div className="btn__wrap">
        <button className="btn" onClick={() => navigateRelearning()}>
          Relearning
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
                          <FontAwesomeIcon icon={faClockRotateLeft}/>
                        </span>
                      [{item.category}] {item.step} {item.date}
                    </div>
                  </li>
                )
              }) : <></>
          }
        </ul>
      </div>
      <div className="logout">
        <button className="btn btn__big" onClick={() => signOut()}>Sign out
        </button>
      </div>
    </div>
  )
}

export default MyPage