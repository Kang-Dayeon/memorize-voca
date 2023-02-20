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

const Steps = () => {
  // ** recoil
  const {words, selectedCategory, setSelectedCategory} = useWords()

  // ** react
  const params = useParams()
  const navigate = useNavigate()

  const handleNavigate = (key) => {
    navigate('/memorize/' + key)
  }

  useEffect(() => {
    if((params.key) && (words.filter((item) => item.category === params.key))){
      const filter = words.filter((item) => item.category === params.key)
      setSelectedCategory(filter)
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
          <li className='list list__round' onClick={() => handleNavigate(step.level01)}>
            <p className="list__title">{step.level01}</p>
            <span><FontAwesomeIcon icon={faCheck} /></span>
          </li>
          <li className='list list__round' onClick={() => handleNavigate(step.level02)}>
            <p className="list__title">{step.level02}</p>
            <span><FontAwesomeIcon icon={faCheck} /></span>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Steps