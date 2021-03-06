import IAction from '../../models/IAction'
import ISuggestionState from '../../models/suggestion/ISuggestionState'
import initialState from '../../models/suggestion/suggestionInitialState'
import {
  CLEAR_SAVED_SUGGESTION,
  CLEAR_SUGGESTION,
  DELETE_SUGGESTION_FAILED,
  DELETE_SUGGESTION_INITIATED,
  DELETE_SUGGESTION_SUCCESS,
  FETCH_SUGGESTIONS_FAILED,
  FETCH_SUGGESTIONS_INITIATED,
  FETCH_SUGGESTIONS_SUCCESS,
  FETCH_USERS_SUGGESTIONS_INITIATED,
  SAVE_PLAYLIST_SUGGESTION_INITIATED,
  SAVE_SUGGESTION_FAILED,
  SAVE_SUGGESTION_SUCCESS,
  SAVE_TRACK_SUGGESTION_INITIATED
} from '../actions/suggestionActions'

export default function suggestion(
  state: ISuggestionState = initialState,
  { type, payload }: IAction
) {
  switch (type) {
    case SAVE_TRACK_SUGGESTION_INITIATED:
      return { ...state, savingSuggestion: true } as ISuggestionState
    case SAVE_PLAYLIST_SUGGESTION_INITIATED:
      return { ...state, savingSuggestion: true } as ISuggestionState
    case SAVE_SUGGESTION_SUCCESS:
      return {
        ...state,
        savingSuggestion: false,
        savedSuggestion: payload
      } as ISuggestionState
    case SAVE_SUGGESTION_FAILED:
      return {
        ...state,
        savingSuggestion: false,
        savingSuggestionError: payload
      } as ISuggestionState
    case FETCH_SUGGESTIONS_INITIATED:
      return { ...state, fetchingSuggestions: true } as ISuggestionState
      case FETCH_USERS_SUGGESTIONS_INITIATED:
      return { ...state, fetchingSuggestions: true } as ISuggestionState
    case FETCH_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        fetchingSuggestions: false,
        suggestions: payload
      } as ISuggestionState
    case FETCH_SUGGESTIONS_FAILED:
      return {
        ...state,
        fetchingSuggestions: false,
        fetchingSuggestionsError: payload
      } as ISuggestionState
    case CLEAR_SAVED_SUGGESTION:
      return {
        ...state,
        savedSuggestion: undefined
      }
      case CLEAR_SUGGESTION:
      return {
        ...state,
        suggestions: []
      }
    case DELETE_SUGGESTION_INITIATED:
      return {
        ...state,
        deletingSuggestion: true
      }
    case DELETE_SUGGESTION_FAILED:
      return {
        ...state,
        deletingSuggestion: false,
        deletingSuggestionError: payload
      }
    case DELETE_SUGGESTION_SUCCESS:
      return {
        ...state,
        deletingSuggestion: false,
        deletedSuggestion: payload
      }
    default:
      return state
  }
}
