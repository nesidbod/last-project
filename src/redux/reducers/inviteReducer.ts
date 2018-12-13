import Action from '../../models/IAction'
import IInvite from '../../models/invite/IInvite'
import IInviteState from '../../models/invite/IInviteState'
import initialState from '../../models/invite/inviteInitialState'
import {
  FETCHING_INVITE_ERROR,
  FETCHING_INVITE_SUCCESS,
  INVITE_ID_LOADED
} from '../actions/inviteActions'

export default function invite(
  state = initialState,
  { type, payload }: Action
): IInviteState {
  switch (type) {
    case INVITE_ID_LOADED:
      return {
        ...state,
        inviteId: payload
      }
    case FETCHING_INVITE_ERROR:
      return {
        ...state,
        error: payload
      }
    case FETCHING_INVITE_SUCCESS: {
      const { inviteId, event } = payload || ({} as IInvite)
      return {
        ...state,
        inviteId,
        event
      }
    }
    default:
      return state
  }
}
