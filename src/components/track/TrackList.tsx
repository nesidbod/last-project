import * as React from 'react'
import ITrack from '../../models/track/ITrack'
import ITrackVoteStatus from '../../models/vote/ITrackVoteStatus'
import TrackListItem from './TrackListItem'

// TODO:  use this: https://codepen.io/dmarcus/pen/vKdWxW
// Also this for styles: https://codepen.io/ArnaudBalland/pen/vGZKLr

interface ITrackListProps {
  tracks: ITrack[]
  withVoting?: boolean
  votes?: Map<string, ITrackVoteStatus>
  onVote?: ((track: ITrack) => void)
  onTrackSelected?: ((track: ITrack) => void)
  withSuggesing?: boolean
  suggestions?: any
  events?: any
}

const TrackList = ({
  tracks = [],
  suggestions = [],
  events = [],
  withVoting = false,
  withSuggesing = false,
  votes = new Map(),
  onVote = (t: ITrack) => ({} as any),
  onTrackSelected = (t: ITrack) => ({} as any)
}: ITrackListProps) => (
    <React.Fragment>
      {tracks.map((track, i) => {
        const trackId = track.uri
        let numberOfVotes = 0
        let userVoted = false
        let name = ''
        if (votes && votes.has(trackId)) {
          const voteStatus: ITrackVoteStatus =
            votes.get(trackId) || ({} as ITrackVoteStatus)
          numberOfVotes = voteStatus.numberOfVotes
          userVoted = voteStatus.votedByCurrentUser
        }
        if (!!suggestions.length && !!events.length) {
          suggestions.forEach((item: any) => {
            events.forEach((event: any) => {
              if (event.eventId === item.suggestion.eventId) {
                name = event.name
              }
              return false
            })
          })
        }

        return (
          <TrackListItem
            key={i}
            track={track}
            withVoting={withVoting}
            currentUserVoted={userVoted}
            numberOfVotes={numberOfVotes}
            onTrackSelected={onTrackSelected}
            onVote={onVote}
            withSuggesing={withSuggesing}
            eventName={name}
          />
        )
      })}
    </React.Fragment>
  )

export default TrackList
