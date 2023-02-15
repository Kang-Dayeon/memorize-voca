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
  // console.log(loginUser)

  useEffect(() => {
    if(loginUser){
      setLearnWords(loginUser.learnWords)
      
    }
  }, [loginUser])

  // 유저가 해당 리스트 공부 했는지 체크하기 위한 코드
  useEffect(() => {
    if(learnWords){
      const learnWords = loginUser.learnWords
      const reducedArr = learnWords.reduce((acc, current) => {
        const find = acc.find(item => {
          return (item.category === current.category) && (item.steps.id === current.steps.id)
        })
        if(!find) {
          return acc.concat([current])
        } else {
          return acc
        }
      }, [])
      
      setLoginUser((loginUser) => {
        return {
          ...loginUser,
          learnWords: reducedArr,
        }
      })

      setSteps(
        steps.map((item,i) => {
          if(item.id === learnWords[i].steps.id && selectedCategory.category === learnWords[i].category){
            return {
              ...item,
              learn: true
            }
          } else{
            return {
              ...item
            }
          }
        })
      )
    }
  }, [learnWords])

  // 선택됐던 카테고리 안의 데이터가 변하면 단어 데이터 전체 업데이트
  useEffect(() => {
    if(selectedCategory){
      const filter = words.filter((item) => item.id !== selectedCategory.id)
      filter.push(selectedCategory)
      filter.sort((a,b) => a.id - b.id)
      setWords([...filter])
      setSteps(selectedCategory.steps)
    }
  }, [selectedCategory])

  // 페이지가 로드될때 파라미터 정보로 해당 카테고리 정보 불러오고 뿌려주기
  useEffect(() => {
    if((params.key) && (words.find((item) => item.id === parseInt(params.key)))){
      const find = words.find((item) => item.id === parseInt(params.key))
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
                <li className={`step-list 
                ${list.lear ?'active' : ''}`
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