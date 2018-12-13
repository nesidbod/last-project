import {
  AppBar,
  Avatar,
  Divider,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { Moment } from 'moment'
import * as React from 'react'
import { push } from 'react-router-redux'
import IAction from '../../models/IAction'
import IPlaylist from '../../models/playlist/IPlaylist';
import IUser from '../../models/user/IUser';
import { store } from '../../redux/store'
import GoogleMapView from '../../sComponents/gMap/GoogleMapView'
import '../../styles/event/Event.css'
import Images from '../../styles/img/ImportImg'

interface IEventProps {
  event: any
  user: IUser
  history: any
  eventLoading: boolean
  inviteId: string
  fetchInviteEvent(): IAction
  onPlaylistSelected(playlist: IPlaylist): IAction
  selectPage(value: string): IAction
  showSpinner(value: boolean): IAction
  getSuggestions(eventId: string): IAction
  fetchOrCreateRsvp(inviteId: string, userId: string, eventId: string): IAction
}

class Event extends React.Component<IEventProps, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      mainImage: props.image || Images.Image,
      location: props.location || 'Sir Henrys Nightclub, Cork',
      data: props.data || '13 july 2018',
      anchorEl: null,
      value: 0,
      menuValue: "I'm Going",
      openPopup: true
    }
  }

  public componentWillMount() {

    if (!!!this.props.event) {
      this.props.fetchInviteEvent()
      this.props.showSpinner(true)
    } else {
      // this.props.getSuggestions(this.props.event.eventId)
    }
  }

  public componentDidUpdate(prevProps: IEventProps) {
    if (!this.hasArgsToDoRsvp(prevProps) && this.hasArgsToDoRsvp(this.props)) {
      const { inviteId, user, event } = this.props
      this.props.fetchOrCreateRsvp(inviteId, user.userId, event.eventId)
    }
  }

  public handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  public handleClose = () => {
    this.setState({ anchorEl: null })
  }

  public handleChange = (event: any, value: any) => {
    this.setState({ value })
  }

  public onEnter = (value: any) => {
    this.setState({ menuValue: value })
    // if (this.hasArgsToDoRsvp(this.props) && value === "I'm Going") {
      const { inviteId, user, event } = this.props
      this.props.fetchOrCreateRsvp(inviteId, user.userId, event.eventId)
    // }
    this.handleClose()
  }

  public render() {
    const { anchorEl, menuValue, value,openPopup } = this.state
    const { event, showSpinner } = this.props
    let eventTabs = <div />

    if (typeof event !== 'undefined') {
      showSpinner(false)
      const times = this.dateFormat(event)

      eventTabs = (
        <div className="event-container">
          <div className="event-header-top-menu">
            <Icon
              onClick={() => {
                store.dispatch(push('/events'))
              }}
            >
              {' '}
              chevron_left
            </Icon>
          </div>
          <div className="event-header-container">
            <img className="event-img" />
            <div className="event-img-info-block">
              <div className="event-img-calendar">
                <div className="event-img-calendar-month">{event.startDateTime.format('MMM')}</div>
                <div className="event-img-calendar-number">{event.startDateTime.format('D')}</div>
              </div>
              <div className="event-img-info">
                <div className="event-img-info-title">{event.name}</div>
                <div className="event-img-info-location">
                  <Icon>location_on</Icon>
                  {event.location.address}
                </div>
              </div>
            </div>
            <Button
              variant="contained"
              size="small"
              className={`event-button ${!!!event.playlist.tracks.items.length ? 'disabled' : ''}`}
              disabled={!!!event.playlist.tracks.items.length}
              onClick={() => {
                this.props.onPlaylistSelected(event.playlist)
                this.props.history.push(`/playlist/${event.playlist.id}`)
              }}
            >
              <Icon className="event-button-icon">queue_music</Icon> Event
              Playlist
            </Button>
          </div>
          <div>
            <AppBar position="static" color="default">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                fullWidth={true}
                classes={{ indicator: 'indicator-color' }}
                className="event-tabs"
              >
                <Tab icon={<Icon>event</Icon>} className="event-tab" />
                <Tab icon={<Icon>location_on</Icon>} className="event-tab" />
                <Tab icon={<Icon>account_circle</Icon>} className="event-tab" />
              </Tabs>
            </AppBar>
            {value === 0 && (
              <Typography component="div">
                <div className="event-colendar-tab">
                  <div className="event-organiser-container">
                    <div>
                      <div className="event-img-container">
                        <div className="event-img-info-title">Organiser</div>
                        <Avatar>
                          <img
                            className="img-cover"
                            src={
                              event.imageUrl
                                ? event.imageUrl
                                : 'https://images-eu.ssl-images-amazon.com/images/I/513renRKckL._SS500.jpg'
                            }
                          />
                        </Avatar>
                      </div>
                      <div className="event-organiser-desc-container">
                        <div className="event-organiser-title">DJ P-Jay</div>
                        <div className="event-organiser-desc">
                          {event.organizer}
                        </div>
                      </div>
                    </div>
                    <div>
                      <Button
                        aria-haspopup="true"
                        onClick={this.handleClick}
                        className="event-button"
                      >
                        {menuValue}
                        <Icon> arrow_drop_down</Icon>
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                      >
                        <MenuItem onClick={() => this.onEnter("I'm Going")}>
                          I'm Going
                        </MenuItem>
                        <MenuItem onClick={() => this.onEnter('Maybe')}>
                          Maybe
                        </MenuItem>
                        <MenuItem onClick={() => this.onEnter("I'm not going")}>
                          I'm not going
                        </MenuItem>
                      </Menu>
                    </div>
                  </div>
                  <div className="event-description-container">
                    <div className="event-times-container-column-title">
                      Description
                    </div>
                    <div className="event-description-container-column-desc">
                      {event.description}
                    </div>
                  </div>
                  <div className="event-times-container">
                    <div className="event-times-container-column">
                      <div className="event-times-container-column-title">
                        Times
                      </div>
                      <div className="event-times-container-column-desc">
                        {times}
                      </div>
                    </div>
                  </div>
                </div>
              </Typography>
            )}
            {value === 1 && (
              <Typography component="div" dir={'1'}>
                <GoogleMapView
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  position={event.location.latLng}
                  isOpen={openPopup}
                  onOpen={(val: boolean)=> this.setState({openPopup: val})}
                  address={event.location.address}
                  venue={event.venue}
                />
              </Typography>
            )}
            {value === 2 && (
              <Typography component="div" dir={'2'}>
                <div className="container-scroll">
                  <div className="event-colendar-tab">
                    <div className="event-img-info-title guests">
                      {event.guests.length} Guests Invited
                  </div>
                    {event.guests.map((user: any, index: number) => {
                      return (
                        <div key={index}>
                          <ListItem>
                            <Avatar>
                              <img
                                className="img-cover"
                                src={user.user.image || ''}
                              />
                            </Avatar>
                            <ListItemText
                              primary={user.user.displayName || 'guest'}
                            />
                          </ListItem>
                          <Divider inset={true} />
                        </div>
                      )
                    })}
                    <div className="stoper-block" />
                    <div className="stoper-block" />

                  </div>
                </div>
              </Typography>
            )}
          </div>
        </div>
      )
    }

    return eventTabs
  }

  private hasArgsToDoRsvp({ user, inviteId, event }: IEventProps) {
    return !!user && !!inviteId && !!event
  }

  private getEndDateFormat(startDate: Moment, endDate: Moment) {
    const message = `${
      startDate.format('DD') === endDate.format('DD') ? 'h:mm a' : 'h:mm a, Do '
      }
     ${startDate.format('MMMM') === endDate.format('MMMM') ? '' : 'MMMM'}`
    return message
  }

  private dateFormat(event: any) {
    if (!event) {
      return null
    }
    const { startDateTime, endDateTime } = event
    return `${startDateTime.format('Do MMMM, h:mm a')} to ${endDateTime.format(
      this.getEndDateFormat(startDateTime, endDateTime)
    )}`
  }
}

export default Event
