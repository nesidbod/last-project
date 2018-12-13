import { call, put, takeEvery } from 'redux-saga/effects'
import { getInviteById } from '../../clients/inviteClient'
import IAction from '../../models/IAction'
import IInvite from '../../models/invite/IInvite'
import { inviteIdKey } from '../../other/invite/inviteConstants'
import localStorage from '../../other/storage/localStorage'
import { EVENT_FETCH_BY_INVITE_ID_INITIATED } from '../actions/eventActions'
import {
  FETCHING_INVITE,
  FETCHING_INVITE_ERROR,
  FETCHING_INVITE_EVENT,
  FETCHING_INVITE_SUCCESS,
  INVITE_ID_LOADED,
  INVITE_ID_STORE_ERROR,
  INVITE_ID_STORED,
  LOADING_INVITE_ID,
  STORING_INVITE_ID
} from '../actions/inviteActions'

function storeInviteId(inviteId: string): void {
  if (inviteId) {
    localStorage.set(inviteIdKey, inviteId)
  }
}

function* storeInviteIdFlow(action: IAction) {
  try {
    yield call(storeInviteId, action.payload)
    yield put({ type: INVITE_ID_STORED, payload: action.payload })
  } catch (error) {
    yield put({ type: INVITE_ID_STORE_ERROR, payload: error })
  }
}

export function* watchStoreInviteId() {
  yield takeEvery(STORING_INVITE_ID, storeInviteIdFlow)
}

function loadInviteId(): string {
  return localStorage.get(inviteIdKey)
}

function* loadInviteIdFlow() {
  try {
    const inviteId: string = yield call(loadInviteId)
    yield put({ type: INVITE_ID_LOADED, payload: inviteId })
  } catch (error) {
    console.error(error)
  }
}

export function* watchLoadInviteId() {
  yield takeEvery(LOADING_INVITE_ID, loadInviteIdFlow)
}

function* dispatchFetchEventAction(action: IAction) {
  const inviteId: string = localStorage.get(inviteIdKey)
  yield put({ type: INVITE_ID_LOADED, payload: inviteId })
  yield put({ type: EVENT_FETCH_BY_INVITE_ID_INITIATED, payload: inviteId })
}

export function* watchFetchInviteEvent() {
  yield takeEvery(FETCHING_INVITE_EVENT, dispatchFetchEventAction)
}

function* fetchInviteFlow(action: IAction) {
  try {
    const inviteId = action.payload
    const invite: IInvite = yield call(getInviteById, inviteId)
    yield put({ type: FETCHING_INVITE_SUCCESS, payload: invite })
  } catch (err) {
    yield put({ type: FETCHING_INVITE_ERROR, payload: err })
  }
}

export function* watchFetchInvite() {
  yield takeEvery(FETCHING_INVITE, fetchInviteFlow)
}
