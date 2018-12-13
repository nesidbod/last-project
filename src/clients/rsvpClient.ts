import axios from 'axios'
const serviceUrl = process.env.REACT_APP_MM_API_URL

export const fetchRsvpByInviteAndUser = (inviteId: string, userId: string) => {
  return axios.get(serviceUrl + '/users/' + userId + '/rsvp?inviteId=' + inviteId, {
    withCredentials: true
  })
}
export const rsvpInvite = (
  inviteId: string,
  userId: string,
  eventId: string
) => {
  return axios
    .post(
      serviceUrl + '/rsvp',
      { inviteId, userId, eventId },
      {
        withCredentials: true
      }
    )
    .then(response => response.data)
}
