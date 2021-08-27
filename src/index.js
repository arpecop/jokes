import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router, Route } from 'react-router-dom'
const Ruter = () => (
  <Router>
    <div>
      <Route path='/' exact component={() => <App isIndex />} />
      <Route
        path='/:id/'
        exact
        render={props => <App match={props.match} isIndex={false} />}
      />
      <Route
        path='/:id/:id2'
        exact
        render={props => <App match={props.match} isIndex={false} />}
      />
      <Route
        path='/:id/:id2/:start_key'
        exact
        render={props => <App match={props.match} isIndex={false} />}
      />
    </div>
  </Router>
)
ReactDOM.render(
  <React.StrictMode>
    <Ruter />
  </React.StrictMode>,
  document.getElementById('root')
)
