// ** react
import React, {useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
// ** store
import {useWords} from '../../store/useWords'
// ** component
import SlickSlider from '../../../../components/slide/Slider'

const Memorize = () => {
  // ** react
  const params = useParams()
  const navigate = useNavigate()

  // ** store
  const {selectedCategory, selectedStep, setSelectedStep} = useWords()

  const navigateTest = () => {
    navigate('/testWords/')
  }

  useEffect(() => {
    if ((params.key) &&
      selectedCategory.filter((item) => item.step === params.key)) {
      const filterStep = selectedCategory.filter(
        (item) => item.step === params.key)
      setSelectedStep(filterStep)
    } else {
      navigate('/')
    }
  }, [])

  if (!selectedStep) return

  return (
    <div className="memorize">
      <h4 className="sub-title">{selectedStep.step}</h4>
      <SlickSlider words={selectedStep}/>
      <button className="btn btn__big"
              onClick={() => navigateTest(selectedStep)}>TEST
      </button>
    </div>
  )
}

export default Memorize