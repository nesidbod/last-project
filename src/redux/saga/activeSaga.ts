import { put, takeEvery } from 'redux-saga/effects'
import {
    SELECT_PAGE
} from '../actions/activeActions'
import { CLEAR_SEARCH } from '../actions/searchActions'
import {
    CLEAR_SUGGESTION
} from '../actions/suggestionActions'
import { TRACK_DESELECTED } from '../actions/trackActions'

export function* SelectPage() {
  try {
    yield put({ type: CLEAR_SUGGESTION })
    yield put({ type: CLEAR_SEARCH })
    yield put({ type: TRACK_DESELECTED })
  } catch (error) {
    console.log(error)
  }
}

export function* watchSelectPage() {
  yield takeEvery(SELECT_PAGE, SelectPage)
}
