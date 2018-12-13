import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { isEmpty } from 'lodash'
import * as React from 'react'
import IAuthState from '../../models/auth/IAuthState'
import IEvent from '../../models/event/IEvent'
import IAction from '../../models/IAction'
import ErrorNotification from '../../sComponents/util/ErrorNotification'
import '../../styles/auth/LoginInvite.css'
import Images from '../../styles/img/ImportImg'
import LoginEmail from './LoginEmailContainer'

const serviceUrl = process.env.REACT_APP_MM_API_URL
const authSuffix = process.env.REACT_APP_AUTH_SUFFIX

interface ILoginInviteProps {
  auth: IAuthState
  inviteId: string
  event: IEvent
  clearAuthError(): IAction
  loginAsGuest(): IAction
  loadInviteId(): IAction
  fetchInvite(inviteId: string): IAction
}

interface ILoginInviteState {
  loginWithEmail: boolean
}

class LoginInvite extends React.Component<
  ILoginInviteProps,
  ILoginInviteState
> {
  constructor(props: ILoginInviteProps) {
    super(props)

    this.state = {
      loginWithEmail: false
    }
  }

  public componentDidMount() {
    const { loadInviteId, inviteId, event, fetchInvite } = this.props
    if (!inviteId) {
      loadInviteId()
    } else if (isEmpty(event)) {
      fetchInvite(inviteId)
    }
  }

  public componentDidUpdate() {
    const { inviteId, fetchInvite } = this.props
    if (isEmpty(event) && inviteId) {
      fetchInvite(inviteId)
    }
  }

  public render() {
    let spotifyLoginUrl
    let facebookLoginUrl
    const { event } = this.props
    const { authError } = this.props.auth
    const { loginWithEmail } = this.state
    spotifyLoginUrl = serviceUrl + '/auth/spotify-guest' + authSuffix
    facebookLoginUrl = serviceUrl + '/auth/facebook-guest' + authSuffix

    const contentLoginInvite = (
      <div className="main-page-content-container">
        <img src={Images.Image} />
        <span className="img-description">
          {event.organizer} has invited you
        </span>
        <div className="flex-block-center">
          <div className="main-page-content">
            <span className="main-page-content-text title">
              {event.name} <br />
              {event.description}
            </span>
            <span className="main-page-content-text default-icons location">
              <Icon>location_on</Icon>
              {event.location ? event.location.address : event.venue}
            </span>
            <span className="main-page-content-text calendar">
              <Icon>event</Icon>
              {event.startDateTime}
            </span>
            <span className="main-page-content-text description">
              Sign In with Spotify to preview the <br />
              playlist & suggest the tracks you love
            </span>
            <a href={spotifyLoginUrl} className="text-decoration-none">
              <Button
                variant="contained"
                color="primary"
                className="buttom-sing-spotify"
              >
                <img className="spotify-img" src={Images.Spotify} />
                SIGN IN WITH SPOTIFY
              </Button>
            </a>
            <a href={facebookLoginUrl} className="text-decoration-none">
              <Button
                color="default"
                className="main-page-content-text facebook"
              >
                <img src={Images.Facebook} />
                SIGN IN WITH FACEBOOK
              </Button>
            </a>
            <Button
              color="default"
              className="main-page-content-text email"
              onClick={this.LoginWithEmail}
            >
              <Icon>email</Icon>
              SIGN IN WITH EMAIL
            </Button>
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
    )

    const contentEmailInvite = (
      <div className="invite-page-mail-content-container">
        <div className="login-header-container">
          <div className="login-header-title">Login</div>
        </div>
        <LoginEmail />
      </div>
    )

    return (
      <div className="content-stepper-between login">
        {loginWithEmail ? contentEmailInvite : contentLoginInvite}
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
    )
  }

  private handleLoginAsGuestSelected = () => {
    this.props.loginAsGuest()
  }

  private handleErrorAcknowledged = () => {
    this.props.clearAuthError()
  }

  private LoginWithEmail = () => {
    this.setState({ loginWithEmail: true })
  }
}

export default LoginInvite
