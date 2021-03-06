import IAction from '../../models/IAction'
import ITrack from '../../models/track/ITrack'

export const EVENT_FETCH_INITIATED = 'EVENT_FETCH_INITIATED'
export const EVENT_FETCHED = 'EVENT_FETCHED'
export const EVENT_СLEAR = 'EVENT_СLEAR'
export const EVENT_FETCH_ERROR = 'EVENT_FETCH_ERROR'
export const EVENT_FETCH_BY_INVITE_ID_INITIATED =
  'EVENT_FETCH_BY_INVITE_ID_INITIATED'
export const EVENT_SUGGESTION_SELECTED = 'EVENT_SUGGESTION_SELECTED'
export const EVENT_SUGGESTION_DESELECTED = 'EVENT_SUGGESTION_DESELECTED'

export const FETCH_USERS_EVENTS = 'FETCH_USERS_EVENTS'
export const FETCH_USERS_EVENTS_SUCCESS = 'FETCH_USERS_EVENTS_SUCCESS'
export const FETCH_USERS_EVENTS_ERROR = 'FETCH_USERS_EVENTS_ERROR'

export const getEvent = (eventId: string): IAction => ({
  payload: eventId,
  type: EVENT_FETCH_INITIATED
})

export const getEventByInviteId = (inviteId: string): IAction => ({
  payload: inviteId,
  type: EVENT_FETCH_BY_INVITE_ID_INITIATED
})

export const selectSuggestion = (track: ITrack): IAction => ({
  payload: track,
  type: EVENT_SUGGESTION_SELECTED
})

export const deselectSuggestion = (): IAction => ({
  type: EVENT_SUGGESTION_DESELECTED
})

export const fetchUsersEvents = (): IAction => ({
  type: FETCH_USERS_EVENTS
})
