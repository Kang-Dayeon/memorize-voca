import {useState, useEffect} from 'react'

const useReduce = (initialValue) => {
  const [array, setArray] = useState(initialValue)

  useEffect(() => {
    if(array){
      array.reduce((acc,current) => {
        if(acc.findIndex(({id}) => id === current.id) === -1){
          acc.push(current)
        }
        return acc
      }, [])
    }
  }, [array])
}

export default useReduce