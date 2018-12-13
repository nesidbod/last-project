import Action from '../../models/IAction'
import initialState from '../../models/playlist/playlistInitialState'
import {
  FETCH_PLAYLISTS,
  FETCH_PLAYLISTS_ERROR,
  FETCH_PLAYLISTS_SUCCESS,
  PLAYLIST_CLEAR,
  PLAYLIST_DESELECTED,
  PLAYLIST_SELECTED
} from '../actions/playlistActions'

export default function playlist(
  state = initialState,
  { type, payload }: Action
) {
  switch (type) {
    case FETCH_PLAYLISTS:
      return { ...state, isLoading: true }
    case FETCH_PLAYLISTS_SUCCESS:
      return { ...state, data: payload, isLoading: false }
      case PLAYLIST_CLEAR:
      return { ...state, data: [], selectedPlaylist: undefined, isLoading: false }
    case FETCH_PLAYLISTS_ERROR:
      return { ...state, error: payload }
    case PLAYLIST_SELECTED:
      return { ...state, selectedPlaylist: payload }
    case PLAYLIST_DESELECTED:
      return { ...state, selectedPlaylist: undefined }
    default:
      return state
  }
}
