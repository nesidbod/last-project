import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import * as React from 'react'
import IAction from '../../models/IAction'
import IPlaylist from '../../models/playlist/IPlaylist'
interface IPlaylistsSimpleListProps {
  playlists: IPlaylist[]
  selectPlaylist?: any
  attached: boolean
  onPlaylistSelected(playlist: IPlaylist): IAction
  addedPlaylist?(value: IPlaylist): any
}

class PlaylistsSimpleList extends React.Component<
  IPlaylistsSimpleListProps,
  {}
  > {
  public state = {
    anchorEl: null
  }

  public render() {
    const { onPlaylistSelected, playlists } = this.props

    const addedPlaylist =
      this.props.addedPlaylist ||
      ((value: any) => {
        ''
      })
    const handlePlaylistSelected = (playlist: IPlaylist) => () => {
      onPlaylistSelected(playlist)
      this.props.selectPlaylist(playlist, true)
    }

    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    let playlistView = <p>You do not have any playlists yet</p>

    if (playlists) {
      if (playlists.length > 0) {
        playlistView = (
          <List>
            {playlists.map((playlist: IPlaylist, i: number) => (
              <div className="event-list-item" key={i}>
                <ListItem disabled={playlist.tracks.total < 1} button={true}>
                  <div
                    className="event-list-item-title"
                    onClick={handlePlaylistSelected(playlist)}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={playlist.name}
                        src={
                          playlist.images.length > 0
                            ? playlist.images[0].url
                            : '/img/partycover-sm.png'
                        }
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={playlist.name}
                      secondary={`${playlist.tracks.total} tracks`}
                    />
                  </div>
                  {!!this.props.addedPlaylist ? (
                    <div>
                      <IconButton
                        aria-label="More"
                        aria-owns={open ? 'long-menu' : ''}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                        className="playList-button-menu"
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={this.handleClose}
                      >
                        <MenuItem
                          onClick={() => {
                            addedPlaylist(playlist)
                            this.handleClose()
                          }}
                        >
                          {'Add All Requests to a Event Playlist'}
                        </MenuItem>
                      </Menu>
                    </div>
                  ) : (
                      ''
                    )}
                </ListItem>
                <li>
                  <Divider inset={true} />
                </li>
              </div>
            ))}
            <div className="stoper-block" />
          </List>
        )
      }
    }

    return playlistView
  }

  private handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  private handleClose = () => {
    this.setState({ anchorEl: null })
  }
}

export default PlaylistsSimpleList
