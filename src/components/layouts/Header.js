import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import './../../assets/scss/common.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import {useLoginUserStore} from '../../pages/auth/store/useLoginUser'

const Header = () => {
  const navigate = useNavigate()
  const {users,setUsers,loginUser} = useLoginUserStore()

  useEffect(() => {
    if(loginUser){
      const filter = users.filter((item) => item.id !== loginUser.id)
      filter.push(loginUser)
      setUsers([...filter])
    }
  }, [loginUser])

  return (
    <div className="header">
      <div className="back-arrow">
        <button className="btn" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
      </div>
      <h1 className="header__title">Memorize Words</h1>
    </div>
  )
}

export default Header