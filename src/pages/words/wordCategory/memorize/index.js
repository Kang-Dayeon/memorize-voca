// ** react hook
import React, {useEffect, useState} from 'react'
import {useParams,useNavigate} from 'react-router-dom'

// ** store
import {useWords} from '../../store/useWords'
// import { useUserStore } from '../../../auth/store/useUser'
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
      <button className='btn btn__big' onClick={() => navigateTest(selectedStep.step)}>TEST</button>
    </div>
  )
}

export default Memorize