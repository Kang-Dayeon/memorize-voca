// ** react
import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
// ** store
import {useUser} from '../store/useUser'

const SignUp = () => {
  const navigate = useNavigate()

  // ** store
  const {users, setUsers} = useUser()

  // ** react library
  const {register, handleSubmit} = useForm()

  const handleSignUp = (data) => {
    const signUpUser = {
      id: users[users.length - 1].id + 1,
      name: data.name,
      loginId: data.loginId,
      password: data.password,
      historyLearn: [],
      historyTest: {
        passed: [],
        failed: [],
      },
    }

    if (users.some((user) => user.loginId === data.loginId)) {
      alert('The ID that already exists.')
      console.log(users.some((user) => user.loginId === data.loginId))
    } else {
      setUsers((users) => {
        return [
          ...users,
          signUpUser,
        ]
      })
      navigate('/sign-in')
    }
  }

  const handleError = (errors) => {
    errors.name ? alert(errors.name.message)
      : errors.loginId ? alert(errors.loginId.message)
        : alert(errors.password.message)
  }

  return (
    <div className="form">
      <div className="form__wrap">
        <h3 className="form__title">Sign up</h3>
        <form className="form__content"
              onSubmit={handleSubmit(handleSignUp, handleError)}>
          <label htmlFor="name">Name</label>
          <input className="input"
                 id="name"
                 type="text"
                 placeholder="Write your name (Min 2 Max 15 letter)"
                 {...register('name', {
                   required: 'Check your name',
                   pattern: /^[가-힣a-zA-Z]{2,15}$/,
                 })}
          />
          <label htmlFor="loginId">ID</label>
          <input className="input"
                 id="loginId"
                 type="text"
                 placeholder="Letters and numbers(Min 4 Max 12 letter)"
                 {...register('loginId', {
                   required: 'Combination of letters and numbers(Min 4 Max 12 letter)',
                   pattern: /^[a-zA-Z0-9]{4,12}$/,
                 })}
          />
          <label htmlFor="password">Password</label>
          <input className="input"
                 id="password"
                 type="password"
                 placeholder="Letters and numbers(Min 4 Max 12 letter)"
                 {...register('password', {
                   required: 'Combination of letters and numbers(Min 4 Max 12 letter)',
                   pattern: /^[a-zA-Z0-9]{4,12}$/,
                 })}
          />
          <button className="form__btn btn" type="submit">Sign up</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp