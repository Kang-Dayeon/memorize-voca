// ** react
import Router from './router/Router'
import {HashRouter} from 'react-router-dom'
// ** recoil
import {RecoilRoot} from 'recoil'
// ** component
import Header from './components/layouts/Header'
import ContentWrapper from './components/layouts/ContentWrapper'
// ** style
import './assets/scss/common.scss'
import React from 'react'

const App = () => {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <HashRouter>
          <Header/>
          <ContentWrapper>
            <Router/>
          </ContentWrapper>
        </HashRouter>
      </RecoilRoot>
    </React.StrictMode>
  )
}

export default App
