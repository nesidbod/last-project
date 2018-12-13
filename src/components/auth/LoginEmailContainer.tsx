import { connect } from 'react-redux'
import IRootState from '../../models/rootState'
import { clearAuthError, loginWithPassword } from '../../redux/actions/authActions'
import LoginEmail from './LoginEmail'
// import { showSpinner } from '../../redux/actions/activeActions'

const mapStateToProps = (state: IRootState) => ({
  isAuthenticating: state.auth.isAuthenticating,
  authError: state.auth.authError
})

const mapDispatchToProps = {
  clearAuthError,
  loginWithPassword,
  // showSpinner
}

const LoginEmailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginEmail)

export default LoginEmailContainer
