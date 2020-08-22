import React from 'react'

import styles from './SideBar.module.css'

import { useRouteContext } from '../../contexts/route/RouteContext'

const SideBar = () => {
  const { state, dispatch } = useRouteContext()

  console.log(state)
  
  return (
    <div className={styles.sidebar}>
      This is the sidebar
    </div>
  )
}

export default SideBar
