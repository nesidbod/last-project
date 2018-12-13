import * as React from 'react'
import Images from '../../styles/img/ImportImg'
import '../../styles/loadingPage/LoadingPage.css'

const LoadingPage = () => (
  <div className="loadingPage">
    <div className="loadingPage-container">
      <img className="ing-logo" src={Images.Logo} />
    </div>
  </div>
)

export default LoadingPage
