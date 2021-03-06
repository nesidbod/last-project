import IAction from '../../models/IAction';
import ITrack from '../../models/track/ITrack'

export const TRACK_SELECTED = 'TRACK_SELECTED'
export const TRACK_DESELECTED = 'TRACK_DESELECTED'

export const selectTrack = (track: ITrack) => ({
  type: TRACK_SELECTED,
  payload: track
} as IAction)

export const deselectTrack = () => ({
  type: TRACK_DESELECTED
} as IAction)
