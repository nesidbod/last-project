import { call, put, takeEvery } from 'redux-saga/effects'
import { createVote, deleteVote, fetchEventVotes } from '../../clients/voteClient'
import IAction from '../../models/IAction'
import {
  FETCH_EVENT_VOTES_FAILURE,
  FETCH_EVENT_VOTES_INITIATED,
  FETCH_EVENT_VOTES_SUCCESS,
  VOTE_CREATE_FAILURE,
  VOTE_CREATE_INITIATED,
  VOTE_CREATE_SUCCESS,
  VOTE_DELETE_FAILURE,
  VOTE_DELETE_INITIATED,
  VOTE_DELETE_SUCCESS
} from '../actions/voteActions'

function* createVoteFlow({ payload }: IAction) {
  try {
    const savedVote = yield call(createVote, payload)
    yield put({ type: VOTE_CREATE_SUCCESS, payload: savedVote })
  } catch (err) {
    yield put({ type: VOTE_CREATE_FAILURE, payload: err })
  }
}

export function* watchCreateVote() {
  yield takeEvery(VOTE_CREATE_INITIATED, createVoteFlow)
}

function* deleteVoteFlow({ payload }: IAction) {
  try {
    yield call(deleteVote, payload)
    yield put({ type: VOTE_DELETE_SUCCESS })
  } catch (err) {
    yield put({ type: VOTE_DELETE_FAILURE, payload: err })
  }
}

export function* watchDeleteVote() {
  yield takeEvery(VOTE_DELETE_INITIATED, deleteVoteFlow)
}

function* fetchEventVotesFlow({ payload }: IAction) {
  try {
    const votes = yield call(fetchEventVotes, payload)
    yield put({ type: FETCH_EVENT_VOTES_SUCCESS, payload: votes })
  } catch (err) {
    yield put({ type: FETCH_EVENT_VOTES_FAILURE, payload: err })
  }
}

export function* watchFetchEventVotes() {
  yield takeEvery(FETCH_EVENT_VOTES_INITIATED, fetchEventVotesFlow)
}
