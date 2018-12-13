import { connect } from 'react-redux'
import IRootState from '../../models/rootState'
import {
  selectPage,
  showSpinner
} from '../../redux/actions/activeActions'
import { fetchUsersEvents, getEvent } from '../../redux/actions/eventActions'
import { fetchInviteEvent } from '../../redux/actions/inviteActions'

import EventListView from './EventListView'
const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  events: state.event.events,
  event: state.event.event
})

const mapDispatchToProps = {
  fetchUsersEvents,
  selectPage,
  showSpinner,
  getEvent,
  fetchInviteEvent
}

const EventListViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventListView)

export default EventListViewContainer
