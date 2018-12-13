import { AppBar, Tab, Tabs, Typography } from '@material-ui/core'
import * as moment from 'moment'
import * as React from 'react'
import { push } from 'react-router-redux'
import SwipeableViews from 'react-swipeable-views'
import IEvent from '../../models/event/IEvent'
import IAction from '../../models/IAction'
import IUser from '../../models/user/IUser'
import { store } from '../../redux/store';
import EventList from './EventList'

interface IEventListViewProps {
  user: IUser
  events: IEvent[]
  event: IEvent
  fetchUsersEvents(): IAction
  testfunc(): any
  selectPage(value: string): IAction
  showSpinner(value: boolean): IAction
  getEvent(eventId: string): IAction
  fetchInviteEvent(): IAction
}

interface IEventListViewState {
  value: number
  anchorEl: any
  selcetedEvent: any
  showEvent: boolean
}

export default class EventListView extends React.Component<IEventListViewProps,
  IEventListViewState> {
  constructor(props: IEventListViewProps) {
    super(props)
    this.state = {
      value: 0,
      anchorEl: null,
      showEvent: false,
      selcetedEvent: this.props.event
    }
  }

  public componentDidMount() {
    this.props.fetchUsersEvents()
    if (!!!this.props.event) {
      this.props.fetchInviteEvent()
    }
    this.props.showSpinner(true)
  }

  public render() {
    const { value } = this.state

    const events = this.props.events.length
      ? this.props.events
      : [this.props.event]

    const now = moment()

    let eventTabs = <div />

    if (typeof (events[0]) !== 'undefined') {
      this.props.showSpinner(false)
      const pastEvents = events.filter(event => now.isAfter(event.endDateTime))
      const liveEvents = events.filter(
        event =>
          now.isAfter(event.startDateTime) && now.isBefore(event.endDateTime)
      )
      const upcomingEvents = events.filter(event =>
        now.isBefore(event.startDateTime)
      )

      eventTabs = (
        <div>
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
              <Tab label="PAST" className="account-tab" />
              <Tab label="LIVE" className="account-tab" />
              <Tab label="UPCOMING" className="account-tab" />
            </Tabs>
          </AppBar>
          <div className="container-scroll">
            <SwipeableViews
              axis={'x'}
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
              {value === 0 ? (
                <Typography component="div" dir={'0'}>
                  <EventList events={pastEvents} selectEvent={this.selectEvent} />
                </Typography>
              ) : <div />}
              {value === 1 ? (
                <Typography component="div" dir={'1'}>
                  <EventList events={liveEvents} selectEvent={this.selectEvent} />
                </Typography>
              ) : <div />}
              {value === 2 ? (
                <Typography component="div" dir={'2'}>
                  <EventList events={upcomingEvents} selectEvent={this.selectEvent} />
                </Typography>
              ) : <div />}
            </SwipeableViews>
          </div>
        </div>
      )
    }
    return eventTabs
  }

  private handleChange = (event: any, value: any) => {
    this.setState({ value })
  }

  private handleChangeIndex = (index: any) => {
    this.setState({ value: index })
  }

  private selectEvent = (event: any) => {
    this.props.getEvent(event.eventId)
    store.dispatch(push(`/events/${event.eventId}`))
  }

}
