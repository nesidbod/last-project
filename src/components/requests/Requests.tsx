import {
  AppBar,
  Divider,
  // Icon,
  // IconButton,
  // Menu,
  // MenuItem,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core'
// import MoreVertIcon from '@material-ui/icons/MoreVert'
import * as React from 'react'
import SwipeableViews from 'react-swipeable-views'
import IEvent from '../../models/event/IEvent'
import IAction from '../../models/IAction'
import IUser from '../../models/user/IUser'
import '../../styles/requests/Requests.css'
import AcceptedTracks from '../trackView/AcceptedTracksContainer'
import MaybeTracks from '../trackView/MaybeTracksContainer'
import RejectedTracks from '../trackView/RejectedTracksContainer'

interface IRequestsProps {
  userLoading: boolean
  userError: Error
  eventLoading: boolean
  eventError: Error
  event: IEvent
  user: IUser
  suggestion: any
  fetchUsersEvents(): IAction
  getSuggestions(eventId: string): IAction
  fetchInviteEvent(): IAction
  getUsersSuggestions(): IAction
  showSpinner(value: boolean): IAction
}

interface IHomeState {
  value: number
  anchorEl: any
}

class Requests extends React.Component<IRequestsProps, IHomeState> {
  constructor(props: any) {
    super(props)
    this.state = {
      value: 0,
      anchorEl: NaN
    }
  }

  public componentDidMount() {
    this.props.fetchInviteEvent()
    this.props.showSpinner(true)
    this.props.getUsersSuggestions()
    this.props.fetchUsersEvents()
  }

  public handleChange = (event: any, value: any) => {
    this.setState({ value })
  }

  public handleChangeIndex = (index: any) => {
    this.setState({ value: index })
  }

  public handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  public handleClose = () => {
    this.setState({ anchorEl: null })
  }

  public render() {
    const { value } = this.state
    // const open = Boolean(anchorEl)
    const { suggestion, showSpinner } = this.props
    let tabs = <div />
    if (!suggestion.fetchingSuggestions) {
      showSpinner(false)
      tabs = (
        <div>
          {/* <div className="account-search-block">
              <Icon className="account-search-icon"> search</Icon>
              <input
                placeholder="Search for Track or Artist"
                className={'account-search'}
              />
              <IconButton
                aria-label="More"
                aria-owns={open ? 'long-menu' : ''}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu id="long-menu" open={open} onClose={this.handleClose}>
                <MenuItem onClick={this.handleClose}>{'zzcxcz'}</MenuItem>
              </Menu>
            </div> */}
          <Divider inset={true} className="divider-account-search-block" />
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={this.handleChange}
              className="account-tabs"
              indicatorColor="secondary"
              textColor="secondary"
              fullWidth={true}
              classes={{ indicator: 'indicator-color' }}
            >
              <Tab label="APPROVED" className="account-tab" />
              <Tab label="MAYBE" className="account-tab" />
              <Tab label="DECLINED" className="account-tab" />
            </Tabs>
          </AppBar>
          <div className="container-scroll">
            <SwipeableViews
              axis={'x'}
              index={value}
              onChangeIndex={this.handleChangeIndex}
            >
              {value === 0 ? (
                <Typography component="div" dir={'0'}>
                  <AcceptedTracks />
                  <div className="stoper-block" />
                </Typography>
              ) : <div />}
              {value === 1 ? (
                <Typography component="div" dir={'1'}>
                  <MaybeTracks />
                  <div className="stoper-block" />
                </Typography>
              ) : <div />}
              {value === 2 ? (
                <Typography component="div" dir={'2'}>
                  <RejectedTracks />
                  <div className="stoper-block" />
                </Typography>
              ) : <div />}
            </SwipeableViews>
          </div>
        </div>
      )
    }

    return tabs
  }
}

export default Requests
