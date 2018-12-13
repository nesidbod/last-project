import MoreVertIcon from '@material-ui/icons/MoreVert'
import { debounce } from 'lodash'
import * as React from 'react'
import IAction from '../../models/IAction'
import ITrack from '../../models/track/ITrack'
import '../../styles/search/Search.css'

import { Icon, IconButton, Menu, MenuItem } from '@material-ui/core'

const WAIT_INTERVAL = 400

interface ISearchProps {
  tracks: ITrack[]
  clearSearch(): IAction
  searchTracks(searchTerm: string): IAction
  selectTrack(track: ITrack): IAction
}

interface ISearchState {
  searchTerm: string
  anchorEl: any
}

export default class Search extends React.Component<
  ISearchProps,
  ISearchState
  > {
  private timer: any = debounce(() => this.triggerChange(), WAIT_INTERVAL)

  constructor(props: any) {
    super(props)

    this.state = {
      searchTerm: '',
      anchorEl: null
    }
  }


  public render() {
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    return (
      <div className="Search-root">
        <div className="account-search-block">
          <Icon className="account-search-icon"> search</Icon>
          <input
            placeholder="Search for Track or Artist"
            className={'account-search'}
            onChange={elem => this.handleChange(elem.target.value)}
          />
          <IconButton
            aria-label="More"
            aria-owns={open ? 'long-menu' : ''}
            aria-haspopup="true"
            onClick={this.handleClick}
            disabled={true}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>{'zzcxcz'}</MenuItem>
          </Menu>
        </div>
      </div>
    )
  }

  private handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  private handleClose = () => {
    this.setState({ anchorEl: null })
  }

  private onSuggestionsClearRequested = () => {
    this.setState({ searchTerm: '' })
    this.props.clearSearch()
  }

  private handleChange = (searchTerm: string) => {
    if (!!!searchTerm.length) {
      this.props.clearSearch()
      this.onSuggestionsClearRequested()
    } else {
      this.setState({ searchTerm })

      this.timer()
    }
  }

  private triggerChange = () => {
    const { searchTerm } = this.state
    this.props.searchTracks(searchTerm)
  }
}
