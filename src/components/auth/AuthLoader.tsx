import * as React from 'react'
import IAction from '../../models/IAction'
import LoadingPage from '../../sComponents/loadingPage/LoadingPage'
import '../../styles/auth/Login.css'

interface IAuthLoader {
  isAuthenticating: boolean
  login(): IAction
}

class AuthLoader extends React.Component<IAuthLoader, {}> {
  public componentDidMount() {
    this.props.login()
  }

  public render() {
    const { isAuthenticating } = this.props
    if (isAuthenticating) {
      return <LoadingPage />
    }

    return this.props.children
  }
}

export default AuthLoader
