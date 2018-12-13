import IPlaylist from './IPlaylist'

export default interface IPlaylistState {
  data?: IPlaylist[]
  selectedPlaylist?: IPlaylist
  error?: Error
  isLoading: boolean
}
