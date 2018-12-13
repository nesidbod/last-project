import { connect } from 'react-redux'
import IRootState from '../../models/rootState'
import { clearSearch, searchTracks } from '../../redux/actions/searchActions'
import {selectTrack} from '../../redux/actions/trackActions'
import Search from './Search'

const mapStateToProps = (state: IRootState) => ({
  tracks: state.search.tracks,
  searching: state.search.searching
})

const mapDispatchToProps = {
  searchTracks,
  clearSearch,
  selectTrack,
}

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(
  Search
)

export default SearchContainer
