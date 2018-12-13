import IEvent from '../../models/event/IEvent'
import IAction from '../../models/IAction'
import IInvite from '../../models/invite/IInvite'
import initialState from '../../models/invite/inviteInitialState'
import {
  FETCHING_INVITE_ERROR,
  FETCHING_INVITE_SUCCESS,
  INVITE_ID_LOADED
} from '../actions/inviteActions'
import invite from './inviteReducer'

it('should return the initial state when no action matches', () => {
  expect(invite(undefined, {} as IAction)).toEqual(initialState)
})

it('should handle INVITE_ID_LOADED', () => {
  const inviteId = 'invite-id'
  expect(
    invite(initialState, { type: INVITE_ID_LOADED, payload: inviteId })
  ).toEqual({
    ...initialState,
    inviteId
  })
})

it('should handle FETCHING_INVITE_ERROR ', () => {
  const error = new Error('bad thing happened')
  expect(
    invite(initialState, { type: FETCHING_INVITE_ERROR, payload: error })
  ).toEqual({ ...initialState, error })
})

it('should handle FETCHING_INVITE_SUCCESS', () => {
  const fetchedInvite = {
    inviteId: 'invite-id',
    event: {} as IEvent
  } as IInvite
  expect(
    invite(initialState, {
      type: FETCHING_INVITE_SUCCESS,
      payload: fetchedInvite
    })
  ).toEqual({
    ...initialState,
    inviteId: fetchedInvite.inviteId,
    event: fetchedInvite.event
  })
})
