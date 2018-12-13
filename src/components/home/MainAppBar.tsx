import {
  AppBar,
  Avatar,
  Icon,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@material-ui/core'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'
import * as React from 'react'
import { Cookies } from 'react-cookie'
import IAction from '../../models/IAction'
import IUser from '../../models/user/IUser'

import MenuIcon from '@material-ui/icons/Menu'

const decorate = withStyles(({ transitions, zIndex }) => ({
  root: {},
  appBar: {
    transition: transitions.create(['width', 'margin'], {
      duration: transitions.duration.leavingScreen,
      easing: transitions.easing.sharp
    }),
    zIndex: zIndex.drawer + 1
  },
  hide: {
    display: 'none'
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  profile: {
    marginRight: 12
  },
  title: {
    flex: 1,
    cursor: 'pointer'
  }
}))

interface IMainAppBarProps {
  user: IUser
  cookies: Cookies
  activePage: string
  history: any
  isAuthenticated: boolean
  logout(): IAction
  handleTitleClicked(): void
  selectPage(value: string): any
}

export default decorate(
  class MainAppBar extends React.Component<
    IMainAppBarProps &
    WithStyles<
    'root' | 'appBar' | 'hide' | 'menuButton' | 'profile' | 'title'
    >
    > {
    public state = {
      anchorEl: undefined,
      anchorEl2: undefined,
      showBar: this.getShowingValue(this.props.history.location.pathname),
      activePage: this.props.history.location.pathname.split('/').slice(1)[0]
    }

    public componentDidUpdate() {
      this.isShowingBar()
    }

    public handleMenu = (event: any) => {
      this.setState({ anchorEl: event.currentTarget })
    }
    public handleMenu2 = (event: any) => {
      this.setState({ anchorEl2: event.currentTarget })
    }

    public handleClose = () => {
      this.setState({ anchorEl: undefined })
    }

    public handleClose2 = () => {
      this.setState({ anchorEl2: undefined })
    }

    public handleLogout = () => {
      const { cookies, logout } = this.props
      this.setState({ anchorEl: undefined })
      cookies.remove('jwt')
      logout()
    }

    public render() {
      const { classes, user, isAuthenticated } = this.props
      const { anchorEl, anchorEl2, activePage } = this.state
      const open = Boolean(anchorEl)
      const userHasProfileImage = !!user && !!user.image

      const profilePic = (
        <div className={`${classes.profile} top-appBar-account`}>
          <IconButton
            aria-owns={open ? 'menu-appbar' : undefined}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >
            {userHasProfileImage ? (
              <Avatar
                alt="user profile"
                src={user.image}
                className={'user-profile-img'}
              />
            ) : (
                <AccountCircle />
              )}
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              horizontal: 'right',
              vertical: 'top'
            }}
            transformOrigin={{
              horizontal: 'right',
              vertical: 'top'
            }}
            open={open}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      )

      return (
        this.getShowingValue(this.props.history.location.pathname) && isAuthenticated ? (
          <AppBar
            position="static"
            className={`top-appBar ${activePage === 'invite' ? '' : 'main'}`}
          >
            <Toolbar variant="dense">
              <IconButton color="inherit" aria-label="Menu" onClick={this.handleMenu2}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="burger-menu"
                anchorEl={anchorEl2}
                open={Boolean(anchorEl2)}
                onClose={this.handleClose2}
                disableAutoFocusItem={true}
                classes={{ paper: 'burger-menu-paper' }}
              >

                <div className="burger-menu-user">
                   <Avatar
                    alt="user profile"
                    src={user.image || ''}
                    className={'user-profile-img'}
                  /> 
                  <ListItemText
                    className="playlist-content-title"
                    primary={user.displayName}
                    secondary={user.email}
                  />
                </div>
                <MenuItem onClick={() => {
                  this.props.history.push('events')
                  this.setState({ anchorEl2: undefined })
                }} className={`burger-menu-item ${activePage === 'events' ? 'active' : ''}`}><Icon>event</Icon> <span>Events</span></MenuItem>
                <MenuItem onClick={() => {
                  this.props.history.push('playlist')
                  this.setState({ anchorEl2: undefined })
                }} className={`burger-menu-item ${activePage === 'playlist' ? 'active' : ''}`}><Icon>library_music</Icon><span>Playlists</span></MenuItem>
                <MenuItem onClick={() => {
                  this.props.history.push('finder')
                  this.setState({ anchorEl2: undefined })
                }} className={`burger-menu-item ${activePage === 'finder' ? 'active' : ''}`}><Icon>search</Icon><span>Finder</span></MenuItem>
                <MenuItem onClick={() => {
                  this.props.history.push('requests')
                  this.setState({ anchorEl2: undefined })
                }} className={`burger-menu-item ${activePage === 'requests' ? 'active' : ''}`}><Icon>favorite</Icon><span>My Requests</span></MenuItem>
                <MenuItem onClick={() => {
                  this.props.history.push('account')
                  this.setState({ anchorEl2: undefined })
                }} className={`burger-menu-item ${activePage === 'account' ? 'active' : ''}`}><Icon>account_circle</Icon><span>Account</span></MenuItem>
              </Menu>
              <Typography variant="title" className="top-appBar-title">
                {activePage === 'finder'
                  ? 'MUSIC FINDER'
                  : this.props.history.location.pathname.split('/').slice(1)[0].toUpperCase()}
              </Typography>
              {profilePic}
            </Toolbar>
          </AppBar>
        ) : (
            ''
          )
      )
    }

    private isShowingBar() {
      const { history } = this.props

      history.listen((data: any) => {
        const { pathname = '' } = data
        this.setState({ showBar: this.getShowingValue(pathname) })
        this.setState({ activePage: pathname.split('/').slice(1)[0] })

      })
    }

    private getShowingValue(pathName: string) {
      const pathLevels = pathName.split('/').slice(1)
      switch (true) {
        case pathLevels[0] === 'about': {
          return false
        }
        case pathLevels[0] === 'login': {
          return false
        }
        case pathLevels[0] === 'login-invite': {
          return false
        }
        case pathLevels[0] === 'signup': {
          return false
        }
        case !!(pathLevels[0] === 'events' && pathLevels[1]): {
          return false
        }
        default:
          return true
      }
    }
  }
)
