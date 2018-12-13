import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchRsvpByInviteAndUser, rsvpInvite } from '../../clients/rsvpClient'
import IAction from '../../models/IAction'
import {
  FETCH_OR_CREATE_RSVP_FAILURE,
  FETCH_OR_CREATE_RSVP_INITIATED,
  FETCH_OR_CREATE_RSVP_SUCCESS
} from '../actions/rsvpActions'

interface IRsvpArgs {
  inviteId: string
  userId: string
  eventId: string
}

function fetchRsvp({ inviteId, userId }: IRsvpArgs) {
  return fetchRsvpByInviteAndUser(inviteId, userId).catch(err => {
    // swallow the fetch error and return null
    console.error(err)
    return null
  })
}

function createRsvp({ inviteId, userId, eventId }: IRsvpArgs) {
  return rsvpInvite(inviteId, userId, eventId)
}

function* fetchOrCreateRsvpFlow({ payload }: IAction) {
  try {
    let rsvp = yield call(fetchRsvp, payload)
    if (!rsvp) {
      rsvp = createRsvp(payload)
    }
    yield put({ type: FETCH_OR_CREATE_RSVP_SUCCESS, payload: rsvp })
  } catch (err) {
    console.error(err)
    yield put({ type: FETCH_OR_CREATE_RSVP_FAILURE, payload: err })
  }
}

export function* watchFetchOrCreateRsvp() {
  yield takeEvery(FETCH_OR_CREATE_RSVP_INITIATED, fetchOrCreateRsvpFlow)
}
