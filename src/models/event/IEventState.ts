import IEvent from './IEvent'
import ISelectedSuggestion from './ISelectedSuggestion'

export default interface IEventState {
  fetchEventError?: Error
  event?: IEvent
  events: IEvent[]
  eventLoading: boolean
  selectedSuggestion?: ISelectedSuggestion
}
