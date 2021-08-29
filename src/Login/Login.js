import React, { useState, useEffect } from 'react'

import { Auth } from 'aws-amplify'
import { useRecoilState } from 'recoil'
import { Input } from 'antd'

import { loggedInUserData, navigation } from '../utils/state'
import Error from '../Error'

//

const styles = {
  Input: {
    height: 40,
    margin: '10px 0px',
    padding: 7,
    width: '100%'
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
const Login = ({ type }) => {
  const [user, setUser] = useRecoilState(loggedInUserData)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [nav, setNav] = useRecoilState(navigation)
  useEffect(() => {
    setNav('login')
  }, [setNav, nav])
  const login = async () => {
    try {
      await Auth.signIn(username, password)
      const user1 = await Auth.currentAuthenticatedUser()
      const session = await Auth.currentSession()

      const userInfo = {
        ...user1.attributes,
        username: user1.username,
        token: session.accessToken.jwtToken,
        refreshtoken: session.refreshToken.token
      }
      setUser(userInfo)

      localStorage.setItem('user', JSON.stringify(userInfo))
    } catch (err) {
      setError(err)
    }
  }
  return (
    <>
      {user.x && <Error errorMessage={error} />}
      {error && <Error errorMessage={error} />}
      {type === 'compact' && (
        <>
          <Input
            onChange={event => setUsername(event.target.value)}
            placeholder='потребител'
            name='username'
            value={username}
            style={styles.InputCompact}
          />
          <Input
            onChange={event => setPassword(event.target.value)}
            placeholder='парола'
            name='password'
            value={password}
            type='password'
            style={styles.InputCompact}
          />
          <div style={styles.buttonCompact} onClick={login}>
            <span style={styles.buttonCompact}>Вход</span>
          </div>
        </>
      )}
      {type === 'full' && (
        <>
          <Input
            onChange={event => setUsername(event.target.value)}
            placeholder='потребител'
            name='username'
            value={username}
            style={styles.Input}
          />
          <Input
            onChange={event => setPassword(event.target.value)}
            placeholder='парола'
            name='password'
            value={password}
            type='password'
            style={styles.Input}
          />
          <div style={styles.button} onClick={login}>
            <span style={styles.buttonText}>Вход</span>
          </div>
        </>
      )}
    </>
  )
}

export default Login
