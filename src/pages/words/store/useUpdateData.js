import {useCallback, useEffect, useState} from 'react'
import {useWords} from './useWords'
import {useUserStore} from '../../auth/store/useUser'

function useUpdateData(){
  // ** recoil
  const {selectedStep} = useWords()
  const {loginUser, setLoginUser} = useUserStore()

  const [learn, setLearn] = useState(null)

  useEffect(() => {
    if(learn){
      const filter = learn.filter((item) => {
        return !selectedStep.some(other => other.id === item.id)
      })
      filter.push(...selectedStep)
      filter.sort((a,b) => a.id - b.id)
      setLoginUser((loginUser) => {
        return {
          ...loginUser,
          words: filter,
        }
      })
    }
  }, [learn])

  useEffect(() => {
    if(selectedStep && selectedStep.length > 0){
      setLearn(loginUser.words)
    }
  }, [selectedStep])

}

export default useUpdateData