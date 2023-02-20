import {useCallback, useEffect, useState} from 'react'
import {useWords} from './useWords'
import {useUserStore} from '../../auth/store/useUser'

function useUpdateData(){
  // ** recoil
  const {selectedStep} = useWords()
  const {loginUser, setLoginUser} = useUserStore()

  const [loginUserWords, setLoginUserWords] = useState(null)

  useEffect(() => {
    if(loginUserWords){
      const filter = loginUserWords.filter((item) => {
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
  }, [loginUserWords])

  useEffect(() => {
    if(selectedStep && selectedStep.length > 0){
      setLoginUserWords(loginUser.words)
    }
  }, [selectedStep])

}

export default useUpdateData