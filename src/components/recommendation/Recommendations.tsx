import List from '@material-ui/core/List/List'
import { WithStyles, withStyles } from '@material-ui/core/styles'
import * as React from 'react'
import IAction from '../../models/IAction'
import ITrack from '../../models/track/ITrack'
import TrackList from '../track/TrackList'

const decorate = withStyles(({}) => ({
  root: {}
}))

interface IRecommendationsProps {
  tracks: ITrack[]
  search: any
  getRecommendations(): IAction
  onRecommendationSelected?(track: ITrack): void
}

export default decorate(
  class Recommendations extends React.Component<
    IRecommendationsProps & WithStyles<'root'>
  > {
    public componentDidMount() {
      this.props.getRecommendations()
    }
    public render() {
      const { classes, tracks, onRecommendationSelected,search } = this.props
      return (
        <List classes={classes}>
          <TrackList tracks={!!search.tracks.length  ? search.tracks : tracks} onTrackSelected={onRecommendationSelected} withSuggesing={true}/>
        </List>
      )
    }
  }
)
