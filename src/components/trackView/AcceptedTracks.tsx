import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import * as React from 'react'
import IEvent from '../../models/event/IEvent';
import IDecoratedSuggestion from '../../models/suggestion/IDecoratedSuggestion'
import '../../styles/trackView/AcceptedTracks.css'
import TrackList from '../track/TrackList'

interface IAcceptedTracksProps {
  suggestions: IDecoratedSuggestion[]
  events: IEvent[]
}

export default class AcceptedTracks extends React.PureComponent<
  IAcceptedTracksProps
  > {
  public render() {
    const { suggestions } = this.props
    const acceptedSuggestions = !!suggestions
      ? suggestions.filter(s => s.suggestion && s.suggestion.accepted)
      : []

    return (
      <List>
        {acceptedSuggestions.length > 0 && (
          <TrackList tracks={acceptedSuggestions.map(s => s.track)} suggestions={acceptedSuggestions} events={this.props.events} />
        )}
        {acceptedSuggestions.length < 1 && (
          <ListItem>
            <ListItemText primary="No accepted suggestions yet" />
          </ListItem>
        )}
      </List>
    )
  }
}
