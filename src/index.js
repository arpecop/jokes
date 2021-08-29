import React, { useEffect } from 'react'

import ReactDOM from 'react-dom'

import { RecoilRoot, useRecoilState } from 'recoil'
import { Amplify, Auth } from 'aws-amplify'
import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom'

import App from './App'
import Login from './Login/Login'
import Forgot from './Login/Forgot'
import SignUp from './Login/SignUp'

import { loggedInUserData } from './utils/state'

Amplify.configure({
  aws_project_region: 'eu-west-1',
  aws_cognito_identity_pool_id:
    'eu-west-1:3f5f916d-2252-487f-99c0-7aa69115f973',
  aws_cognito_region: 'eu-west-1',
  aws_user_pools_id: 'eu-west-1_T6v05tjzh',
  aws_user_pools_web_client_id: 'eqlretnsetkj5p57bqtandjqa',
  oauth: {}
})

const Ruter = () => {
  const [user, setUser] = useRecoilState(loggedInUserData)
  useEffect(() => {
    async function handleAuthStateChange () {
      const user1 = await Auth.currentAuthenticatedUser()
      const session = await Auth.currentSession()

      setUser({
        //...user1.attributes,
        username: user1.username,
        token: session.accessToken.jwtToken,
        refreshtoken: session.refreshToken.token
      })
    }
    handleAuthStateChange()
  }, [setUser])
  return (
    <Router>
      <Route
        path='/'
        exact
        component={() => (
          <App match={{ params: { id2: 'Разни', id: 'cat' } }} user={user} />
        )}
      />

      <Route
        path='/:id'
        exact
        render={props => <App match={props.match} user={user} />}
      />
      <Route
        path='/cat/:id2'
        exact
        render={props => <App match={props.match} user={user} />}
      />
      <Route
        path='/cat/:id2/:start_key'
        exact
        render={props => (
          <App match={props.match} isIndex={false} user={user} />
        )}
      />
      <Route
        path='/u/:user/:id'
        exact
        render={props => (
          <App match={props.match} isIndex={false} user={user} />
        )}
      />
      <Route path='/app/login' exact render={() => <Login />} />
      <Route path='/app/forgot' exact render={() => <Forgot />} />
      <Route path='/app/signup' exact render={() => <SignUp />} />
    </Router>
  )
}
ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Ruter />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
)
