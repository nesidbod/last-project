import { connect } from 'react-redux'
import IRootState from '../../models/rootState'
import MaybeTracks from './MaybeTracks'

const mapStateToProps = (state: IRootState) => ({
  suggestions: state.suggestion.suggestions,
  events: state.event.events

})

const mapDispatchToProps = {}

const MaybeTracksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MaybeTracks)

export default MaybeTracksContainer
