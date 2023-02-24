import React from 'react'
import Navigation from '../menu'
import {useUser} from '../../pages/auth/store/useUser'

const ContentWrapper = ({children}) => {
  const {isLogin} = useUser()
  return (
    <div className="app-content">
      <div className="app-content__inner">
        {children}
      </div>
      {
        isLogin ? <Navigation /> : <></>
      }
    </div>
  )
}

export default ContentWrapper