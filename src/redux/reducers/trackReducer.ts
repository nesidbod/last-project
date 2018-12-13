import IAction from '../../models/IAction'
import ITrackState from '../../models/track/ITrackState'
import initialState from '../../models/track/trackInitialState'
import { TRACK_DESELECTED, TRACK_SELECTED } from '../actions/trackActions'

export default function track(
  state = initialState,
  { type, payload }: IAction
) {
  switch (type) {
    case TRACK_SELECTED:
      return { ...state, selectedTrack: payload } as ITrackState
    case TRACK_DESELECTED:
      return { ...state, selectedTrack: undefined } as ITrackState
    default:
      return state
  }
}
