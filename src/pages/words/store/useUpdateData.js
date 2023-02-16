import {useEffect, useState} from 'react'
import {useWords} from './useWords'
import {useUserStore} from '../../auth/store/useUser'

function useUpdateData(){
  // ** recoil
  const {selectedCategory, setSelectedCategory, selectedStep} = useWords()
  const {loginUser, setLoginUser} = useUserStore()

  // ** state
  const [steps, setSteps] = useState(null)
  const [words, setWords] = useState(null)

  useEffect(() => {
    if(selectedStep){
      setSteps(selectedCategory.steps)
    }
  }, [selectedStep])

  useEffect(() => {
    if(steps){
      const filter = steps.filter((item) => item.id !== selectedStep.id)
      filter.push(selectedStep)
      filter.sort((a,b) => a.id - b.id)
      setSelectedCategory((selectedCategory) => {
        return {
          ...selectedCategory,
          steps: [...filter]
        }
      })
    }
  }, [steps])


  useEffect(() => {
    if(selectedCategory){
      setWords(loginUser.words)
    }
  }, [selectedCategory])

  useEffect(() => {
    if(words){
      const filter = loginUser.words.filter((item) => item.id !== selectedCategory.id)
      filter.push(selectedCategory)
      filter.sort((a,b) => a.id - b.id)
      setLoginUser((loginUser) => {
        return {
          ...loginUser,
          words: [...filter]
        }
      })
    }
  }, [words])

}

export default useUpdateData