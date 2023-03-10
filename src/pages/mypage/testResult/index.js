// ** react
import React, {useEffect, useMemo} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
// ** store
import {useWords} from '../../words/store/useWords'
import {useUser} from '../../auth/store/useUser'
// ** component
import Table from '../../../components/table/Table'

const TestResult = () => {
  // ** react
  const navigate = useNavigate()
  const params = useParams()

  // ** store
  const {selectedStep, setSelectedStep} = useWords()
  const {loginUser} = useUser()

  // 모든 데이터는 처음 한번만 렌더링 되야 하기 때문에 useMemo사용
  // accessor : data와 연결할 key
  // header : 테이블에 출력될 이름
  const columns = useMemo(
    () => [
      {
        accessor: 'english',
        Header: 'English',
      },
      {
        accessor: 'korean',
        Header: 'Korean',
      },
      {
        accessor: 'category',
        Header: 'Category',
      },
      {
        accessor: 'level',
        Header: 'Level',
      },
    ],
    [],
  )

  const data = useMemo(() =>
    selectedStep ?
    Array(selectedStep.length).fill().map((item, i) => ({
      english: selectedStep[i].english,
      korean: selectedStep[i].korean,
      category: selectedStep[i].category,
      level: selectedStep[i].step,
    })) : []
  ,[selectedStep]);

  const navigateTest = () => {
    navigate('/test')
  }

  useEffect(() => {
    if (params.key === 'pass'){
      setSelectedStep(loginUser.historyTest.passed)
    } else if(params.key === 'fail') {
      setSelectedStep(loginUser.historyTest.failed)
    } else {
      navigate('/')
    }
  }, [params])

  if (!selectedStep) return

  return (
    <div className="passed-words">
      <h4 className="sub-title">{
        params.key === 'pass' ? 'Passed' : 'Failed'
      } List</h4>
      <Table columns={columns} data={data}/>
      <div className="btn__wrap">
        {
          (selectedStep.length > 0) ?
            <button className="btn btn__big"
                    onClick={() => navigateTest(selectedStep)}>TEST
            </button>
            : <></>
        }
      </div>
    </div>
  )
}

export default TestResult