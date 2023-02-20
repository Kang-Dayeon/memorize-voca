// ** react
import { useState } from 'react'

export default (initialValue) => {
  // ** state
  const [data, setData] = useState(initialValue)

  const handle = e => {
    const {value, name} = e.target;
    setData({
      ...data,
      [name]: value
    })
  }

  return [data, handle]
}