import { connect } from 'react-redux'
import IRootState from '../../models/rootState'
import { clearAuthError, signUp } from '../../redux/actions/authActions'
import SignUp from './SignUp'
// import { showSpinner } from '../../redux/actions/activeActions'

const mapStateToProps = (state: IRootState) => ({
  isAuthenticating: state.auth.isAuthenticating,
  authError: state.auth.authError
})

const mapDispatchToProps = {
  clearAuthError,
  signUp,
  // showSpinner
}

const SignUpContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)

export default SignUpContainer
