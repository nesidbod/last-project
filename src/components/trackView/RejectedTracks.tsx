import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import * as React from 'react'
import IEvent from '../../models/event/IEvent';
import IDecoratedSuggestion from '../../models/suggestion/IDecoratedSuggestion'
import '../../styles/trackView/RejectedTracks.css'
import TrackList from '../track/TrackList'

interface IRejectedTracksProps {
  suggestions: IDecoratedSuggestion[]
  events: IEvent[]

}

export default class RejectedTracks extends React.PureComponent<
  IRejectedTracksProps
  > {
  public render() {
    const { suggestions } = this.props

    const rejectedSuggestions = !!suggestions
      ? suggestions.filter(s => s.suggestion && s.suggestion.rejected)
      : []

    return (
      <List>
        {rejectedSuggestions.length > 0 && (
          <TrackList tracks={rejectedSuggestions.map(s => s.track)} suggestions={rejectedSuggestions} events={this.props.events} />
        )}
        {rejectedSuggestions.length < 1 && (
          <ListItem>
            <ListItemText primary="No rejected suggestions yet" />
          </ListItem>
        )}
      </List>
    )
  }
}
