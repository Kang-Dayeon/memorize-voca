import {atom, useRecoilState} from 'recoil'
import {recoilPersist} from 'recoil-persist'
import {words} from '../../../database/words'

const {persistAtom} = recoilPersist()

const wordsState = atom({
  key: 'wordState',
  default: words,
  effects_UNSTABLE: [persistAtom]
})

const selectedCategoryState = atom({
  key: 'selectedCategoryState',
  default: {}
})

const stepState = atom({
  key: 'stepState',
  default: null
})

export const useWords = () => {
  const [words, setWords] = useRecoilState(wordsState)
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState)
  const [steps, setSteps] = useRecoilState(stepState)

  return{
    words,
    setWords,
    selectedCategory,
    setSelectedCategory,
    steps,
    setSteps
  }
}