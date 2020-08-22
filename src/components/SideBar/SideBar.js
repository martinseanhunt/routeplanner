import React from 'react'

import styles from './SideBar.module.css'

import { useRouteContext } from '../../contexts/route/RouteContext'

// TODO: Change coords terminology to waypoints

const SideBar = () => {
  const { state, dispatch } = useRouteContext()

  return (
    <div className={styles.sidebar}>
      {state.coords.length > 0 && state.coords.map(coord => (
        <li>
          <span>Waypoint {coord.markerId + 1}</span>
          <button>Delete</button>
        </li>
      ))}
    </div>
  )
}

export default SideBar
