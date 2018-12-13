import { all } from 'redux-saga/effects'
import {
  watchLogin,
  watchLoginAsGuest,
  watchLoginWithPassword,
  watchLogout,
  watchSignUp
} from './saga/authSaga'
import {
  watchFetchEvent,
  watchFetchEventByInviteId,
  watchFetchUsersEvents
} from './saga/eventSaga'
import {
  watchFetchInvite,
  watchFetchInviteEvent,
  watchLoadInviteId,
  watchStoreInviteId
} from './saga/inviteSaga'
import { watchFetchPlaylists } from './saga/playlistSaga'
import { watchFetchRecommendation } from './saga/recommendationsSaga'
import { watchFetchOrCreateRsvp } from './saga/rsvpSaga'
import { watchSearch } from './saga/searchSaga'
import {
  watchFetchSuggestions,
  watchFetchUsersSuggestions,
  watchSavePlaylistSuggestion,
  watchSaveTrackSuggestion
} from './saga/suggestionSaga'
import {
  watchCreateVote,
  watchDeleteVote,
  watchFetchEventVotes
} from './saga/voteSaga'

import {watchSelectPage} from './saga/activeSaga'

export default function* saga() {
  yield all([
    watchLogin(),
    watchSelectPage(),
    watchFetchPlaylists(),
    watchStoreInviteId(),
    watchLoadInviteId(),
    watchFetchInviteEvent(),
    watchFetchSuggestions(),
    watchFetchUsersSuggestions(),
    watchSaveTrackSuggestion(),
    watchFetchRecommendation(),
    watchSearch(),
    watchFetchEvent(),
    watchFetchEventByInviteId(),
    watchSavePlaylistSuggestion(),
    watchLogout(),
    watchSignUp(),
    watchLoginWithPassword(),
    watchLoginAsGuest(),
    watchFetchOrCreateRsvp(),
    watchCreateVote(),
    watchDeleteVote(),
    watchFetchEventVotes(),
    watchFetchUsersEvents(),
    watchFetchInvite()
  ])
}
