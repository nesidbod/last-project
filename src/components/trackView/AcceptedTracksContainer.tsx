import { connect } from 'react-redux'
import IRootState from '../../models/rootState'
import AcceptedTracks from './AcceptedTracks'

const mapStateToProps = (state: IRootState) => ({
  suggestions: state.suggestion.suggestions,
  events: state.event.events
})

const mapDispatchToProps = {}

const AcceptedTracksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AcceptedTracks)

export default AcceptedTracksContainer
