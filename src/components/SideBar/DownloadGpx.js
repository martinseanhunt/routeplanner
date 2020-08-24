import React from 'react'

import styles from './DownloadGpx.module.css'

import generateGpx from '../../util/generateGpx'
import { useRouteContext } from '../../contexts/route/RouteContext'

const DownloadGpx = () => {
  const { state: { waypoints } } = useRouteContext()

  return (
    <a 
      href={`data:text/json;charset=utf-8,${generateGpx(waypoints)}`}
      download="Exported-route.gpx"
      className={styles.downloadButton}
    >
      Download your route
    </a>
  )
}

export default DownloadGpx
