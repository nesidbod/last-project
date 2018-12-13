import { connect } from 'react-redux'
import IRootState from '../../models/rootState'
import { showSpinner } from '../../redux/actions/activeActions'
import { fetchInviteEvent } from '../../redux/actions/inviteActions'
import {
  fetchPlaylists,
  onPlaylistSelected
} from '../../redux/actions/playlistActions'
import PlayListView from './PlaylistView'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.event.event,
  events: state.event.events,
  userPlaylists: state.playlist.data
})

const mapDispatchToProps = {
  fetchUserPlaylists: fetchPlaylists,
  onPlaylistSelected,
  showSpinner,
  fetchInviteEvent
}

const LoginInviteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayListView)

export default LoginInviteContainer
