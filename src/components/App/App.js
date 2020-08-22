import React from 'react'

import styles from './App.module.css'

import RouteContextProvider from '../../contexts/route/RouteContext'

import SideBar from '../SideBar/SideBar'
import GoogleMap from '../GoogleMap/GoogleMap'

const App = () => (
  <div className={styles.grid}>
    <RouteContextProvider>
      <SideBar />
      <GoogleMap />
    </RouteContextProvider>
  </div>
)

export default App
