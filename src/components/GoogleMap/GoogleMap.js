import React, { useEffect, useRef } from 'react'

import { useRouteContext } from '../../contexts/route/RouteContext'

import { defaultMapOptions } from '../../config/maps'
const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY
const MAPS_BASE_URI = process.env.REACT_APP_MAPS_BASE_URI

const GoogleMap = () => {
  const mapContainerRef = useRef()
  const map = useRef()
  const line = useRef()
  const markers = useRef([])

  const { state, dispatch } = useRouteContext()

  // TODO: Tidy up listeners on unmount

  const createMarker = (markerId, position) => {
    // TODO remove settings to config
    const marker = new window.google.maps.Marker({
      markerId,
      position,
      map: map.current,
      draggable: true,
      label: {
        color: '#fff',
        text: `${markerId}`,
        fontWeight: 'bold',
        fontSize: '12px'
      },
      icon: {
          url: '/oval.png',
          size: new window.google.maps.Size(28, 28),
          scaledSize: new window.google.maps.Size(28, 28),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(14, 14)      
      }
    })

    // Listen for changes to marker position so we can redraw the line after
    // a user drags to move a marker.
    window.google.maps.event.addListener(marker, 'dragend', () => dispatch({
      type: 'EDIT_WAYPOINT', 
      payload: {
        markerId,
        coords: {
          lat: marker.position.lat(),
          lng: marker.position.lng()
        }
      }
    }))

    markers.current = [...markers.current, marker]
  }

  const drawLines = () => {
    // Clear any existing line so we don't draw over the top of it
    if(line.current) line.current.setMap(null)

    // Construct the line
    line.current = new window.google.maps.Polyline({
        path: state.waypoints.map(({ coords }) => coords),
        strokeColor: '#1086E8',
        strokeOpacity: 1.0,
        strokeWeight: 6
    })

    // Draw the line to the map
    line.current.setMap(map.current)
  }

  // Initialize the map and marker listener
  useEffect(() => {
    // Add script here rather than in the index file so that if, in the future, 
    // we have routes that don't use the map, we don't need to load it for them.
    const addScript = () => {
      const script = document.createElement('script')
      script.src = `${MAPS_BASE_URI}?key=${MAPS_API_KEY}&callback=initMap`
      script.defer = true

      window.initMap = () => {
        map.current = new window.google.maps
          .Map(mapContainerRef.current, defaultMapOptions)
        
        map.current.addListener('click', e => dispatch({
          type: 'ADD_WAYPOINT', 
          payload: {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          }
        }))
      }

      document.head.appendChild(script)
    }    

    // Add script to document
    if(!window.google || !window.window.google.maps) addScript()
  }, [])


  // Add a marker to the map from a new waypoint in state
  useEffect(() => {
    const addWaypoint = () => {
      const waypoint = state.waypoints[state.waypoints.length - 1]
      createMarker(waypoint.markerId, waypoint.coords)
      drawLines()
      dispatch({ type: 'MAP_UPDATED' })
    }

    if(state.addMarker) addWaypoint()
  }, [state.addMarker])

  // Redraw the lines when we drag a marker
  useEffect(() => {
    const redrawLines = () => {
      drawLines()
      dispatch({ type: 'MAP_UPDATED' })
    }

    if(state.redrawLines) redrawLines()
  }, [state.redrawLines])

  // Delete waypoint
  useEffect(() => {
    const deleteWaypoint = () => {
      // Delete waypoint from map and markers ref
      const marker = markers.current
        .find(m => m.markerId === state.deleteWaypoint)
    
      markers.current = markers.current
        .filter(m => m.markerId !== state.deleteWaypoint)

      marker.setMap(null)

      // Redraw the lines
      drawLines()

      dispatch({ type: 'MAP_UPDATED' })
    }

    if(state.deleteWaypoint) deleteWaypoint()
  }, [state.deleteWaypoint])


  return <div ref={mapContainerRef} />
}

export default GoogleMap
