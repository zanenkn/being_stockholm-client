import initialState from '../store/initialState'

const rootReducer = (state = initialState, action) => {
  if (action.type === 'CHANGE_VISIBILITY') {
    return {
      ...state,
      sidebarVisible: action.sidebarVisible
    }
  } else {
    return state
  }
}
export default rootReducer