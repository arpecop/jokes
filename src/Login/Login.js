import React, { useState, useEffect } from 'react'

import { Auth } from 'aws-amplify'
import { useRecoilState } from 'recoil'
import { Button, Input } from 'antd'

import { loggedInUserData } from '../utils/state'
import Error from '../Components/Error'
import Layout from '../Layout/Layout'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const [user, setUser] = useRecoilState(loggedInUserData)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  let history = useHistory()
  useEffect(() => {
    async function handleAuthStateChange () {
      const user = await Auth.currentAuthenticatedUser()
      console.log(user)
      if (user.username) {
        history.push('/')
      }
    }
    handleAuthStateChange()
  }, [history])
  const login = async () => {
    try {
      await Auth.signIn(username, password)
      const user1 = await Auth.currentAuthenticatedUser()
      const session = await Auth.currentSession()

      setUser({
        //...user1.attributes,
        username: user1.username,
        token: session.accessToken.jwtToken,
        refreshtoken: session.refreshToken.token
      })

      //localStorage.setItem('user', JSON.stringify(userInfo))
      history.push('/')
    } catch (err) {
      setError(err)
    }
  }
  return (
    <Layout title='Вход' active='login'>
      {user.x && <Error errorMessage={error} />}
      {error && <Error errorMessage={error} />}
      <p>
        <Input
          onChange={event => setUsername(event.target.value)}
          placeholder='потребител'
          name='username'
          value={username}
        />
      </p>
      <p>
        <Input
          onChange={event => setPassword(event.target.value)}
          placeholder='парола'
          name='password'
          value={password}
          type='password'
        />
      </p>
      <Button onClick={login}>
        <span>Вход</span>
      </Button>
    </Layout>
  )
}

export default Login
