import { useEffect, useState } from 'react'

export const useSelectList = () => {
  // ** state
  const [data, setData] = useState(null)
  const [selectedList, setSelectedList] = useState(null)

  const handleSelectList = () => {
    const list = []
    for(let key in data){
      list.push(data[key])
    }
    setSelectedList(list)
  }

  useEffect(() => {
    if(data){
      handleSelectList()
    }
  }, [data])

  return {
    setData,
    selectedList,
  }
}
