import React, { useEffect, useRef, useCallback } from 'react'

import { useRouteContext } from '../../contexts/route/RouteContext'

import { defaultMapOptions } from '../../config/maps'
const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY
const MAPS_BASE_URI = process.env.REACT_APP_MAPS_BASE_URI

const GoogleMap = () => {
  const mapRef = useRef()
  const line = useRef()
  const map = useRef()

  const { state, dispatch } = useRouteContext()

  console.log('here', state.coords.length)

  useEffect(() => {
    let coords = []

    // Add script here rather than in the index file so that if, in the future, 
    // we have routes that don't use the map, we don't need to load it for them.
    const addScript = () => {
      const script = document.createElement('script')
      script.src = `${MAPS_BASE_URI}?key=${MAPS_API_KEY}&callback=initMap`
      script.defer = true

      window.initMap = () => {
        map.current = new window.google.maps
          .Map(mapRef.current, defaultMapOptions)
          
        map.current.addListener('click', placeMarker)
      }

      document.head.appendChild(script)
    }    

    // Add script to document
    if(!window.google || !window.window.google.maps) addScript()
  }, [])

  const placeMarker = ({ latLng }) => {
    // Add a unique identifier to each marker so find it in the saved coords
    //  and we can edit later.
    const markerId = state.coords.length

    console.log(markerId);

    const marker = new window.google.maps.Marker({
      position: latLng,
      map: map.current,
      draggable: true,
      markerId,
      label: {
        color: '#fff',
        text: `${markerId + 1}`,
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

    dispatch({
      type: 'ADD_WAYPOINT', 
      payload: {
        markerId,
        coords: latLng
      }
    })

    /*
    // Listen for changes to marker position so we can redraw the line after
    // a user drags to move a marker.
    window.google.maps.event.addListener(marker, 'dragend', () => {
      // TODO: Persist to context
      coords = coords.map(coord => coord.markerId === marker.markerId
        ? {
          markerId,
          coords: {
            lat: marker.position.lat(),
            lng: marker.position.lng()
          }
        }
        : coord
      )
    }) */
  }

  // TODO: DEEP COMPARE
  useEffect(() => {
    const newLine = path => {
      // Clear any existing line so we don't draw over the top of it
      if(line.current) line.current.setMap(null)

      // Construct the line
      line.current = new window.google.maps.Polyline({
          path,
          strokeColor: '#1086E8',
          strokeOpacity: 1.0,
          strokeWeight: 6
      })

      console.log(map.current)

      // Draw the line to the map
      line.current.setMap(map.current)
    }

    if(window.google && window.window.google.maps) 
      newLine(state.coords.map(({ coords }) => coords))
  }, [state])
  
  return <div ref={mapRef} />
}

export default GoogleMap
