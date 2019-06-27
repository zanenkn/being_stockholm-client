const initialState = {
  sidebarVisible: false
}

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_VISIBILITY':
      return {
        sidebarVisible: !state.sidebarVisible
      }
    case 'CREATE_IMAGE_POST':
      return {
        renderCreate: true
      }
    case 'CLOSE_IMAGE_POST':
      return {
        renderCreate: false
      }
    default:
      return state
  }
}

export default locationReducer