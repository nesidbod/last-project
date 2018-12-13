import axios from 'axios'
import * as moment from 'moment'
import IEvent from '../models/event/IEvent'

const serviceUrl = process.env.REACT_APP_MM_API_URL

export const getEventById = (eventId: string) => {
  return axios
    .get(serviceUrl + '/events/' + eventId, {
      withCredentials: true
    })
    .then(response => response.data)
    .then(event => ({
      ...event,
      endDateTime: moment(event.endDateTime),
      startDateTime: moment(event.startDateTime)
    }))
}

export const getEventByInviteId = (inviteId: string) => {
  return axios
    .get(serviceUrl + '/invites/' + inviteId + '/event', {
      withCredentials: true
    })
    .then(response => response.data)
    .then(event => ({
      ...event,
      endDateTime: moment(event.endDateTime),
      startDateTime: moment(event.startDateTime)
    }))
}

export const getUsersInvitedEvents = () => {
  return axios
    .get(serviceUrl + '/users/invited/events', {
      withCredentials: true
    })
    .then(response =>
      response.data.map((event: IEvent) => ({
        ...event,
        endDateTime: moment(event.endDateTime),
        startDateTime: moment(event.startDateTime)
      }))
    )
}
