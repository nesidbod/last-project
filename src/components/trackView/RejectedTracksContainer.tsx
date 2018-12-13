import { connect } from 'react-redux'
import IRootState from '../../models/rootState'
import RejectedTracks from './RejectedTracks'

const mapStateToProps = (state: IRootState) => ({
  suggestions: state.suggestion.suggestions,
  events: state.event.events

})

const mapDispatchToProps = {}

const RejectedTracksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RejectedTracks)

export default RejectedTracksContainer
