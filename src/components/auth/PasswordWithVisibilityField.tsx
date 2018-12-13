import FormControl from '@material-ui/core/FormControl/FormControl'
import IconButton from '@material-ui/core/IconButton/IconButton'
import Input from '@material-ui/core/Input/Input'
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel/InputLabel'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import * as React from 'react'

interface IPasswordWithVisibilityFieldProps {
  fieldProps: any
  form: any
}

interface IPasswordWithVisibilityFieldState {
  showPassword: boolean
}

class PasswordWithVisibilityField extends React.Component<
  IPasswordWithVisibilityFieldProps,
  IPasswordWithVisibilityFieldState
> {
  constructor(props: IPasswordWithVisibilityFieldProps) {
    super(props)
    this.state = { showPassword: false }
  }

  public render() {
    const { showPassword } = this.state
    const { fieldProps, form } = this.props
    const passwordError: boolean = !!(
      form.touched.password && form.errors.password
    )

    return (
      <FormControl>
        <InputLabel htmlFor="password-input">
          {(passwordError && form.errors.password) || 'Password'}
        </InputLabel>
        <Input
          id="password-input"
          error={passwordError}
          type={showPassword ? 'text' : 'password'}
          {...fieldProps}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={this.handleTogglePasswordVisibility}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    )
  }

  private handleTogglePasswordVisibility = () => {
    this.setState(prevState => ({ showPassword: !prevState.showPassword }))
  }
}

export default PasswordWithVisibilityField
