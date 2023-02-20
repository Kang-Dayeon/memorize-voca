// ** react hook
import React, {useEffect} from 'react'
import {useParams,useNavigate} from 'react-router-dom'

// ** store
import {useWords} from '../../store/useWords'

// database
import useUpdateData from '../../store/useUpdateData'

// ** component
import SlickSlider from '../../../../components/slide/Slider'

const Memorize = () => {
  // ** react
  const params = useParams()
  const navigate = useNavigate()

  // ** recoil
  const {selectedCategory, selectedStep, setSelectedStep} = useWords()

  // ** hook
  useUpdateData()

  const navigateTest = () => {
    navigate('/testWords/')
  }

  useEffect(() => {
    if((params.key) && selectedCategory.filter((item) => item.step === params.key)){
      const filter = selectedCategory.filter((item) => item.step === params.key)
      setSelectedStep([...filter].map((item) => {
        return {
          ...item,
          learn: true,
        }
      }))
    } else {
      navigate('/')
    }
  }, [params])

  if(!selectedStep) return

  return (
    <div className="memorize">
      <h4 className="sub-title">{selectedStep.step}</h4>
      <SlickSlider words={selectedStep}/>
      <button className='btn btn__big' onClick={() => navigateTest(selectedStep)}>TEST</button>
    </div>
  )
}

export default Memorize