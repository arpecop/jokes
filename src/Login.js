import React from 'react'
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignOut
} from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify'

function Login () {
  const [user, updateUser] = React.useState(null)
  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => updateUser(user))
      .catch(() => console.log('No signed in user.'))
  }, [])
  if (user) {
    return (
      <div>
        <h1>Hello {user.username}</h1>
      </div>
    )
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <AmplifyAuthenticator>
        <AmplifySignUp
          slot='sign-up'
          formFields={[
            { type: 'username' },
            {
              type: 'password',
              label: 'Custom Password Label',
              placeholder: 'custom password placeholder'
            },
            { type: 'email' }
          ]}
        />
      </AmplifyAuthenticator>
    </div>
  )
}

export default Login
