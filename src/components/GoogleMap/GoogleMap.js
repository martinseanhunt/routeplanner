import React, { useEffect, useRef } from 'react'

const GoogleMap = () => {
  const mapRef = useRef()
  let map

  useEffect(() => {
    // Add script here rather than in the index file so that if, in the future, 
    // we have routes that don't use the map, we don't need to load it for them.
    const addScript = () => {
      const script = document.createElement('script')
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBsg3xGXWQhMZPn5DlcB-FPwYA4cPBeVrY&callback=initMap'
      script.defer = true

      document.head.appendChild(script)
    }

    window.initMap = () => {
      map = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: -34.397,
          lng: 150.644
        },
        zoom: 10
      })
    }
    
    // Add script to document
    if(!window.google || !window.google.maps) addScript()
  }, [])

  return <div ref={mapRef} />
}

export default GoogleMap
