// ** react hook
import React, {useEffect} from 'react'
import {useParams,useNavigate} from 'react-router-dom'

// ** store
import {useWords} from '../../store/useWords'
import useUpdateData from '../../store/useUpdateData'

// ** component
import SlickSlider from '../../../../components/slide/Slider'

const Memorize = () => {
  // ** react
  const params = useParams()
  const navigate = useNavigate()

  // ** recoil
  const {selectedCategory, selectedStep, setSelectedStep} = useWords()

  // ** hooks
  useUpdateData()

  const navigateTest = (key) => {
    navigate('/testWords/' + key)
  }

  useEffect(() => {
    if((params.key) && selectedCategory.steps.find((item) => item.id === parseInt(params.key))){
      const findStep = selectedCategory.steps.find((item) => item.id === parseInt(params.key))
      setSelectedStep(() => {
        return {
          ...findStep,
          learn: true,
        }
      })
    } else {
      navigate('/')
    }
  }, [params])

  if(!selectedStep) return

  return (
    <div className="memorize">
      <h4 className="sub-title">{selectedStep.name}</h4>
      <SlickSlider words={selectedStep.words}/>
      <button className='btn btn__big' onClick={() => navigateTest(selectedStep.name)}>TEST</button>
    </div>
  )
}

export default Memorize