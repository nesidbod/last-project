import {
  Avatar,
  Divider,
  Icon,
  // IconButton,
  ListItem,
  ListItemText,
  // Menu,
  // MenuItem
} from '@material-ui/core'
// import MoreVertIcon from '@material-ui/icons/MoreVert'
import * as React from 'react'
import ITrack from '../../models/track/ITrack'
import '../../styles/track/TrackListItem.css'

// TODO:  use this: https://codepen.io/dmarcus/pen/vKdWxW
// Also this for styles: https://codepen.io/ArnaudBalland/pen/vGZKLr

interface ITrackListItemProps {
  track: any
  withVoting: boolean
  currentUserVoted: boolean
  numberOfVotes: number
  onVote: ((track: ITrack) => void)
  onTrackSelected: ((track: ITrack) => void)
  withSuggesing: boolean
  eventName?: string
}

const TrackListItem = ({
  track,
  withVoting,
  currentUserVoted,
  numberOfVotes,
  onVote,
  onTrackSelected,
  withSuggesing,
  eventName
}: ITrackListItemProps) => {
  if (!track) {
    return <span />
  }
  const handleTrackSelected = () => {
    onTrackSelected(track)
  }

  const handleTrackVote = () => {
    onVote(track)
  }

  let trackImage = <span />
  if (track.album && track.album.images && track.album.images.length > 0) {
    trackImage = (
      <Avatar>
        <img
          src={track.album.images[track.album.images.length - 1].url}
          alt={track.name}
        />
      </Avatar>
    )
  }
  let votingButton = <span />
  if (withVoting) {
    votingButton = (
      <div className="playList-favorite">
        {/* <Avatar className="cover-avatar">
          <img className="img-cover-avatar" src={'https://images-eu.ssl-images-amazon.com/images/I/513renRKckL._SS500.jpg'} />
        </Avatar> */}
        <div
          className="playList-button-favorite"
          onClick={handleTrackVote}
          style={{ color: currentUserVoted ? 'secondary' : 'primary' }}
        >
          <span className="playList-favorite-count"> {numberOfVotes} </span>
          <Icon
            className={`playList-favorite-icon ${
              currentUserVoted ? 'secondary' : 'primary'
              }`}
          >
            favorite
          </Icon>
        </div>
      </div>
    )
  }

  return (
    <div className="event-list-item">
      <ListItem dense={true} button={true} disabled={!!!track.preview_url && !!withVoting}>
        {trackImage}
        <div style={{ paddingLeft: '17px', width: '100%'}} onClick={handleTrackSelected}>
          <ListItemText primary={track.artists[0].name} secondary={track.name} />
          <span style={{ color: '#2dabd0' }}> {eventName} </span>
        </div>
        {votingButton}
        {withSuggesing ? <Icon onClick={handleTrackSelected} className="playList-button-add"> playlist_add </Icon> : ''}
        {/* <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : ''}
          aria-haspopup="true"
          className="playList-button-menu"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu id="long-menu" open={false}>
          <MenuItem>{'test'}</MenuItem>
        </Menu> */}
      </ListItem>
      <Divider inset={true} />
    </div>
  )
}

export default TrackListItem
