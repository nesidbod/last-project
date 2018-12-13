import IAction from '../../models/IAction'
import IVoteState from '../../models/vote/IVoteState'
import initialState from '../../models/vote/voteInitialState'
import { FETCH_EVENT_VOTES_SUCCESS } from '../actions/voteActions'

export default function vote(
  state: IVoteState = initialState,
  { type, payload }: IAction
) {
  switch (type) {
    case FETCH_EVENT_VOTES_SUCCESS:
      return { ...state, votes: new Map(Object.entries(payload)) } as IVoteState
    default:
      return state
  }
}
