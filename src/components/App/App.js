import React from 'react'

import styles from './App.module.css'
import SideBar from '../SideBar/SideBar'
import GoogleMap from '../GoogleMap/GoogleMap'

const App = () => (
  <div className={styles.grid}>
    <SideBar />
    <GoogleMap />
  </div>
)

export default App
