import {useEffect, useState} from 'react'

export const useSelectList = () => {
  // ** state
  const [data, setData] = useState<any | null>(null)
  const [selectedList, setSelectedList] = useState<any | null>(null)

  const handleSelectList = () => {
    const list: String[] = []

    for (let key in data) {
      list.push(data[key])
    }
    setSelectedList(list)
  }

  useEffect(() => {
    if (data) {
      handleSelectList()
    }
  }, [data])

  return {
    setData,
    selectedList,
  }
}
