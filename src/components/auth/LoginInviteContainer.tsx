import { connect } from 'react-redux'
import IRootState from '../../models/rootState'
import { clearAuthError, loginAsGuest } from '../../redux/actions/authActions'
import { fetchInvite, loadInviteId } from '../../redux/actions/inviteActions'
import LoginInvite from './LoginInvite'

const mapStateToProps = (state: IRootState) => ({
  auth: state.auth,
  inviteId: state.invite.inviteId,
  event: state.invite.event
})

const mapDispatchToProps = {
  clearAuthError,
  loginAsGuest,
  loadInviteId,
  fetchInvite
}

const LoginInviteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginInvite)

export default LoginInviteContainer
