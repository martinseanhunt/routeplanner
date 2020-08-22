import React, { useContext, createContext, useReducer } from 'react'

import routeReducer, { initialState } from './routeReducer'

const RouteContext = createContext()
const useRouteContext = () => useContext(RouteContext)

const persistState = state => {
  localStorage.setItem('route', JSON.stringify(state))
}

const RouteContextProvider = props => {
  const [state, dispatch] = useReducer(routeReducer, initialState)

  const value = {
    state,
    dispatch: action => console.log(action) || persistState(dispatch(action))
  }

  return (
    <RouteContext.Provider value={props.value || value}>
      {props.children}
    </RouteContext.Provider>
  )
}

export default RouteContextProvider
export { useRouteContext }
