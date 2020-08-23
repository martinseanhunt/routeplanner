const generateGpx = (waypoints) => {
  let gpx = `
    <gpx 
      xmlns="http://www.topografix.com/GPX/1/1" 
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
      xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd" 
      version="1.1" 
      creator="runtracker"
    >
      <trk>
        <name>My Route</name>
        <desc>Generated from my react app</desc>
        <trkseg>
  `
  
  gpx += waypoints.reduce((str, waypoint) =>
    `${str}<trkpt 
      lat="${waypoint.coords.lat}" 
      lon="${waypoint.coords.lng}"
      ></trkpt>`
  , '')

  gpx += '</trkseg></trk></gpx>'

  return gpx
}

export default generateGpx
