import React, {useEffect, useState} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {useWords} from '../../store/useWords'
import {useLoginUserStore} from '../../../auth/store/useLoginUser'
import './../wordCategory.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck} from '@fortawesome/free-solid-svg-icons'

const Steps = () => {
  // ** recoil
  const {words, setWords, selectedCategory, setSelectedCategory} = useWords()
  const {loginUser, setLoginUser} = useLoginUserStore()

  // ** react
  const params = useParams()
  const navigate = useNavigate()
  const [steps, setSteps] = useState(null)
  const [learnWords, setLearnWords] = useState(null)

  const handleNavigate = (key) => {
    navigate('/memorize/' + key)
  }
  console.log(loginUser)

  useEffect(() => {
    if(loginUser){
      setLearnWords(loginUser.learnWords)
    }
  }, loginUser)

  useEffect(() => {
    if(selectedCategory){
      const filter = words.filter((item) => item.id !== selectedCategory.id)
      filter.push(selectedCategory)
      filter.sort((a,b) => a.id - b.id)
      setWords([...filter])
      setSteps(selectedCategory.steps)
    }
  }, [selectedCategory])

  useEffect(() => {
    if((params.key) && (words.find((item) => item.id === parseInt(params.key)))){
      const find = words.find((item) => item.id === parseInt(params.key))
      console.log(words.find((item) => item.id === parseInt(params.key)))
      setSelectedCategory(find)
    } else {
      navigate('/')
    }
  }, [params])

  if(!selectedCategory) return

  return (
    <>
      <div className="step">
        <h4 className="sub-title">{selectedCategory.category}</h4>
        <ul className="step-list__wrap">
          {
            steps ? steps.map((list) => {
              return (
                <li className={
                  `step-list ${ learnWords ?
                    learnWords.map((item) => {
                    if((item.category === selectedCategory.category) && (item.steps.id === list.id)){
                      return 'active'
                    } else {
                      return ''
                    }
                  }) : ''
                  }
                  `
                } onClick={() => handleNavigate(list.id)}>
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
    </>
  )
}

export default Steps