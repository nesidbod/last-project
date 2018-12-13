import { withCookies } from 'react-cookie'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators, Dispatch } from 'redux'
import IRootState from '../../models/rootState'
import { selectPage } from '../../redux/actions/activeActions'
import { logout } from '../../redux/actions/authActions'
import MainAppBar from './MainAppBar'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  activePage: state.active.selectedPage,
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleTitleClicked: () => {
    dispatch(push('/'))
  },
  ...bindActionCreators({ logout }, dispatch),
  selectPage
})

const MainAppBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withCookies(MainAppBar))

export default MainAppBarContainer
