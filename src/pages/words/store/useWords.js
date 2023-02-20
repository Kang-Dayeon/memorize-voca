import { atom, useRecoilState } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import {words} from '../../../database/words'

const {persistAtom} = recoilPersist()

const wordsState = atom({
  key: 'wordState',
  default: words,
  effects_UNSTABLE: [persistAtom]
})

const selectedCategoryState = atom({
  key: 'selectedCategoryState',
  default: null,
  effects_UNSTABLE: [persistAtom]
})

const selectedStepState = atom({
  key: 'selectedStepState',
  default: null,
  effects_UNSTABLE: [persistAtom]
})

export const useWords = () => {
  const [words, setWords] = useRecoilState(wordsState)
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState)
  const [selectedStep, setSelectedStep] = useRecoilState(selectedStepState)

  return{
    words,
    setWords,
    selectedCategory,
    setSelectedCategory,
    selectedStep,
    setSelectedStep
  }
}