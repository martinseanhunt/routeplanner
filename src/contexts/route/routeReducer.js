const initialState = {
  coords: []
}

const cartReducer =(state, { type, payload }) => {
  switch(type) {
    case 'ADD_WAYPOINT':
      console.log('hi')
      return {
        ...state,
        coords: [...state.coords, payload]
      }
    default:
      return state
  }
}

export default cartReducer
export { initialState }