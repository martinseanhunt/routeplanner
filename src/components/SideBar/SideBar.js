import React from 'react'

import styles from './SideBar.module.css'

import WaypointList from './WaypointList'
import DownloadGpx from './DownloadGpx'

const SideBar = () => (
  <div className={styles.sidebar}>
    <div>
      <h1 className={styles.title}>Route Builder</h1>
    </div>
    
    <div className={styles.sidebarContent}>
      <WaypointList />
    </div>

    <DownloadGpx />
  </div>
)

export default SideBar
