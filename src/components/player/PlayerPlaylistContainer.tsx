import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import IRootState from '../../models/rootState'
import PlayerPlaylist from './PlayerPlaylist'
import { deselectTrack } from '../../redux/actions/trackActions'

const mapStateToProps = (state: IRootState) => ({
    playlist: state.playlist.selectedPlaylist,
    selectedTrack: state.track.selectedTrack,
    votes: state.vote.votes

})

const mapDispatchToProps = {
    deselectTrack
}

const PlayerPlaylistContainer = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(PlayerPlaylist)
)

export default PlayerPlaylistContainer
