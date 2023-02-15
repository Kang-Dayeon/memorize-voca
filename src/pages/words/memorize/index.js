import React, {useEffect, useState} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
// ** store
import {useWords} from '../store/useWords'
import {useLoginUserStore} from '../../auth/store/useLoginUser'
// ** component
import SlickSlider from '../../../components/slide/Slider'
// ** style
import './memorize.scss'

const Memorize = () => {
  // ** react
  const params = useParams()
  const navigate = useNavigate()
  const [learn, setLearn] = useState(null)

  // ** recoil
  const {selectedCategory, selectedStep, setSelectedStep} = useWords()
  const {loginUser, setLoginUser} = useLoginUserStore()

  // 선택된 스텝 확인하여 유저 데이터에 배운 스텝으로 저장
  useEffect(() => {
    if(selectedStep && loginUser){
      setLearn(
        {
          category: selectedCategory.category,
          steps: {
            ...selectedStep,
            learn: true,
          },
        },
      )
      
    }
    
  }, [selectedStep])

  useEffect(() => {
    if(learn){
      // console.log(learn)
      // const learnWords = loginUser.learnWords
      // const reducedArr = learnWords.reduce((acc, current) => {
      //   const find = acc.find(item => {
      //     return (item.category === current.category) && (item.steps.id === current.steps.id)
      //   })
      //   if(!find) {
      //     return acc.concat([current])
      //   } else {
      //     return acc
      //   }
      // }, [])
      // // const filter = learnWords.filter((item, idx) => {return learnWords.indexOf(item) === idx})
      // console.log(reducedArr)
      setLoginUser((loginUser) => {
        return {
          ...loginUser,
          learnWords: [
            ...loginUser.learnWords,
            learn
          ],
        }
      })
    }
  }, [learn])

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
      <SlickSlider words={selectedStep.words}/>
    </div>
  )
}

export default Memorize