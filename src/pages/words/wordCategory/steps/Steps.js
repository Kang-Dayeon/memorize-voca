// ** react hook
import React, {useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
// ** store
import {useWords} from '../../store/useWords'
import useUpdateData from '../../store/useUpdateData'
import {useUserStore} from '../../../auth/store/useUser'
// ** style
import './../wordCategory.scss'
// ** icon
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck} from '@fortawesome/free-solid-svg-icons'


const Steps = () => {
  // ** recoil
  const {selectedCategory, setSelectedCategory} = useWords()
  const {loginUser} = useUserStore()

  // ** react
  const params = useParams()
  const navigate = useNavigate()

  // ** hooks
  useUpdateData()

  const handleNavigate = (key) => {
    navigate('/memorize/' + key)
  }

  // 페이지가 로드될때 파라미터 정보로 해당 카테고리 정보 불러오고 뿌려주기
  useEffect(() => {
    if((params.key) && (loginUser.words.find((item) => item.id === parseInt(params.key)))){
      const find = loginUser.words.find((item) => item.id === parseInt(params.key))
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
          {selectedCategory ?
            selectedCategory.steps.map((item) => {
              return (
                <li className={`step-list 
                ${(item.learn) ? 'active' : ''}`
                } onClick={() => handleNavigate(item.id)}>
                  <p className="step-list__title">{item.name}</p>
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