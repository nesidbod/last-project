import { connect } from 'react-redux'
import IRootState from '../../models/rootState'
import { getRecommendations } from '../../redux/actions/recommendationsActions'
import Recommendations from './Recommendations'

const mapStateToProps = (state: IRootState) => ({
  tracks: state.recommendation.tracks,
  search: state.search,
})

const mapDispatchToProps = {
  getRecommendations
}

const RecommendationsContainer = connect(mapStateToProps, mapDispatchToProps)(
  Recommendations
)

export default RecommendationsContainer
