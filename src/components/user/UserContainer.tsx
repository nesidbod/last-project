import { connect } from 'react-redux'
import IRootState from '../../models/rootState'
import { fetchUser } from '../../redux/actions/userActions'
import User from './User'

const mapStateToProps = (state: IRootState) => ({ user: state.user })

const mapDispatchToProps = {
  fetchUser
}

const UserContainer = connect(mapStateToProps, mapDispatchToProps)(User)

export default UserContainer
