import axios from 'axios'
import * as moment from 'moment'
import IInvite from '../models/invite/IInvite'
const serviceUrl = process.env.REACT_APP_MM_API_URL

export const getInviteById = (inviteId: string): Promise<IInvite> => {
  return axios
    .get(serviceUrl + '/invites/' + inviteId, {
      withCredentials: true
    })
    .then(response => response.data)
    .then(invite => {
      const { event } = invite
      return {
        ...invite,
        ...event,
        endDateTime: moment(event.endDateTime),
        startDateTime: moment(event.startDateTime)
      }
    })
}
