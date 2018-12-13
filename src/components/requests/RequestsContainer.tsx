import { connect } from 'react-redux'
import IRootState from '../../models/rootState'
import { showSpinner } from '../../redux/actions/activeActions'
import { fetchUsersEvents } from '../../redux/actions/eventActions'
import { fetchInviteEvent } from '../../redux/actions/inviteActions'
import { getSuggestions,getUsersSuggestions } from '../../redux/actions/suggestionActions'
import Requests from './Requests'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.event.event,
  suggestion: state.suggestion
})

const mapDispatchToProps = {
  getSuggestions,
  fetchInviteEvent,
  getUsersSuggestions,
  showSpinner,
  fetchUsersEvents
}

const RequestsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Requests)

export default RequestsContainer
