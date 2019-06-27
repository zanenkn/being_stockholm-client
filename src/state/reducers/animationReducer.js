const initialState = {
  sidebarVisible: false,
  legendVisible: false,
}

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_VISIBILITY':
      return {
        sidebarVisible: !state.sidebarVisible
      }
    case 'CHANGE_LEGEND_VISIBILITY':
      return {
        legendVisible: !state.legendVisible
      }
    default:
      return state
  }
}

export default locationReducer