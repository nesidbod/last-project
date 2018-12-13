import IPlaylistSuggestion from '../../models/suggestion/IPlaylistSuggestion'
import ISuggestion from '../../models/suggestion/ISuggestion'
import ITrackSuggestion from '../../models/suggestion/ITrackSuggestion'

export default class SuggestionTransformer {
  public trackSuggestionToSuggestion(
    suggestion: ITrackSuggestion
  ): ISuggestion {
    return {
      eventId: suggestion.eventId,
      userId: suggestion.userId,
      type: 'track',
      trackUri: suggestion.trackUri,
      accepted: false,
      rejected: false
    } as ISuggestion
  }

  public playlistSuggestionToSuggestions(
    suggestion: IPlaylistSuggestion
  ): ISuggestion[] {
    return suggestion.trackUris.map(trackUri => ({
      eventId: suggestion.eventId,
      userId: suggestion.userId,
      type: 'playlist',
      playlistUri: suggestion.playlistUri,
      accepted: false,
      rejected: false,
      trackUri
    }))
  }
}
