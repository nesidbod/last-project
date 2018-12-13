import * as React from 'react'
import { Redirect, Route,RouteComponentProps } from 'react-router'
import IEvent from '../../models/event/IEvent'
import IAction from '../../models/IAction'
import IUser from '../../models/user/IUser'
import {
  subscribeToSuggestionsAccepted,
  subscribeToVotesModified
} from '../../other/notification/index'
import lStorage from '../../other/storage/localStorage'
import '../../styles/home/Home.css'


interface IHomeProps extends RouteComponentProps<any> {
  user: IUser
  userLoading: boolean
  userError: Error
  event: IEvent
  eventLoading: boolean
  eventError: Error
  routes: Route[]
  inviteId: string
  fetchInviteEvent(): IAction
  fetchOrCreateRsvp(inviteId: string, userId: string, eventId: string): IAction
  getSuggestions(eventId: string): IAction
  fetchEventVotes(eventId: string): IAction
}

interface IHomeState {
  tabValue: number
  activeContent: string
}

class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props)

    this.state = {
      activeContent: 'events',
      tabValue: 0
    }
  }

  public componentDidMount() {
    this.props.fetchInviteEvent()
    if (this.props.event && this.props.user) {
      // const eventId = this.props.event.eventId
      // const query: ISuggestionQuery = {
      //   eventId,
      //   userId: this.props.user.userId
      // }
      // this.props.getSuggestions(query)
    }
  }
  
   public componentDidUpdate(prevProps: IHomeProps) {
    // Only fetch suggestions once the event has been fetched
    if (this.props.event && !prevProps.event && this.props.user) {
      const eventId = this.props.event.eventId
      // const query: ISuggestionQuery = {
      //   eventId,
      //   userId: this.props.user.userId
      // }
      // this.props.getSuggestions(query)
      this.props.fetchEventVotes(eventId)
      subscribeToSuggestionsAccepted(eventId, this.handleSuggestionsAccepted)
      subscribeToVotesModified(eventId, this.handleVoteCreated)
    }
    if (!this.hasArgsToDoRsvp(prevProps) && this.hasArgsToDoRsvp(this.props)) {
      const { inviteId, user, event } = this.props
      this.props.fetchOrCreateRsvp(inviteId, user.userId, event.eventId)
    }
  }

  public render() {
   
    return (
      <Redirect to={`/events/${lStorage.get('invite_id') || '/events'}`} />
    )
  }

  private hasArgsToDoRsvp({ user, inviteId, event }: IHomeProps) {
    return !!user && !!inviteId && !!event
  }

  private handleSuggestionsAccepted = () => {
    this.props.getSuggestions(this.props.event.eventId)
  }

   private handleVoteCreated = () => {
    this.props.fetchEventVotes(this.props.event.eventId)
    if (this.props.event.settings.dynamicVotingEnabled) {
      this.props.fetchInviteEvent()
    }
  }

}

export default Home
