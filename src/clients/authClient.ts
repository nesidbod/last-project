import axios from 'axios'
const serviceUrl = process.env.REACT_APP_MM_API_URL

export const loginWithCookie = () => {
  return axios
    .get(serviceUrl + '/auth/verify', {
      withCredentials: true
    })
    .then(response => response.data)
}

export const loginWithCredentials = (credentials: any) => {
  return axios
    .post(serviceUrl + '/auth/login', credentials, { withCredentials: true })
    .then(response => response.data)
}

export const loginAsGuest = () => {
  return axios
    .post(serviceUrl + '/auth/login-guest', {}, { withCredentials: true })
    .then(response => response.data)
}

export const logout = () => {
  return axios
    .get(serviceUrl + '/auth/logout', {
      withCredentials: true
    })
    .then(res => {
      console.log('Logout res', res)
    })
}

export const signUp = (credentials: any) => {
  return axios
    .post(serviceUrl + '/auth/signup', credentials, { withCredentials: true })
    .then(response => response.data)
}
