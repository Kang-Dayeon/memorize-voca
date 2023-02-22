// ** react
import Router from './router/Router'
import {BrowserRouter} from 'react-router-dom'
// ** recoil
import {RecoilRoot} from 'recoil'
// ** component
import Header from './components/layouts/Header'
import ContentWrapper from './components/layouts/ContentWrapper'
import Navigation from './components/menu'
// ** style
import './assets/scss/common.scss'

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Header/>
        <ContentWrapper>
          <Router/>
          <Navigation/>
        </ContentWrapper>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
