import { call, put, takeEvery } from 'redux-saga/effects'
import * as recommdationsClient from '../../clients/recommendationsClient'
import ITrack from '../../models/track/ITrack'
import {
  FETCH_RECOMMENDATIONS_FAILED,
  FETCH_RECOMMENDATIONS_INITIATED,
  FETCH_RECOMMENDATIONS_SUCCESS
} from '../actions/recommendationsActions'

function fetchRecommendations() {
  return recommdationsClient.getUserTopTracks()
}

function* fetchRecommendationsFlow() {
  try {
    const tracks: ITrack[] = yield call(fetchRecommendations)
    yield put({ type: FETCH_RECOMMENDATIONS_SUCCESS, payload: tracks })
  } catch (err) {
    yield put({ type: FETCH_RECOMMENDATIONS_FAILED, payload: err })
  }
}

export function* watchFetchRecommendation() {
  yield takeEvery(FETCH_RECOMMENDATIONS_INITIATED, fetchRecommendationsFlow)
}
