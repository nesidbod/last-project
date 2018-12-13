import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import * as React from 'react'
import IEvent from '../../models/event/IEvent';
import IDecoratedSuggestion from '../../models/suggestion/IDecoratedSuggestion'
import '../../styles/trackView/MaybeTracks.css'
import TrackList from '../track/TrackList'

interface IMaybeTracksProps {
  suggestions: IDecoratedSuggestion[]
  events: IEvent[]

}

export default class MaybeTracks extends React.PureComponent<
  IMaybeTracksProps
  > {
  public render() {
    const { suggestions } = this.props
    const maybeSuggestions = !!suggestions
      ? suggestions.filter(
        s => s.suggestion && !s.suggestion.rejected && !s.suggestion.accepted
      )
      : []

    return (
      <List>
        {maybeSuggestions.length > 0 && (
          <TrackList tracks={maybeSuggestions.map(s => s.track)} suggestions={maybeSuggestions} events={this.props.events}/>
        )}
        {maybeSuggestions.length < 1 && (
          <ListItem>
            <ListItemText primary="No suggestions yet" />
          </ListItem>
        )}
      </List>
    )
  }
}
