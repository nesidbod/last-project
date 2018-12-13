import * as React from 'react'
import Action from '../../models/IAction'
import IUserState from '../../models/user/IUserState'

interface IUserProps {
  user: IUserState
  fetchUser(): Action
}

export default class User extends React.Component<IUserProps, {}> {
  public componentDidMount() {
    this.props.fetchUser()
  }

  public render() {
    if (this.props.user.data) {
      const { email } = this.props.user.data
      return <h1>{email}</h1>
    } else {
      return <div>No user yet</div>
    }
  }
}
