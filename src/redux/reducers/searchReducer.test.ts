import IAction from '../../models/IAction'
import initialState from '../../models/search/searchInitialState'
import ITrack from '../../models/track/ITrack'
import { SEARCH_SUCCESS } from '../actions/searchActions'
import search from './searchReducer'

it('should return the initial state when no action matches', () => {
  expect(search(undefined, {} as IAction)).toEqual(initialState)
})

it('should handle SEARCH_SUCCESS', () => {
  expect(
    search(initialState, { type: SEARCH_SUCCESS, payload: [{} as ITrack] })
  ).toEqual({
    ...initialState,
    tracks: [{} as ITrack]
  })
})
