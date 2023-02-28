// ** react
import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
// ** store
import {useWords} from '../../words/store/useWords'
import {useUser} from '../../auth/store/useUser'
// ** component
import SlickSlider from '../../../components/slide/Slider'

const Failed = () => {
  // ** react
  const navigate = useNavigate()

  // ** store
  const {selectedStep, setSelectedStep} = useWords()
  const {loginUser} = useUser()

  const navigateTest = () => {
    navigate('/test')
  }

  useEffect(() => {
    if (loginUser) {
      setSelectedStep(loginUser.historyTest.failed)
    } else {
      navigate('/')
    }
  }, [loginUser])

  if (!selectedStep) return

  return (
    <div className="memorize">
      <h4 className="sub-title">{selectedStep.step}</h4>
      <SlickSlider words={selectedStep}/>
      {
        (selectedStep.length > 0) ?
          <button className="btn btn__big"
                  onClick={() => navigateTest(selectedStep)}>TEST
          </button>
          : <></>
      }
    </div>
  )
}

export default Failed