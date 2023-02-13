import Router from './router/Router'
import {BrowserRouter} from 'react-router-dom'
import {RecoilRoot} from 'recoil'
import Header from './components/layouts/Header'
import ContentWrapper from './components/layouts/ContentWrapper'

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Header />
        <ContentWrapper>
          <Router />
        </ContentWrapper>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
