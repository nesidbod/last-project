import { connect } from 'react-redux'
import IRootState from '../../models/rootState'
import { showFinderModalEvent } from '../../redux/actions/activeActions'
import { selectEvent, showSpinner } from '../../redux/actions/activeActions'
import { fetchUsersEvents, getEvent } from '../../redux/actions/eventActions'
import { fetchInviteEvent } from '../../redux/actions/inviteActions'
import { fetchPlaylists, onPlaylistSelected } from '../../redux/actions/playlistActions'
import {
  clearSavedSuggestion,
  getSuggestions,
  savePlaylistSuggestion,
  saveTrackSuggestion
} from '../../redux/actions/suggestionActions'
import { deselectTrack, selectTrack } from '../../redux/actions/trackActions'

import Finder from './Finder'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  selectedPlaylist: state.playlist.selectedPlaylist,
  userPlaylists: state.playlist.data,
  event: state.event.event,
  events: state.event.events,
  search: state.search,
  votes: state.vote.votes,
  showFinderModal: state.active.showFinderModalEvent,
  selectedTrack: state.track.selectedTrack,
  suggestion: state.suggestion.suggestions
})

const mapDispatchToProps = {
  fetchUserPlaylists: fetchPlaylists,
  onPlaylistSelected,
  saveTrackSuggestion,
  savePlaylistSuggestion,
  showFinderModalEvent,
  clearSavedSuggestion,
  getSuggestions,
  fetchUsersEvents,
  fetchInviteEvent,
  selectEvent,
  deselectTrack,
  selectTrack,
  showSpinner,
  getEvent
}

const FinderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Finder as any)

export default FinderContainer
