const initialState = {
  coords: []
}

const cartReducer =(state, { type, payload }) => {
  switch(type) {
    case 'ADD_WAYPOINT':
      return {
        ...state,
        coords: [...state.coords, payload]
      }
    case 'EDIT_WAYPOINT':
      return {
        ...state,
        coords: state.coords.map(coord => coord.markerId === payload.markerId
          ? payload
          : coord  
        )
      }
    default:
      return state
  }
}

export default cartReducer
export { initialState }