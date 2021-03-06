import { IconButton, Snackbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import * as React from 'react'
import '../../styles/suggestion/SuggestView.css'

interface ISnackbarsProps {
  open: boolean
  value: string
  close: any
}

export default class SnackbarsView extends React.PureComponent<
ISnackbarsProps,
  any
> {
  constructor(props: ISnackbarsProps) {
    super(props)

    this.state = {
      open: this.props.open,
      playlist: {}
    }
  }

  public handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ open: false })
  }

  public render() {
    const { value, open, close } = this.props

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={600}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        classes={{'root': 'snackbar-custom'}}
        message={<span id="message-id">{value}</span>}
        action={
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => close()}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    )
  }
}
