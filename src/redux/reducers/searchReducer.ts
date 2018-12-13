import IAction from '../../models/IAction'
import ISearchState from '../../models/search/ISearchState'
import initialState from '../../models/search/searchInitialState'
import { CLEAR_SEARCH, SEARCH_FAILED,SEARCH_INITIATED, SEARCH_SUCCESS } from '../actions/searchActions'

export default function search(
  state: ISearchState = initialState,
  { type, payload }: IAction
) {
  switch (type) {
    case SEARCH_INITIATED:
      return { ...state, searching: true }
    case SEARCH_SUCCESS:
      return { ...state, tracks: payload, searching: false }
    case CLEAR_SEARCH:
      return { ...state, tracks: [] }
      case SEARCH_FAILED:
      return { ...state, searching: false }
    default:
      return state
  }
}
