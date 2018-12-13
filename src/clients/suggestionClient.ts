import axios from 'axios'
import ISuggestion from '../models/suggestion/ISuggestion'
const serviceUrl = process.env.REACT_APP_MM_API_URL

export const getSuggestions = (eventId: string) => {
  return axios
    .get(serviceUrl + '/users/suggestions?eventId=' + eventId, {
      withCredentials: true
    })
    .then(response => response.data)
}

export const getUsersSuggestions = () => {
  return axios
    .get(serviceUrl + '/users/suggestions', {
      withCredentials: true
    })
    .then(response => {
      try {
        if( response.data.length > 200) {
          return response.data.slice(0,200)
         }else {
           return response.data
         }
      } catch(err) {
        console.log('err',err)
      }    
    })
}

export const saveSuggestion = (suggestion: ISuggestion) => {
  return axios.post(serviceUrl + '/suggestions', suggestion, {
    withCredentials: true
  })
}

export const bulkSaveSuggestions = (suggestions: ISuggestion[]) => {
  return axios.post(serviceUrl + '/suggestions', suggestions, {
    withCredentials: true
  })
}

export const deleteSuggestion = (suggestion: ISuggestion) => {
  return axios.delete(serviceUrl + '/suggestions/' + suggestion.suggestionId, {
    withCredentials: true
  })
}
