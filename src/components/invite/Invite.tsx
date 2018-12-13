import * as React from 'react'
import { Redirect } from 'react-router'
import IAction from '../../models/IAction'

interface IInviteProps {
  match: any
  storeInviteId(inviteId: string): IAction
}

class Invite extends React.Component<IInviteProps, {}> {
  public componentWillMount() {
    const inviteId = this.props.match.params.inviteId
    if (inviteId) {
      this.props.storeInviteId(inviteId)
    }
  }

  public render() {
    return <Redirect to="/login-invite" />
  }
}

export default Invite
