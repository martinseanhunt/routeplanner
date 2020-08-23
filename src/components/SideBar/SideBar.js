import React, { useState } from 'react'

import styles from './SideBar.module.css'

import { useRouteContext } from '../../contexts/route/RouteContext'
import generateGpx from '../../util/generateGpx'

const SideBar = () => {
  const { state: { waypoints }, dispatch } = useRouteContext()

  const [dragging, setDragging] = useState()
  const [draggingOver, setDraggingOver] = useState()
  
  return (
    <div className={styles.sidebar}>
      <ul>
        {waypoints.length > 0 && waypoints.map((w, i) => (
          <li 
            key={w.markerId} 
            draggable="true"
            onDrag={() => setDragging(i)}
            onDragOver={e => {
              e.preventDefault()
              setDraggingOver(i)
            }}
            onDrop={e => {
              dispatch({
                type: 'REORDER_WAYPOINTS',
                payload: [dragging, draggingOver]
              })
              setDraggingOver(null)
              setDraggingOver(null)
            }}
            style={{ borderTop: i === draggingOver ? '1px solid red' : 'none' }}
          >
            <span>Waypoint {w.markerId}</span>
            <button
              onClick={() => dispatch({
                type: 'DELETE_WAYPOINT',
                payload: w.markerId
              })}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <a 
        href={`data:text/json;charset=utf-8,${generateGpx(waypoints)}`}
        download="Exported-route.gpx"
      >
        Download
      </a>
    </div>
  )
}

export default SideBar
