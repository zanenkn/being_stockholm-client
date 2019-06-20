const initialState = {
  sidebarVisible: false
}

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_VISIBILITY':
      return {
        sidebarVisible: !state.sidebarVisible
      }
    default:
      return state
  }
}

export default locationReducer