import {
  AppBar,
  Button,
  Icon,
  ListItemText,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { goBack } from 'react-router-redux'
import SwipeableViews from 'react-swipeable-views'
import IEvent from '../../models/event/IEvent';
import IAction from '../../models/IAction'
import IPlaylist from '../../models/playlist/IPlaylist'
import ITrack from '../../models/track/ITrack';
import IUser from '../../models/user/IUser'
import ITrackVoteStatus from '../../models/vote/ITrackVoteStatus';
import IVote from '../../models/vote/IVote';
import { subscribeToVotesModified } from '../../other/notification/index'
import { store } from '../../redux/store'
import '../../styles/playlist/Playlist.css'
import PlayerContainer from '../player/PlayerContainer'
import PlayerPlaylistContainer from '../player/PlayerPlaylistContainer'
import TrackList from '../track/TrackList'

interface IPlayListProps extends RouteComponentProps<any> {
  user: IUser
  event: IEvent
  events: IEvent[]
  userPlaylists: IPlaylist[]
  selectedPlaylist: IPlaylist
  selectedTrack: ITrack
  votes: Map<string, ITrackVoteStatus>
  history: any
  showSpinner(value: boolean): IAction
  createVote(vote: IVote): IAction
  deleteVote(voteId: string): IAction
  selectTrack(track: ITrack): IAction
  fetchUserPlaylists(user: IUser): IAction
  deselectTrack(): IAction
  onPlaylistSelected(playlist: IPlaylist): IAction
  fetchEventVotes(eventId: string): IAction
  fetchInviteEvent(): IAction

}

export default class PlaylistDetailed extends React.Component<IPlayListProps, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      value: 0,
      showPlaylist: false,
      playlist: {},
      showPlayer: false,
      showPlayerPlaylist: false
    }
  }

  public componentWillMount() {
    this.props.showSpinner(true)
    if (this.props.event) {
      this.props.fetchEventVotes(this.props.event.eventId)
      subscribeToVotesModified(this.props.event.eventId, () => this.props.fetchEventVotes(this.props.event.eventId))
    }
  }
  
  public componentDidMount() {
    this.props.fetchInviteEvent()
    if (this.props.event) {
      this.props.fetchEventVotes(this.props.event.eventId)
    }
  }

  public handleChange = (event: any, value: any) => {
    this.setState({ value })
  }

  public handleChangeIndex = (index: any) => {
    this.setState({ value: index })
  }

  public renderApprovedTracks = (selectedPlaylist: any) => {

    return (<TrackList
      tracks={selectedPlaylist.tracks.items.map((s: any) => s.track)}
      withSuggesing={false}
      onTrackSelected={this.handleTrackSelected}
      withVoting={true}
      votes={this.props.votes}
      onVote={this.handleTrackVote}
    />)
  }

  public render() {
    let selectedPlaylist: any
    const { showPlayer, value, showPlayerPlaylist } = this.state
    const { userPlaylists, user, fetchUserPlaylists, showSpinner, history } = this.props

    if (!!!this.props.selectedPlaylist && !!!userPlaylists && !!user) {
      fetchUserPlaylists(this.props.user)
    }

    selectedPlaylist = !!this.props.selectedPlaylist ?
      this.props.selectedPlaylist :
      !!userPlaylists ?
        userPlaylists.filter(playlist => playlist.id === history.location.pathname.split('/').slice(1)[1])[0] || store.dispatch(goBack())
        : undefined

    if (!!!this.props.selectedPlaylist) {
      this.props.onPlaylistSelected(selectedPlaylist)

    }

    let PlaylistTabs = <div />
    if (typeof selectedPlaylist !== 'undefined') {
      showSpinner(false)
      PlaylistTabs = (
        <div className="playlist-tabs">
          {showPlayerPlaylist ? <PlayerPlaylistContainer handleTrackVote={this.handleTrackVote} showPlayerPlaylist={() => this.setState({ showPlayerPlaylist: !showPlayerPlaylist })} /> :
            <div className="playlist-header">
              <div className="playlist-header-top-menu">
                <Icon onClick={() => store.dispatch(goBack())}>
                  chevron_left
              </Icon>
                {/* <Icon> search</Icon> */}
              </div>
              <div className="playlist-content">
                <div className="playlist-content-img">
                  <img src={selectedPlaylist.images[0].url || ''} />
                </div>
                <div className="playlist-content-title-block">
                  <ListItemText
                    className="playlist-content-title"
                    primary={selectedPlaylist.name}
                    secondary={'DJ P-Jay'}
                  />
                  <div className="playlist-content-title-length">
                    <span className="playlist-content-title-songs">
                      {selectedPlaylist.tracks.total} Songs
                  </span>
                    {/* <span className="playlist-content-title-hr">2hr </span> */}
                    <Button
                      variant="fab"
                      color="primary"
                      className="finder-playlist-header-container-button"
                      onClick={() => this.setState({ showPlayerPlaylist: !showPlayerPlaylist, showPlayer: false })}
                    >
                      {/* <Icon>{showPlayer ? 'pause' : 'play_arrow'}</Icon> */}
                      <Icon>{'play_arrow'}</Icon>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          }
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
              <Tab label="MAYBE" className="account-tab" disabled={true} />
              <Tab label="MY REQUESTS" className="account-tab" disabled={true} />
            </Tabs>
          </AppBar>
          <div className="container-scroll">
            <SwipeableViews
              axis={'x'}
              index={value}
              onChangeIndex={this.handleChangeIndex}
            >
              {value === 0 ? (
                <Typography component="div" dir={'0'} style={{ padding: 10 }}>
                  {this.renderApprovedTracks(selectedPlaylist)}
                  <div className="stoper-block" />
                  <div className="stoper-block" />
                </Typography>
              ) : <div />}
              {value === 1 ? (
                <Typography component="div" dir={'1'}  >
                  test2
            </Typography>
              ) : <div />}
              {value === 2 ? (
                <Typography component="div" dir={'2'}>
                  test3
            </Typography>
              ) : <div />}
            </SwipeableViews>
          </div>
        </div>
      )
    }

    return ([PlaylistTabs, showPlayer ? <PlayerContainer /> : ''])
  }

  private handleTrackVote = (track: ITrack) => {
    const trackId = track.uri
    const { user, votes,
      event,
    } = this.props
    const eventId = !!event ? event.eventId : ''

    // events.forEach((event: IEvent) => {
    //   if (event.playlist.id === selectedPlaylist.id) {
    //     eventId = event.eventId
    //   }
    // })
    if (votes && votes.has(trackId)) {
      const voteStatus = votes.get(trackId)
      if (voteStatus && voteStatus.votedByCurrentUser) {
        this.props.deleteVote(`${trackId}:${eventId}:${user.userId}`)
        setTimeout(()=> this.props.event && this.props.fetchEventVotes(this.props.event.eventId),500)
        return
      }
    }
    const vote = {
      eventId,
      trackId,
      userId: user.userId
    } as IVote
    this.props.createVote(vote)
    setTimeout(()=> this.props.event && this.props.fetchEventVotes(this.props.event.eventId),500)
  }

  private handleTrackSelected = (track: ITrack) => {
    const { showPlayerPlaylist, showPlayer } = this.state
    if (this.props.selectedTrack) {
      if (this.props.selectedTrack.id === track.id && showPlayer) {
        this.setState({ showPlayer: false })
        this.props.deselectTrack()

      } else {
        if (!showPlayerPlaylist) { this.setState({ showPlayer: true }) }
      }
    } else {
      if (!showPlayerPlaylist) { this.setState({ showPlayer: true }) }
    }

    this.props.selectTrack(track)
  }

}
