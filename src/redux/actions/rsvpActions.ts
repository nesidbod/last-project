import IAction from '../../models/IAction'
export const FETCH_OR_CREATE_RSVP_INITIATED = 'FETCH_OR_CREATE_RSVP_INITIATED'
export const FETCH_OR_CREATE_RSVP_SUCCESS = 'FETCH_OR_CREATE_RSVP_SUCCESS'
export const FETCH_OR_CREATE_RSVP_FAILURE = 'FETCH_OR_CREATE_RSVP_FAILURE'

export const fetchOrCreateRsvp = (
  inviteId: string,
  userId: string,
  eventId: string
): IAction => ({
  type: FETCH_OR_CREATE_RSVP_INITIATED,
  payload: { inviteId, userId, eventId }
})
