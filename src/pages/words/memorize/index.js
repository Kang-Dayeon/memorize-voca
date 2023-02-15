import React, {useEffect, useState} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import {useWords} from '../store/useWords'
import {useLoginUserStore} from '../../auth/store/useLoginUser'
import SlickSlider from '../../../components/slide/Slider'
import './memorize.scss'

const Memorize = () => {
  // ** react
  const params = useParams()
  const navigate = useNavigate()
  const [learn, setLearn] = useState([])

  // ** recoil
  const {selectedCategory, selectedStep, setSelectedStep} = useWords()
  const {loginUser, setLoginUser} = useLoginUserStore()

  // console.log(loginUser)
  useEffect(() => {
    if(selectedStep && loginUser){
      setLearn((learn) => {
        return [
          ...learn,
          {
            category: selectedCategory.category,
            steps: {
              ...selectedStep,
              learn: true,
            },
          },
        ]
      })
     const result = [...new Set(learn)]
      console.log(result)

      setLoginUser((loginUser) => {
        return{
          ...loginUser,
          learnWords: [...result],
        }
      })
    }
  }, [selectedStep])

  useEffect(() => {
    if((params.key) && selectedCategory.steps.find((item) => item.id === parseInt(params.key))){
      const findStep = selectedCategory.steps.find((item) => item.id === parseInt(params.key))
      setSelectedStep(findStep)
    } else {
      navigate('/')
    }
  }, [params])

  if(!selectedStep) return

  return (
    <div className="memorize">
      <h4 className="sub-title">{selectedStep.name}</h4>
      <div className="slide-wrap">
        <SlickSlider words={selectedStep.words}/>
      </div>
    </div>
  )
}

export default Memorize