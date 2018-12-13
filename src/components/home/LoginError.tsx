import Typography from '@material-ui/core/Typography/Typography'
import * as React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/home/Home.css'

const LoginError = () => (
  <div className="Home-error-message">
    <Typography
      variant="headline"
      gutterBottom={true}
      align="center"
      paragraph={true}
    >
      There seems to have been an issue retrieving your account details. Please
      try to <Link to="/login">login again</Link>.
    </Typography>
  </div>
)

export default LoginError
