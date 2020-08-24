import React from 'react'

import styles from './App.module.css'

import RouteContextProvider from '../../contexts/route/RouteContext'

import SideBar from '../SideBar/SideBar'
import GoogleMap from '../GoogleMap/GoogleMap'

// Ultimately I think using a context here is overkill for this particular app.
// I could just keep the reducer in here and pass it down as needed. That said, 
// a context would make more sense if this were a real world app which would be
// likely to grow in it's scope so I think the choice is justified

const App = () => (
  <div className={styles.grid}>
    <RouteContextProvider>
      <SideBar />
      <GoogleMap />
    </RouteContextProvider>
  </div>
)

export default App
