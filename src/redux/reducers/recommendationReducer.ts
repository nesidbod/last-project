import IAction from '../../models/IAction'
import IRecommendationsState from '../../models/recommendation/IRecommendationsState'
import initialState from '../../models/recommendation/recommendationsInitialState'
import { FETCH_RECOMMENDATIONS_SUCCESS,RECOMMENDATIONS_CLEAR } from '../actions/recommendationsActions'

export default function recommendation(
  state: IRecommendationsState = initialState,
  { type, payload }: IAction
) {
  switch (type) {
    case FETCH_RECOMMENDATIONS_SUCCESS:
      return { ...state, tracks: payload }
      case RECOMMENDATIONS_CLEAR:
      return { ...state, tracks: [] }
    default:
      return state
  }
}
