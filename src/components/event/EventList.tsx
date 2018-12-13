import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@material-ui/core'
import * as React from 'react'
import IEvent from '../../models/event/IEvent'

interface IEventProps {
  events: IEvent[]
  selectEvent: any
}

export default class Event extends React.PureComponent<IEventProps> {
  public render() {
    const { events } = this.props

    if (!events || events.length < 1) {
      return (
        <Typography align="center" variant="display2">
          No events to show yet
        </Typography>
      )
    }

    return (
      <List>
        {events.map(event => (
          <div className="event-list-item" key={event.eventId}>
            <ListItem
              button={true}
              onClick={() => this.props.selectEvent(event)}
            >
              <ListItemAvatar>
                <Avatar
                  alt={event.name}
                  src={event.imageUrl || '/img/partycover-sm.png'}
                />
              </ListItemAvatar>
              <ListItemText
                primary={event.name}
                secondary={`${event.startDateTime.format(' Do MMMM, YYYY')}`}
              />
            </ListItem>
            <li>
              <Divider inset={true} className="event-list-item-divider" />
            </li>
          </div>
        ))}
        <div className="stoper-block" />
      </List>
    )
  }
}
