import IAction from '../../models/IAction'
export const STORING_INVITE_ID = 'STORING_INVITE_ID'
export const INVITE_ID_STORED = 'INVITE_ID_STORED'
export const INVITE_ID_STORE_ERROR = 'INVITE_ID_STORE_ERROR'
export const LOADING_INVITE_ID = 'LOADING_INVITE_ID'
export const INVITE_ID_LOADED = 'INVITE_ID_LOADED'
export const FETCHING_INVITE_EVENT = 'FETCHING_INVITE_EVENT'
export const INVITE_EVENT_FETCHED = 'INVITE_EVENT_FETCHED'
export const INVITE_EVENT_FETCH_ERROR = 'INVITE_EVENT_FETCH_ERROR'
export const FETCHING_INVITE = 'FETCHING_INVITE'
export const FETCHING_INVITE_SUCCESS = 'FETCHING_INVITE_SUCCESS'
export const FETCHING_INVITE_ERROR = 'FETCHING_INVITE_ERROR'

export const storeInviteId = (inviteId: string): IAction => ({
  type: STORING_INVITE_ID,
  payload: inviteId
})

export const loadInviteId = (): IAction => ({
  type: LOADING_INVITE_ID
})

export const fetchInviteEvent = (): IAction => ({
  type: FETCHING_INVITE_EVENT
})

export const fetchInvite = (inviteId: string): IAction => ({
  type: FETCHING_INVITE,
  payload: inviteId
})
