import React, { useState } from 'react'

import styles from './WaypointList.module.css'

import { useRouteContext } from '../../contexts/route/RouteContext'

const WaypointList = () => {
  const { state: { waypoints }, dispatch } = useRouteContext()

  const [dragging, setDragging] = useState()
  const [draggingOver, setDraggingOver] = useState()

  return (
    <ul className={styles.list}>
      {waypoints.length > 0 && waypoints.map((w, i) => (
        <li 
          key={w.markerId} 
          draggable="true"
          className={`${styles.listItem} ${i === draggingOver 
            ? styles.listItemDrag
            : undefined
          }`}
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
        >
          <div className={styles.listItemLeft}>
            <button className={styles.dragButton}>
              &#9776;
            </button>
            <span>Waypoint {w.markerId}</span>
          </div>
          <button
            onClick={() => dispatch({
              type: 'DELETE_WAYPOINT',
              payload: w.markerId
            })}
            className={styles.delete}
          >
            &#128465;
          </button>
        </li>
      ))}
    </ul>
  )
}

export default WaypointList
