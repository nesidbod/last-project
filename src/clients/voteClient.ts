import axios from 'axios'
import IVote from '../models/vote/IVote'

const serviceUrl = process.env.REACT_APP_MM_API_URL

export const createVote = (vote: IVote) => {
  return axios
    .post(serviceUrl + '/votes', vote, {
      withCredentials: true
    })
    .then(response => response.data)
}

export const deleteVote = (voteId: string) => {
  return axios
    .delete(serviceUrl + '/votes/' + voteId, {
      withCredentials: true
    })
    .then(response => response.data)
}

export const fetchEventVotes = (eventId: string) => {
  return axios
    .get(serviceUrl + '/events/' + eventId + '/votes', {
      withCredentials: true
    })
    .then(response => {
      return response.data
    })
}
