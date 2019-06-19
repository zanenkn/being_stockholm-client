const initialState = {
  sidebarVisible: false
}

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_VISIBILITY':
      return {
        sidebarVisible: !state.sidebarVisible
      }
    case 'HIDE_SIDEBAR':
      return {
        sidebarVisible: false
      }
    default:
      return state
  }
}

export default locationReducer