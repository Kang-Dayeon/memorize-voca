// ** react
import React, {useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
// ** store
import {useWords} from '../../store/useWords'
import {useUser} from '../../../auth/store/useUser'
// ** database
import {step} from '../../../../database/words'
// ** icon
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck} from '@fortawesome/free-solid-svg-icons'
// ** hook
import {useSelectList} from '../../hook/useSelectList'

const Steps = () => {
  // ** store
  const {words, selectedCategory, setSelectedCategory} = useWords()
  const {loginUser} = useUser()

  // ** react
  const params = useParams()
  const navigate = useNavigate()

  // ** hook
  const {setData, selectedList} = useSelectList()

  const handleNavigate = (key) => {
    navigate('/memorize/' + key)
  }

  useEffect(() => {
    if ((params.key) &&
      (words.filter((item) => item.category === params.key))) {
      const filter = words.filter((item) => item.category === params.key)
      setSelectedCategory(filter)
      setData(step)
    } else {
      navigate('/')
    }
  }, [params])

  if (!selectedCategory) return

  return (
    <>
      <div className="steps">
        <h4 className="sub-title">{selectedCategory.category}</h4>
        <ul className="list__wrap">
          {
            selectedList !== null ?
              selectedList.map((item) => {
                return (
                  <li className={`list list__round ${(loginUser.historyLearn && loginUser.historyLearn.some(
                    (list) => list.step === item && list.category ===
                      params.key)) ? 'active' : ''}`}
                      onClick={() => handleNavigate(item)}>
                    <p className="list__title">{item}</p>
                    <span><FontAwesomeIcon icon={faCheck}/></span>
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