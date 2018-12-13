import { Typography } from '@material-ui/core'
import * as React from 'react'
import '../../styles/home/Home.css'

const FetchEventError = () => (
  <div className="Home-error-message">
    <Typography
      variant="headline"
      gutterBottom={true}
      align="center"
      paragraph={true}
    >
      We did not find any event linked to your account. You need an invite from
      a host to suggest songs. If you received an invite, please check the link
      the host provided and make sure you used it to load this page. If the
      invite link is OK, please try reloading the page.
    </Typography>
  </div>
)

export default FetchEventError
