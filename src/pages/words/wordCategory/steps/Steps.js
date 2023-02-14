import React, {useEffect, useState} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {useWords} from '../../store/useWords'
import './../wordCategory.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck} from '@fortawesome/free-solid-svg-icons'

const Steps = () => {
  const params = useParams()
  const navigate = useNavigate()
  const {words,selectedCategory,setSelectedCategory,steps,setSteps} = useWords()

  const handleCheck = (name) => {
    setSteps(
      steps.map((item) => {
        if(item.name === name) {
          return {
            ...item,
            learn: true
          }
        } else {
          return {
            ...item,
            learn: false
          }
        }
      })
    )
    console.log(steps.map((item) => item.learn ? 'dd' : 'mm'))
  }

  useEffect(() => {
    if((params.key) && (words.find((item) => item.category === params.key))){
      const findCategory = words.find((item) => item.category === params.key)
      setSelectedCategory(findCategory)
      setSteps(findCategory.steps)
    } else {
      navigate('/')
    }
  }, [params])

  if(!selectedCategory) return

  return (
    <>
      <div className="words">
        <div className="step">
          <h4 className="step-title">{selectedCategory.category}</h4>
          <ul className="step-list__wrap">
            {
              steps ? steps.map((list) => {
                return (
                  <li className={`step-list ${list.learn ? 'active' : ''}`} onClick={() => handleCheck(list.name)}>
                    <Link className="step-anchor">
                      <p className="step-list__title">{list.name}</p>
                      <span><FontAwesomeIcon icon={faCheck} /></span>
                    </Link>
                  </li>
                )
              }) : <></>
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default Steps