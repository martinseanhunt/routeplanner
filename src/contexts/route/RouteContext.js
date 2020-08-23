import React, { useContext, createContext, useReducer } from 'react'

import routeReducer, { initialState } from './routeReducer'

const RouteContext = createContext()
const useRouteContext = () => useContext(RouteContext)

const RouteContextProvider = props => {
  const [state, dispatch] = useReducer(routeReducer, initialState)

  const value = {
    state,
    dispatch
  }

  return (
    <RouteContext.Provider value={props.value || value}>
      {props.children}
    </RouteContext.Provider>
  )
}

export default RouteContextProvider
export { useRouteContext }
