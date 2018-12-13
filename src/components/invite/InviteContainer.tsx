import { connect } from 'react-redux'
import IRootState from '../../models/rootState'
import { storeInviteId } from '../../redux/actions/inviteActions'
import Invite from './Invite'

const mapStateToProps = (state: IRootState) => ({
})

const mapDispatchToProps = {
  storeInviteId
}

const InviteContainer = connect(mapStateToProps, mapDispatchToProps)(Invite)

export default InviteContainer
