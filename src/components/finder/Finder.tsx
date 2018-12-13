import {
  AppBar,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  Icon,
  ListItemText,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import * as React from 'react'
import SwipeableViews from 'react-swipeable-views'
import IEvent from '../../models/event/IEvent'
import IAction from '../../models/IAction'
import IPlaylist from '../../models/playlist/IPlaylist'
import IPlaylistItem from '../../models/playlist/IPlaylistItem'
import IPlaylistSuggestion from '../../models/suggestion/IPlaylistSuggestion'
import ISuggestion from '../../models/suggestion/ISuggestion'
import ITrackSuggestion from '../../models/suggestion/ITrackSuggestion'
import ITrack from '../../models/track/ITrack'
import IUser from '../../models/user/IUser'
import { subscribeToSuggestionsAccepted } from '../../other/notification/index'
import SnackbarsView from '../../sComponents/Snackbars/Snackbars'
import '../../styles/finder/Finder.css'
import Images from '../../styles/img/ImportImg'
import EventList from '../event/EventList'
import PlaylistsSimpleList from '../playlist/PlaylistsSimpleList'
import Recommendations from '../recommendation/RecommendationsContainer'
import Search from '../search/SearchContainer'
import SuggestView from '../suggestion/SuggestViewContainer'
import TrackList from '../track/TrackList'

interface IFinderProps {
  user: IUser
  selectedPlaylist: IPlaylist
  userPlaylists: IPlaylist[]
  event: IEvent
  events: IEvent[]
  suggestion: ISuggestion[]
  search: any
  showFinderModal: boolean
  history: any
  selectedTrack: ITrack
  onPlaylistSelected(playlist: IPlaylist): IAction
  showFinderModalEvent(value: boolean): IAction
  fetchUsersEvents(): IAction
  fetchInviteEvent(): IAction
  saveTrackSuggestion(suggestion: ITrackSuggestion): IAction
  savePlaylistSuggestion(suggestion: IPlaylistSuggestion): IAction
  deselectTrack(): IAction
  fetchUserPlaylists(user: IUser): IAction
  selectTrack(track: ITrack): IAction
  showSpinner(value: boolean): IAction
  getEvent(eventId: string): IAction
  getSuggestions(eventId: string): IAction
}

export default class Finder extends React.Component<IFinderProps, any> {
  constructor(props: IFinderProps) {
    super(props)

    this.state = {
      value:
        typeof this.props.selectedPlaylist !== 'undefined'
          ? !!Object.keys(this.props.selectedPlaylist).length && !!this.props.userPlaylists.length
            ? 1
            : 0
          : 0,
      open: true,
      selcetedEvent: props.event,
      openSnackbar: false,
      valueSnackbar: ''
    }
  }

  public componentDidMount() {
  if (this.props.event) {
      const eventId = this.props.event.eventId
      subscribeToSuggestionsAccepted(eventId, this.handleSuggestionsAccepted)
    }
  }

  public componentWillMount() {
    this.props.fetchInviteEvent()
    this.props.fetchUsersEvents()
    this.props.showSpinner(true)
  }

  public handleSuggestionsAccepted = (data: any) => {
    console.log('data',data)
    this.props.getSuggestions(this.props.event.eventId)
  }

  public componentWillUpdate() {
    if (this.props.user && !!!this.props.userPlaylists) {
      this.props.fetchUserPlaylists(this.props.user)
    } else {
      this.props.showSpinner(false)
    }
  }

  public handleChange = (event: any, value: any) => {
    this.setState({ value })
  }

  public handleChangeIndex = (index: any) => {
    this.setState({ value: index })
  }

  public render() {
    const { value, openSnackbar, valueSnackbar } = this.state
    const {
      onPlaylistSelected,
      event,
      selectTrack,
      selectedTrack,
      showSpinner,
      search,
    } = this.props
    const { userPlaylists = [] } = this.props

    let tabs = <div />
    const events = !!this.props.events.length
      ? this.props.events
      : [this.props.event]

    if (openSnackbar) {
      setTimeout(() => this.setState({ openSnackbar: !openSnackbar }), 2000)
    }

    const selectedPlaylist = this.props.selectedPlaylist || {}

    const handleTrackSelected = (track: ITrack) => {
      selectTrack(track)
    }

    if (!!selectedTrack) {
      this.handleSelectTrack()
    }

    if (!!event && !!events.length) {
      showSpinner(false)
      tabs = (
        <div>
          {this.renderUserPlaylists()}
          <Search />
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
              <Tab label="RECCOMENDED" className="account-tab" />
              <Tab label="MY PLAYLISTS" className="account-tab" disabled={!!userPlaylists.length ? false : true} />
              <Tab label="MY REQUESTS" className="account-tab" />
            </Tabs>
          </AppBar>
          {!!event && (
            <div className="finder-playlist-block">
              <div className="finder-playlist-img-block">
                <img src={event.imageUrl} />
              </div>
              <div className=" finder-playlist-desc-block">
                <ListItemText
                  primary={event.name}
                  secondary="DJ P-Jay"
                  classes={{ primary: 'finder-playlist-title' }}
                />
                <div className="finder-playlist-songs">
                  <span>
                    {/* {selcetedEvent.playlist.tracks.total} {' Songs '} */}
                  </span>
                  <span>3hr 45 mins</span>
                </div>
              </div>
            </div>
          )}
          <div className="container-scroll">
            <SwipeableViews
              axis={'x'}
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
              {value === 0 ? (
                <Typography component="div" dir={'0'}>
                  <Recommendations onRecommendationSelected={handleTrackSelected} />
                  <div className="stoper-block" />
                  <div className="stoper-block" />
                </Typography>
              ) : <div />}
              {value === 1 ? (
                <Typography component="div" dir={'1'}>
                  {!!Object.keys(selectedPlaylist).length &&
                    this.props.history.location.pathname !== '/finder' ? (
                      <div>
                        <div className="finder-playlist-header">
                          <div className="finder-playlist-img">
                            <img src={Images.Playlist} />
                          </div>
                          <div className="finder-playlist-container">
                            <div className="finder-playlist-container-top">
                              <Icon onClick={this.backToPlaylists}>
                                keyboard_backspace
                            </Icon>
                            </div>
                            <div className="finder-playlist-container-title">
                              {selectedPlaylist.name} <br />
                              {selectedPlaylist.tracks.total} {' Tracks'}
                            </div>
                            <div className="finder-playlist-container-button">
                              <Button
                                variant="fab"
                                color="primary"
                                className="finder-playlist-header-container-button"
                                onClick={() => this.handleSelectPlaylist()}
                              >
                                <AddIcon />
                              </Button>
                              <span className="finder-playlist-header-container-button-label">
                                Add All
                            </span>
                            </div>
                          </div>
                        </div>
                        <TrackList
                          tracks={
                            search.tracks.length
                              ? search.tracks
                              : selectedPlaylist.tracks.items.map(
                                (item: any) => item.track
                              )
                          }
                          withSuggesing={true}
                          onTrackSelected={handleTrackSelected}
                        />
                      </div>
                    ) : (
                      <PlaylistsSimpleList
                        playlists={userPlaylists}
                        onPlaylistSelected={onPlaylistSelected}
                        selectPlaylist={this.selectPlaylist}
                        attached={true}
                        addedPlaylist={this.handleSelectPlaylist}
                      />
                    )}
                  <div className="stoper-block" />
                </Typography>
              ) : <div />}
              {value === 2 ? (
                <Typography component="div" dir={'2'}>
                  <SuggestView />
                  <div className="stoper-block" />
                  <div className="stoper-block" />
                </Typography>
              ) : <div />}
            </SwipeableViews>
          </div>
          <SnackbarsView
            open={openSnackbar}
            value={valueSnackbar}
            close={this.closeSnackbar}
          />
        </div>
      )
    }
    showSpinner(search.searching)
    return tabs
  }

  private closeSnackbar = () => {
    this.setState({ openSnackbar: false })
  }

  private renderUserPlaylists = () => {
    return (
      <Dialog
        onClose={() => this.props.showFinderModalEvent(false)}
        open={this.props.showFinderModal}
      >
        <div className="finder-modal">
          <DialogTitle className="finder-modal-title">
            Select Event for Requests
          </DialogTitle>
          <div
            className="SuggestView-playlists"
            onClick={() => this.props.showFinderModalEvent(false)}
          >
            <EventList
              events={
                !!this.props.events.length
                  ? this.props.events
                  : [this.props.event]
              }
              selectEvent={this.selectEvent}
            />
          </div>
        </div>
      </Dialog>
    )
  }

  private handleSelectTrack = () => {
    const {
      event,
      user,
      deselectTrack,
      selectedTrack,
      saveTrackSuggestion
    } = this.props
    const eventId = event.eventId || ''
    const userId = user.userId || ''
    saveTrackSuggestion({
      eventId,
      userId,
      trackUri: selectedTrack.uri
    } as ITrackSuggestion)
    this.setState({
      openSnackbar: true,
      valueSnackbar: `Track ${selectedTrack.name} suggestion!`
    })
    this.props.getSuggestions(this.props.event.eventId)
    deselectTrack()
  }

  private handleSelectPlaylist = (Playlist?: IPlaylist) => {
    const { event, user, selectedPlaylist, savePlaylistSuggestion } = this.props

    const eventId = event.eventId || ''
    const userId = user.userId || ''
    const playlist: IPlaylist = Playlist || selectedPlaylist

    savePlaylistSuggestion({
      eventId,
      userId,
      playlistUri: playlist.uri,
      trackUris: playlist.tracks.items.map(
        (item: IPlaylistItem) => item.track.uri
      )
    } as IPlaylistSuggestion)

    this.setState({
      openSnackbar: true,
      valueSnackbar: `Playlist ${playlist.name} suggestion!`
    })
    this.props.getSuggestions(this.props.event.eventId)
    this.props.history.push('/finder')
  }

  private selectEvent = (event: any) => {
    this.props.getEvent(event.eventId)
    subscribeToSuggestionsAccepted(event.eventId, this.handleSuggestionsAccepted)
    this.props.getSuggestions(this.props.event.eventId)
  }

  private backToPlaylists = () => {
    this.props.history.push('/finder')
  }

  private selectPlaylist = (playlist: any) => {
    this.props.history.push(`/finder/${playlist.id}`)
  }
}
