import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { RecoilRoot } from 'recoil'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login/Login'

import Forgot from './Login/Forgot'
import SignUp from './Login/SignUp'
const Ruter = () => (
  <RecoilRoot>
    <Router>
      <div>
        <Route
          path='/'
          exact
          component={() => (
            <App match={{ params: { id2: 'Разни', id: 'cat' } }} />
          )}
        />
        <Route path='/app/login' exact render={() => <Login />} />
        <Route path='/app/forgot' exact render={() => <Forgot />} />
        <Route path='/app/signup' exact render={() => <SignUp />} />
        <Route
          path='/:id'
          exact
          render={props => <App match={props.match} />}
        />
        <Route
          path='/:id/:id2'
          exact
          render={props => <App match={props.match} />}
        />
        <Route
          path='/:id/:id2/:start_key'
          exact
          render={props => <App match={props.match} isIndex={false} />}
        />
      </div>
    </Router>
  </RecoilRoot>
)
ReactDOM.render(
  <React.StrictMode>
    <Ruter />
  </React.StrictMode>,
  document.getElementById('root')
)
