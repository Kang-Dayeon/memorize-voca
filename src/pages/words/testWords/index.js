import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// ** store
import { useUserStore } from "../../auth/store/useUser"
import { useWords } from "../store/useWords"

const TestWords = () => {
  // ** recoil
  const {loginUser, setLoginUser} = useUserStore()
  const {selectedCategory, selectedStep} = useWords()

  // ** react
  const params = useParams()

  // ** state
  const [current, setCurrent] = useState(0)
  const [words, setWords] = useState(null)

  // console.log(params)

  useEffect(() => {
  if(selectedStep){
    setWords(selectedStep.words)
  }
  },[params])

  if(!selectedStep) return

  return (
    <div className="test-words">
      <h4 className="sub-title">[{selectedCategory.category}] {selectedStep.name} Test</h4>
      <div className="test-words__content">
        <div className="card card__gray">{selectedStep.words[current].english}</div>
        <ul className="list__wrap">
          {words ?
            words.map((list) => {
              return (
                <li className="list list__round">
                  <div className="list__title">
                    {list.korean}
                  </div>
                </li>
              )
            }) : <></>
          }
        </ul>
      </div>
    </div>
  )
}

export default TestWords