import initialState from '../../models/event/eventInitialState'
import IEventState from '../../models/event/IEventState'
import Action from '../../models/IAction'
import {
  EVENT_FETCH_BY_INVITE_ID_INITIATED,
  EVENT_FETCH_ERROR,
  EVENT_FETCH_INITIATED,
  EVENT_FETCHED,
  EVENT_SUGGESTION_DESELECTED,
  EVENT_SUGGESTION_SELECTED,
  EVENT_СLEAR,
  FETCH_USERS_EVENTS_SUCCESS
} from '../actions/eventActions'

export default function event(
  state: IEventState = initialState,
  { type, payload }: Action
) {
  switch (type) {
    case EVENT_FETCH_INITIATED || EVENT_FETCH_BY_INVITE_ID_INITIATED:
      return {
        ...state,
        eventLoading: true
      } as IEventState
    case EVENT_FETCHED:
      return {
        ...state,
        event: payload,
        eventLoading: false
      } as IEventState
      case EVENT_СLEAR:
      return {
        ...state,
        event: undefined,
        events: [],
        eventLoading: false
      } as IEventState
    case EVENT_FETCH_ERROR:
      return {
        ...state,
        fetchEventError: payload,
        eventLoading: false
      } as IEventState
    case EVENT_SUGGESTION_SELECTED:
      return {
        ...state,
        selectedSuggestion: payload
      } as IEventState
    case EVENT_SUGGESTION_DESELECTED:
      return {
        ...state,
        selectedSuggestion: undefined
      } as IEventState
    case FETCH_USERS_EVENTS_SUCCESS:
      return {
        ...state,
        events: payload
      } as IEventState
    default:
      return state
  }
}
