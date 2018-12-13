import axios from 'axios'

const serviceUrl = process.env.REACT_APP_MM_API_URL

export const getUserTopTracks = () => {
  return axios
    .get(serviceUrl + '/recommendations', {
      withCredentials: true
    })
    .then(response => response.data)
}
