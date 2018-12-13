import Action from '../../models/IAction'
import IPlaylist from '../../models/playlist/IPlaylist'
import initialState from '../../models/playlist/playlistInitialState'
import {
  FETCH_PLAYLISTS,
  FETCH_PLAYLISTS_ERROR,
  FETCH_PLAYLISTS_SUCCESS,
  PLAYLIST_DESELECTED,
  PLAYLIST_SELECTED
} from '../actions/playlistActions'
import playlist from './playlistReducer'

it('should return the initial state when no action matches', () => {
  expect(playlist(undefined, {} as Action)).toEqual(initialState)
})

it('should handle FETCH_PLAYLIST', () => {
  expect(playlist(initialState, { type: FETCH_PLAYLISTS })).toEqual({
    ...initialState,
    isLoading: true
  })
})

it('should handle FETCH_PLAYLIST_SUCCESS', () => {
  expect(
    playlist(
      { ...initialState, isLoading: true },
      {
        payload: {
          id: 'test-id'
        },
        type: FETCH_PLAYLISTS_SUCCESS
      }
    )
  ).toEqual({
    ...initialState,
    data: { id: 'test-id' },
    isLoading: false
  })
})

it('should handle FETCH_PLAYLIST_ERROR', () => {
  expect(
    playlist(initialState, {
      payload: new Error('Oh dear :('),
      type: FETCH_PLAYLISTS_ERROR
    })
  ).toEqual({ ...initialState, error: new Error('Oh dear :(') })
})

it('should handle PLAYLIST_SELECTED', () => {
  expect(
    playlist(initialState, {
      payload: {} as IPlaylist,
      type: PLAYLIST_SELECTED
    })
  ).toEqual({ ...initialState, selectedPlaylist: {} as IPlaylist })
})

it('should handle PLAYLIST_DESELECTED', () => {
  expect(
    playlist(
      { ...initialState, selectedPlaylist: {} as IPlaylist },
      {
        type: PLAYLIST_DESELECTED
      }
    )
  ).toEqual(initialState)
})
