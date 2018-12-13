import IAction from '../../models/IAction'
import ITrack from '../../models/track/ITrack'
import initialState from '../../models/track/trackInitialState'
import { TRACK_DESELECTED, TRACK_SELECTED } from '../actions/trackActions'
import track from './trackReducer'

it('should return the initial state when no action matches', () => {
  expect(track(undefined, {} as IAction)).toEqual(initialState)
})

it('should handle TRACK_SELECTED', () => {
  expect(
    track(initialState, { type: TRACK_SELECTED, payload: {} as ITrack })
  ).toEqual({
    ...initialState,
    selectedTrack: {} as ITrack
  })
})

it('should handle TRACK_DESELECTED', () => {
  expect(
    track(
      { ...initialState, selectedTrack: {} as ITrack },
      { type: TRACK_DESELECTED }
    )
  ).toEqual({
    ...initialState
  })
})
