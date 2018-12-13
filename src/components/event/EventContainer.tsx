import { connect } from 'react-redux'
import IRootState from '../../models/rootState'
import { selectPage, showSpinner } from '../../redux/actions/activeActions'
import { fetchInviteEvent } from '../../redux/actions/inviteActions'
import {
  onPlaylistSelected
} from '../../redux/actions/playlistActions'
import { fetchOrCreateRsvp } from '../../redux/actions/rsvpActions'
import { getSuggestions } from '../../redux/actions/suggestionActions'
import Event from './Event'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.event,
  user: state.user.data,
  suggestions: state.suggestion.suggestions,
  eventLoading: state.event.eventLoading,
  votes: state.vote.votes,
  inviteId: state.invite.inviteId
})

const mapDispatchToProps = {
  fetchInviteEvent,
  selectPage,
  showSpinner,
  onPlaylistSelected,
  getSuggestions,
  fetchOrCreateRsvp
}

const EventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Event)

export default EventContainer
