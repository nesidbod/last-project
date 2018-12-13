import * as React from 'react'
import '../../styles/loading/LoadingSpinner.css'

interface ITrackListProps {
  showSpinner: boolean
}

const LoadingSpinner = ({ showSpinner = false }: ITrackListProps) => (
  <React.Fragment>
    {showSpinner ? (
      <div className="loader-container">
        <div className="loader" />
      </div>
    ) : (
      ''
    )}
  </React.Fragment>
)

export default LoadingSpinner
