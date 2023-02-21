// ** react
import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// ** store
import { useWords } from '../../store/useWords'
// ** database
import { step } from '../../../../database/words'
// ** icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
// ** hook
import {useSelectList} from '../../hook/useSelectList'

const Steps = () => {
  // TODO : 학습한 레벨 체크 표시 해주기

  // ** store
  const { words, selectedCategory, setSelectedCategory } = useWords()

  // ** react
  const params = useParams()
  const navigate = useNavigate()

  // ** hook
  const { setData, selectedList } = useSelectList()

  const handleNavigate = (key) => {
    navigate('/memorize/' + key)
  }

  useEffect(() => {
    if((params.key) && (words.filter((item) => item.category === params.key))){
      const filter = words.filter((item) => item.category === params.key)
      setSelectedCategory(filter)
      setData(step)
    } else {
      navigate('/')
    }
  }, [params])

  if(!selectedCategory) return

  return (
    <>
      <div className="steps">
        <h4 className="sub-title">{selectedCategory.category}</h4>
        <ul className="list__wrap">
          {
            selectedList !== null ?
              selectedList.map((item) => {
                return (
                  <li className='list list__round' onClick={() => handleNavigate(item)}>
                    <p className="list__title">{item}</p>
                    <span><FontAwesomeIcon icon={faCheck} /></span>
                  </li>
                )
              }) : <></>
          }
        </ul>
      </div>
    </>
  )
}

export default Steps