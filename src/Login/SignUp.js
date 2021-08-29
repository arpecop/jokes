import React, { useState } from 'react'

import { Auth } from 'aws-amplify'
import { Input } from 'antd'

import Error from '../Components/Error'

const styles = {
  Input: {
    height: 40,
    margin: '10px 0px',
    padding: 7
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    backgroundColor: 'rebeccapurple',
    padding: '15px 7px',
    cursor: 'pointer',
    textAlign: 'center',
    marginBottom: 10
  },
  buttonText: {
    color: 'white'
  }
}
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
        <div style={styles.formContainer}>
          <h1>Регистрация</h1>
          {state.error && <Error errorMessage={state.error} />}
          <Input
            onChange={handleUpdate}
            placeholder='потребител'
            name='username'
            value={state.username}
            style={styles.Input}
          />
          <Input
            onChange={handleUpdate}
            placeholder='парола'
            name='password'
            value={state.password}
            type='password'
            style={styles.Input}
          />
          <Input
            onChange={handleUpdate}
            placeholder='Email'
            name='email'
            value={state.email}
            style={styles.Input}
          />

          <div style={styles.button} onClick={signUp}>
            <span style={styles.buttonText}>Регистрация</span>
          </div>
        </div>
      )}
      {state.stage === 1 && (
        <div style={styles.formContainer}>
          <h1>Регистрация</h1>
          {state.error && <Error errorMessage={state.error} />}
          <Input
            onChange={handleUpdate}
            placeholder='Authorization Code'
            name='authCode'
            value={state.authCode}
            style={styles.Input}
          />
          <div style={styles.button} onClick={confirmSignUp}>
            <span style={styles.buttonText}>Потвърди Регистрация</span>
          </div>
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
