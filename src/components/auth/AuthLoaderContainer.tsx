import { connect } from 'react-redux'
import IRootState from '../../models/rootState'
import { login } from '../../redux/actions/authActions'
import AuthLoader from './AuthLoader'

const mapStateToProps = (state: IRootState) => ({
  isAuthenticating: state.auth.isAuthenticating
})

const mapDispatchToProps = {
  login
}

const AuthLoaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoader)

export default AuthLoaderContainer
