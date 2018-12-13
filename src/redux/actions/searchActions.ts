import IAction from "../../models/IAction";

export const SEARCH_INITIATED = 'FETCH_SEARCH_INITIATED'
export const SEARCH_SUCCESS = 'FETCH_SEARCH_SUCCESS'
export const SEARCH_FAILED = 'FETCH_SEARCH_FAILED'
export const CLEAR_SEARCH = 'CLEAR_SEARCH'

export const searchTracks = (searchTerm: string) => ({
  type: SEARCH_INITIATED,
  payload: searchTerm
} as IAction)

export const clearSearch = () => ({
  type: CLEAR_SEARCH
} as IAction)
