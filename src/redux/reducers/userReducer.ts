import Action from '../../models/IAction'
import { emptyUser } from '../../models/user/userInitialState'
import { LOGGED_OUT } from '../actions/authActions'
import { FETCH_USER, FETCH_USER_ERROR, FETCH_USER_SUCCESS } from '../actions/userActions'

export default function user(state = emptyUser, { type, payload }: Action) {
  switch (type) {
    case FETCH_USER:
      return { ...state, isLoading: true }
    case FETCH_USER_SUCCESS:
      return { ...state, data: payload, isLoading: false }
    case FETCH_USER_ERROR:
      return { ...state, error: payload }
    case LOGGED_OUT:
      return { ...state, data: undefined, isLoading: false }
    default:
      return state
  }
}
