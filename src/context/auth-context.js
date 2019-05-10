import React from 'react'
import * as auth from '../utils/auth'

const AuthContext = React.createContext()

function authReducer(state, action) {
  switch (action.type) {
    case 'fetching': {
      return {...state, isLoading: true, user: null, error: null}
    }
    case 'success': {
      return {...state, isLoading: false, user: action.user, error: null}
    }
    case 'error': {
      return {...state, isLoading: false, user: null, error: action.error}
    }
    case 'logout': {
      return {...state, isLoading: false, user: null, error: null}
    }
    case 'initializing': {
      return {...state, isInitializing: true}
    }
    case 'initialized': {
      return {...state, isInitializing: false}
    }
    case 'clear error': {
      return {...state, error: null}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function useAuthContextValue() {
  const [state, dispatch] = React.useReducer(authReducer, {
    isInitializing: false,
    isLoading: false,
    user: null,
    error: null,
  })
  const {isLoading, isInitializing, user, error} = state
  React.useDebugValue(
    isInitializing
      ? 'initializing'
      : isLoading
      ? 'loading'
      : error || user || 'no user',
  )

  const run = React.useCallback(promise => {
    dispatch({type: 'fetching'})
    return promise.then(
      receivedUser => dispatch({type: 'success', user: receivedUser}),
      error => dispatch({type: 'error', error}),
    )
  }, [])

  const hasUser = Boolean(user)
  React.useLayoutEffect(() => {
    if (!hasUser && auth.getToken()) {
      dispatch({type: 'initializing'})
      run(auth.getUser()).finally(() => {
        dispatch({type: 'initialized'})
      })
    }
  }, [hasUser, run])

  const login = React.useCallback(
    ({username, password}) => run(auth.login({username, password})),
    [run],
  )
  const register = React.useCallback(
    ({username, password}) => run(auth.register({username, password})),
    [run],
  )

  function logout() {
    auth.logout()
    dispatch({type: 'logout'})
  }

  function clearError() {
    dispatch({type: 'clear error'})
  }

  const value = React.useMemo(() => {
    return {
      user,
      error,
      isLoading,
      isInitializing,
      login,
      register,
      logout,
      clearError,
    }
  }, [error, isInitializing, isLoading, login, register, user])
  return value
}

function AuthProvider(props) {
  const value = useAuthContextValue()
  return <AuthContext.Provider value={value} {...props} />
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export {AuthProvider, useAuth}
