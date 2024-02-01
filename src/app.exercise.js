/** @jsx jsx */
import { jsx } from '@emotion/core'

import * as React from 'react'
import * as auth from 'auth-provider'
import { AuthenticatedApp } from './authenticated-app'
import { UnauthenticatedApp } from './unauthenticated-app'
import { client } from 'utils/api-client.exercise'

function App() {
  const [user, setUser] = React.useState(null)

  const login = form => auth.login(form).then(u => setUser(u))
  const register = form => auth.register(form).then(u => setUser(u))
  const logout = () => {
    auth.logout()
    setUser(null)
  }


  const checkToken = async () => {
    const token = await auth.getToken()
    console.log({ token })
    if (token) {
      // we're logged in! Let's go get the user's data:
      client('me', { token }).then(data => { 
        console.log(data.user)
        setUser(data.user)
      }).catch(console.log)
    } else {
      // we're not logged in. Show the login screen
      setUser(null);
    }
  }

  React.useEffect(() => {
    checkToken();
  }, [])

  return user ? (
    <AuthenticatedApp user={user} logout={logout} />
  ) : (
    <UnauthenticatedApp login={login} register={register} />
  )
}

export { App }
