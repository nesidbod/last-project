import axios from 'axios'
const serviceUrl = process.env.REACT_APP_MM_API_URL

export const search = (searchTerm: string) => {
  return axios
    .get(serviceUrl + '/search?q=' + encodeURIComponent(searchTerm) + '&type=track', {
      withCredentials: true
    })
    .then(response => response.data)
}
