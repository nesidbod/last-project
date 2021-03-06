import initialState from '../../models/event/eventInitialState'
import IEvent from '../../models/event/IEvent'
import ISelectedSuggestion from '../../models/event/ISelectedSuggestion'
import Action from '../../models/IAction'
import {
  EVENT_FETCH_ERROR,
  EVENT_FETCH_INITIATED,
  EVENT_FETCHED,
  EVENT_SUGGESTION_DESELECTED,
  EVENT_SUGGESTION_SELECTED,
  FETCH_USERS_EVENTS_SUCCESS
} from '../actions/eventActions'
import event from './eventReducer'

describe('eventReducer', () => {
  it('should return the initial state when no action matches', () => {
    expect(event(undefined, {} as Action)).toEqual(initialState)
  })

  describe('fetching event', () => {
    it('should handle EVENT_FETCH_INITIATED', () => {
      expect(
        event(initialState, {
          type: EVENT_FETCH_INITIATED
        })
      ).toEqual({
        ...initialState,
        eventLoading: true
      })
    })

    it('should handle EVENT_FETCHED', () => {
      expect(
        event(
          { ...initialState, eventLoading: true },
          {
            type: EVENT_FETCHED,
            payload: {} as IEvent
          }
        )
      ).toEqual({
        ...initialState,
        eventLoading: false,
        event: {} as IEvent
      })
    })

    it('should handle EVENT_FETCH_ERROR', () => {
      expect(
        event(initialState, {
          type: EVENT_FETCH_ERROR,
          payload: new Error('event err')
        })
      ).toEqual({
        ...initialState,
        fetchEventError: new Error('event err')
      })
    })
  })

  it('should handle EVENT_SUGGESTION_SELECTED', () => {
    expect(
      event(initialState, {
        type: EVENT_SUGGESTION_SELECTED,
        payload: {} as ISelectedSuggestion
      })
    ).toEqual({
      ...initialState,
      selectedSuggestion: {} as ISelectedSuggestion
    })
  })
})

it('should handle EVENT_SUGGESTION_DESELECTED', () => {
  expect(
    event(
      { ...initialState, selectedSuggestion: {} as ISelectedSuggestion },
      { type: EVENT_SUGGESTION_DESELECTED }
    )
  ).toEqual(initialState)
})

it('should handle FETCH_USERS_EVENTS_SUCCESS', () => {
  const events = [] as IEvent[]
  expect(
    event(initialState, { type: FETCH_USERS_EVENTS_SUCCESS, payload: events })
  ).toEqual({ ...initialState, events })
})
