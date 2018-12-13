import { combineReducers } from 'redux'
import active from './reducers/activeActionsReducer'
import auth from './reducers/authReducer'
import event from './reducers/eventReducer'
import invite from './reducers/inviteReducer'
import playlist from './reducers/playlistReducer'
import recommendation from './reducers/recommendationReducer'
import search from './reducers/searchReducer'
import suggestion from './reducers/suggestionReducer'
import track from './reducers/trackReducer'
import user from './reducers/userReducer'
import vote from './reducers/voteReducer'

const reducers = combineReducers({
  auth,
  event,
  invite,
  playlist,
  recommendation,
  search,
  suggestion,
  track,
  user,
  vote,
  active
})

export default reducers
