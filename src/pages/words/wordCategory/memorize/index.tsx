// ** react
import React, {useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
// ** store
import {useWords} from '../../store/useWords'
import {useUser} from '../../../auth/store/useUser'
// ** component
import SlickSlider from '../../../../components/slide/Slider'

const Memorize = () => {
  // ** react
  const params = useParams()
  const navigate = useNavigate()

  // ** store
  const {setWords, selectedCategory, selectedStep, setSelectedStep} = useWords()
  const {setLoginUser} = useUser()

  const navigateTest = () => {
    navigate('/test')
  }

  const deleteWord = (id:number) => {
    const deleteConfirm = window.confirm("Are you want to delete the word?")
    if(deleteConfirm){
      setWords((words:any) => words.filter((item:any) => item.id !== id))
      navigate(+0)
    }
  }

  const addHistoryLearn = () => {
    if (selectedCategory.length > 0 && selectedStep.length > 0) {
      setLoginUser((loginUser:any) => {
        return {
          ...loginUser,
          historyLearn: [
            ...loginUser.historyLearn,
            {
              category: selectedStep[0].category,
              step: selectedStep[0].step,
              date: new Date().toLocaleString(),
            },
          ],
        }
      })
    }
  }
  useEffect(() => {
    if (selectedStep) {
      addHistoryLearn()
    }
  }, [selectedStep])

  useEffect(() => {
    if ((params.key) &&
      selectedCategory.filter((item:any) => item.step === params.key)) {
      const filterStep = selectedCategory.filter(
        (item:any) => item.step === params.key)
      setSelectedStep(filterStep)
    } else {
      navigate('/')
    }
  }, [])

  if (!selectedStep) return

  return (
    <div className="memorize">
      <h4 className="sub-title">{selectedStep.step}</h4>
      <SlickSlider words={selectedStep} del={deleteWord}/>
      {
        (selectedStep.length > 0) ?
          <button className="btn btn__big"
                  onClick={() => navigateTest()}>TEST
          </button>
          : <></>
      }
    </div>
  )
}

export default Memorize