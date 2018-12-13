import { Button, Icon } from '@material-ui/core'
import * as React from 'react'
import IAuthState from '../../models/auth/IAuthState'
import IAction from '../../models/IAction'
import ErrorNotification from '../../sComponents/util/ErrorNotification'
import '../../styles/auth/Login.css'
import Images from '../../styles/img/ImportImg'
import LoginEmail from './LoginEmailContainer'

const serviceUrl = process.env.REACT_APP_MM_API_URL
const authSuffix = process.env.REACT_APP_AUTH_SUFFIX

interface ILoginProps {
  auth: IAuthState
  clearAuthError(): IAction
  loginAsGuest(): IAction
  loginWithPassword(email: string, password: string): IAction
}

class Login extends React.Component<ILoginProps, {}> {
  public render() {
    const { authError } = this.props.auth
    let spotifyLoginUrl
    let facebookLoginUrl

    spotifyLoginUrl = serviceUrl + '/auth/spotify-guest' + authSuffix
    facebookLoginUrl = serviceUrl + '/auth/facebook-guest' + authSuffix

    return (
      <div className="content-stepper-between login">
        <div className="content-scroll">
          <div className="Login">
            <div className="main-page-content-container">
              <div className="flex-block-center">
                <div className="login-header-container">
                  <div className="login-header-title">Login</div>
                </div>
                <div className="main-page-content">
                  <LoginEmail />
                  <a href={facebookLoginUrl} className="text-decoration-none">
                    <Button
                      color="default"
                      className="main-page-content-text facebook"
                    >
                      <img src={Images.Facebook} />
                      SIGN IN WITH FACEBOOK
                    </Button>
                  </a>
                  <a href={spotifyLoginUrl} className="text-decoration-none">
                    <Button
                      color="default"
                      className="main-page-content-text email"
                    >
                      <img className="spotify-img" src={Images.Spotify} />
                      SIGN IN WITH SPOTIFY
                    </Button>
                  </a>
                </div>
              </div>
              <div className="main-page-divided">
                <span>OR</span>
              </div>
              <div className="flex-block-center">
                <div className="main-page-content">
                  <Button
                    color="default"
                    className="main-page-content-text account"
                    onClick={this.handleLoginAsGuestSelected}
                  >
                    <Icon>account_circle</Icon>
                    CONTINUE AS GUEST
                  </Button>
                </div>
              </div>
            </div>
            {authError &&
              authError.errorContext === 'guest-login' && (
                <ErrorNotification
                  message={
                    (authError.response && authError.response.data) ||
                    authError.message
                  }
                  onClose={this.handleErrorAcknowledged}
                />
              )}
          </div>
        </div>
      </div>
    )
  }

  private handleLoginAsGuestSelected = () => {
    this.props.loginAsGuest()
  }

  private handleErrorAcknowledged = () => {
    this.props.clearAuthError()
  }
}

export default Login
