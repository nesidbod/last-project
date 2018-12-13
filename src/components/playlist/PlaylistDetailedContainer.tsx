import { connect } from 'react-redux'
import IRootState from '../../models/rootState'
import { showSpinner } from '../../redux/actions/activeActions'
import { fetchInviteEvent } from '../../redux/actions/inviteActions'
import {
  fetchPlaylists,
  onPlaylistSelected
} from '../../redux/actions/playlistActions'
import {deselectTrack,selectTrack } from '../../redux/actions/trackActions'
import { createVote, deleteVote,fetchEventVotes } from '../../redux/actions/voteActions'
import PlaylistDetailed from './PlaylistDetailed'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.event.event,
  events: state.event.events,
  userPlaylists: state.playlist.data,
  isLoading: state.playlist.isLoading,
  selectedPlaylist: state.playlist.selectedPlaylist,
  votes: state.vote.votes,
  selectedTrack: state.track.selectedTrack
})

const mapDispatchToProps = {
  showSpinner,
  fetchInviteEvent,
  createVote,
  deleteVote,
  selectTrack,
  fetchEventVotes,
  onPlaylistSelected,
  fetchUserPlaylists: fetchPlaylists,
  deselectTrack
}

const PlaylistDetailedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistDetailed)

export default PlaylistDetailedContainer
