import axios from 'axios'
import IUser from '../models/user/IUser'

const serviceUrl = process.env.REACT_APP_MM_API_URL

export const fetchUsersPlaylists = (user: IUser) => {
  return axios.get(serviceUrl + '/users/' + user.userId + '/playlists', {
    withCredentials: true
  }).then(response => response.data)
}
