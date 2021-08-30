import React, { useState } from 'react'

import { Auth } from 'aws-amplify'
import { Input, Button } from 'antd'

import Error from '../Components/Error'

const SignUp = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
    email: '',
    authCode: '',
    stage: 0,
    error: ''
  })

  const handleUpdate = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const signUp = async () => {
    const { username, password, email } = state
    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email }
      })
      setState({ ...state, stage: 1, error: { name: 'Empty' } })
    } catch (err) {
      setState({ ...state, error: err })
      console.log('error signing up...', err)
    }
  }

  const confirmSignUp = async () => {
    const { username, authCode } = state
    try {
      await Auth.confirmSignUp(username, authCode)
      setState({ ...state, stage: 2, error: { name: 'Empty' } })
    } catch (err) {
      setState({ ...state, error: err })
    }
  }
  return (
    <div>
      {state.stage === 0 && (
        <div>
          <h1>Регистрация</h1>
          {state.error && <Error errorMessage={state.error} />}
          <p>
            <Input
              onChange={handleUpdate}
              placeholder='потребител'
              name='username'
              value={state.username}
            />
          </p>
          <p>
            <Input
              onChange={handleUpdate}
              placeholder='парола'
              name='password'
              value={state.password}
              type='password'
            />
          </p>
          <p>
            <Input
              onChange={handleUpdate}
              placeholder='Email'
              name='email'
              value={state.email}
            />
          </p>

          <p>
            <Button onClick={signUp}>
              <span>Регистрация</span>
            </Button>
          </p>
        </div>
      )}
      {state.stage === 1 && (
        <div>
          <h1>Провери мейла си за оторизиращ код</h1>
          {state.error && <Error errorMessage={state.error} />}
          <p>
            <Input
              onChange={handleUpdate}
              placeholder='Authorization Code'
              name='authCode'
              value={state.authCode}
            />
          </p>
          <p>
            <Button onClick={confirmSignUp}>
              <span>Потвърди Регистрация</span>
            </Button>
          </p>
        </div>
      )}

      {state.stage === 2 && (
        <>
          Регистрация успешна ,<a href='/app/login'>Вход</a>
        </>
      )}
    </div>
  )
}

export default SignUp
