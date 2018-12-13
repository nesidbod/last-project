import { connect } from 'react-redux'
import IRootState from '../../models/rootState'
import { selectPage,showFinderModalEvent } from '../../redux/actions/activeActions'
import BottomBar from './BottomBar'

const mapStateToProps = (state: IRootState) => ({
  selectedPage: state.active.selectedPage,
  showBars: state.active.showBars,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.data
})

const mapDispatchToProps = {
  selectPage,
  showFinderModalEvent
}

const BottomBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomBar)

export default BottomBarContainer
