import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { push } from 'react-router-redux'
import IEvent from '../../models/event/IEvent'
import IAction from '../../models/IAction'
import IPlaylist from '../../models/playlist/IPlaylist'
import IUser from '../../models/user/IUser'
import { store } from '../../redux/store'
import '../../styles/playlist/Playlist.css'
import PlaylistsSimpleList from './PlaylistsSimpleList'

interface IPlayListProps extends RouteComponentProps<any> {
  user: IUser
  event: any
  events: IEvent[]
  userPlaylists: IPlaylist[]
  fetchUserPlaylists(user: IUser): IAction
  onPlaylistSelected(playlist: IPlaylist): IAction
  showSpinner(value: boolean): IAction
  fetchInviteEvent(): IAction
  getEvent(eventId: string): IAction
}

export default class PlayList extends React.Component<IPlayListProps, any> {
  constructor(props: IPlayListProps) {
    super(props)
    this.state = {
      value: 0,
      showPlaylist: false
    }
  }

  public componentDidMount() {
    this.props.fetchInviteEvent()
    this.props.showSpinner(true)
  }

  public componentWillMount() {
    this.props.fetchUserPlaylists(this.props.user)

  }

  public componentWillUpdate() {
    if (this.props.user && !!!this.props.userPlaylists) {
      this.props.fetchUserPlaylists(this.props.user)
    } else {
      this.props.showSpinner(false)
    }
  }

  public render() {
    const { onPlaylistSelected } = this.props
    const { userPlaylists = [] } = this.props

    return (
      <PlaylistsSimpleList
        playlists={userPlaylists}
        onPlaylistSelected={onPlaylistSelected}
        attached={false}
        selectPlaylist={this.selectPlaylist}
      />
    )
  }

  private selectPlaylist = (playlist: any) => {
    // const { events } = this.props
    // console.log('events',events)
    // events.forEach((event: IEvent) => {
    //   if (event.playlist.id === playlist.id) {
    //     this.props.getEvent(event.eventId)
    //   }
    // })

    store.dispatch(push(`/playlist/${playlist.id}`))
  }
}
