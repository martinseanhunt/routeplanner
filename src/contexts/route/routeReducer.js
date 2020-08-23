const initialState = {
  waypoints: [],
  redrawMarkers: false,
  redrawLines: false,
  addMarker: false,
  deleteWaypoint: false,
  nextMarkerId: 1
}

const cartReducer =(state, { type, payload }) => {
  switch(type) {
    case 'ADD_WAYPOINT':
      return {
        ...state,
        addMarker: true,
        nextMarkerId: state.nextMarkerId + 1,
        waypoints: [
          ...state.waypoints, 
          {
            markerId: state.nextMarkerId,
            coords: payload
          }
        ]
      }
    case 'EDIT_WAYPOINT':
      return {
        ...state,
        redrawLines: true,
        waypoints: state.waypoints.map(waypoint => 
          waypoint.markerId === payload.markerId
            ? payload
            : waypoint  
        )
      }
    case 'DELETE_WAYPOINT':
      return {
        ...state,
        deleteWaypoint: payload,
        waypoints: state.waypoints.filter(w => w.markerId !== payload)
      }
    case 'REORDER_WAYPOINTS': 
      const [draggingIndex, draggingToIndex] = payload
      let { waypoints } = state
      const item = waypoints.splice(draggingIndex, 1)[0]
      waypoints.splice(draggingToIndex, 0, item)

      return {
        ...state,
        redrawLines: true, 
        waypoints
      }
    case 'MAP_UPDATED':
      return { 
        ...state, 
        redrawMarkers: false,
        redrawLines: false,
        addMarker: false,
        deleteWaypoint: false
      }
    default:
      return state
  }
}

export default cartReducer
export { initialState }