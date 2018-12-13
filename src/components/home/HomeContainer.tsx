import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import IRootState from '../../models/rootState'
import { fetchInviteEvent } from '../../redux/actions/inviteActions'
import { fetchOrCreateRsvp } from '../../redux/actions/rsvpActions'
import { getSuggestions } from '../../redux/actions/suggestionActions'
import { fetchEventVotes } from '../../redux/actions/voteActions'
import Home from './Home'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  userLoading: state.user.isLoading,
  userError: state.user.error,
  event: state.event.event,
  eventLoading: state.event.eventLoading,
  inviteId: state.invite.inviteId,
  eventError: state.event.fetchEventError
})

const mapDispatchToProps = {
  fetchInviteEvent,
  fetchOrCreateRsvp,
  getSuggestions,
  fetchEventVotes
}

const HomeContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
)

export default HomeContainer
