import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Icon
} from '@material-ui/core'
import * as React from 'react'
import IAction from '../../models/IAction'
import IUser from '../../models/user/IUser'
import '../../styles/bottombar/BottomBar.css'
import Monkey from '../../styles/img/Other/Monkey_white.png'

interface IbottomBarProps {
  user: IUser
  selectedPage: string
  history: any
  showBars: boolean
  isAuthenticated: boolean
  selectPage(page: string): IAction
  showFinderModalEvent(value: boolean): IAction
}

class BottomBar extends React.Component<IbottomBarProps, any> {

  public showlabel: boolean = true

  public state = {
    selectedPage: this.props.history.location.pathname.split('/').slice(1)[0]
  }

  public handleStepChange = (event: object, value: any) => {
    this.props.selectPage(value)
    this.props.history.push(`/${value}`)
  }
  
  public componentDidUpdate() {
    this.props.history.listen((data: any) => {
      const { pathname = '' } = data
      this.setState({ selectedPage: pathname.split('/').slice(1)[0] })

    })
  }

  public render() {
    const {selectedPage} = this.state
    return (
      <div className="main-bottom-container">
        {this.showBar() && this.props.isAuthenticated ? (
          <BottomNavigation
            className="main-bottom-navigation"
            showLabels={this.showlabel}
          >
            <div className={'bottom-icon-menu-container'}>
              <BottomNavigationAction
                classes={{ label: 'bottom-icon-menu-label' }}
                onChange={this.handleStepChange}
                className={`bottom-icon-menu ${
                  selectedPage === ('events' || 'event') ? 'selected' : ''
                  }`}
                label="Events"
                value="events"
                showLabel={this.showlabel}
                icon={<Icon>event</Icon>}
              />
              <BottomNavigationAction
                classes={{ label: 'bottom-icon-menu-label' }}
                onChange={this.handleStepChange}
                className={`bottom-icon-menu ${
                  selectedPage === 'playlist' ? 'selected' : ''
                  }`}
                value="playlist"
                label="Playlist"
                showLabel={this.showlabel}
                icon={<Icon>library_music</Icon>}
              />
            </div>
            <div className="round-buttom-container">
              <div className="round-buttom">
                <Button
                  variant="fab"
                  className="round-buttom-yellow"
                  onClick={() => {
                    this.props.showFinderModalEvent(true)
                    this.handleStepChange({}, 'finder')
                  }}
                >
                  <img src={Monkey} />
                </Button>
              </div>
            </div>
            <div className={'bottom-icon-menu-container'}>
              <BottomNavigationAction
                classes={{ label: 'bottom-icon-menu-label' }}
                onChange={this.handleStepChange}
                className={`bottom-icon-menu ${
                  selectedPage === 'requests' ? 'selected' : ''
                  }`}
                value="requests"
                label="My Requests"
                showLabel={this.showlabel}
                icon={<Icon>favorite</Icon>}
              />
              <BottomNavigationAction
                classes={{ label: 'bottom-icon-menu-label' }}
                onChange={this.handleStepChange}
                className={`bottom-icon-menu ${
                  selectedPage === 'account' ? 'selected' : ''
                  }`}
                label="Account"
                value="account"
                showLabel={this.showlabel}
                icon={<Icon>account_circle</Icon>}
              />
            </div>
          </BottomNavigation>
        ) : (
            ''
          )}
      </div>
    )
  }

  private showBar = () => {
    switch (this.props.history.location.pathname) {
      case '/about': {
        return false
      }
      case '/login': {
        return false
      }
      case '/login-invite': {
        return false
      }
      case '/signup': {
        return false
      }
      default:
        return true
    }
  }
}

export default BottomBar
