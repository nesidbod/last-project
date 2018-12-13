import { call, put, takeEvery } from 'redux-saga/effects'
import * as searchClient from '../../clients/searchClient'
import IAction from '../../models/IAction'
import ITrack from '../../models/track/ITrack'
import {
  SEARCH_FAILED,
  SEARCH_INITIATED,
  SEARCH_SUCCESS
} from '../actions/searchActions'

function searchTracks(searchTerm: string) {
  return searchClient.search(searchTerm).then(response => response.tracks.items)
}

function* searchTracksFlow(action: IAction) {
  try {
    const tracks: ITrack[] = yield call(searchTracks, action.payload)
    yield put({ type: SEARCH_SUCCESS, payload: tracks })
  } catch (err) {
    yield put({ type: SEARCH_FAILED, payload: err })
  }
}

export function* watchSearch() {
  yield takeEvery(SEARCH_INITIATED, searchTracksFlow)
}
