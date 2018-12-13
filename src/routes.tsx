import * as React from 'react'
import { Route } from 'react-router'
import { ConnectedRouter, routerActions } from 'react-router-redux'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import lStorage from './other/storage/localStorage'
import LoadingSpinner from './sComponents/loading/LoadingSpinnerContainer'

import Account from './components/account/Account'
import Login from './components/auth/LoginContainer'
import LoginInvite from './components/auth/LoginInviteContainer'
import SignUp from './components/auth/SignUpContainer'
import BottomBar from './components/bottombar/BottomBarContainer'
import Event from './components/event/EventContainer'
import Events from './components/event/EventListViewContainer'
import Finder from './components/finder/FinderContainer'
import Home from './components/home/HomeContainer'
import MainAppBar from './components/home/MainAppBarContainer'
import Invite from './components/invite/InviteContainer'
import PlaylistDetailed from './components/playlist/PlaylistDetailedContainer'
import PlayList from './components/playlist/PlayListViewContainer'
import Requests from './components/requests/RequestsContainer'
import Stepper from './components/stepper/StepperContainer'
import IRootState from './models/rootState'

const locationHelper = locationHelperBuilder({})
const userIsNotAuthenticated = connectedRouterRedirect({
  allowRedirectBack: false,
  authenticatedSelector: (state: IRootState) => !state.auth.isAuthenticated,
  redirectPath: (state: IRootState, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) ||
    `/events/${lStorage.get('invite_id') || '/events'}`,
  wrapperDisplayName: 'UserIsNotAuthenticated'
}) as any

const userIsAuthenticated = connectedRouterRedirect({
  authenticatedSelector: (state: IRootState) => state.auth.isAuthenticated || state.auth.isAuthenticating ,
  redirectAction: routerActions.replace,
  redirectPath: '/about',
  wrapperDisplayName: 'UserIsAuthenticated'
}) as any

const redirectToEvent = connectedRouterRedirect({
  authenticatedSelector: (state: IRootState) => false,
  redirectAction: routerActions.replace,
  redirectPath: (state: IRootState, ownProps) => {
    if (state.auth.isAuthenticated) {
      return locationHelper.getRedirectQueryParam(ownProps) ||
    `/events/${lStorage.get('invite_id') || '/events'}`
    } else {
      return '/login'
    }
  },
  wrapperDisplayName: 'redirectToEvent'
}) as any

const routes = [
  {
    component: Invite,
    path: '/invite/:inviteId',
    exact: true
  },
  {
    component: userIsNotAuthenticated(Stepper),
    path: '/about',
    exact: true
  },
  {
    component: userIsNotAuthenticated(LoginInvite),
    path: '/login-invite',
    exact: true
  },
  {
    component: userIsNotAuthenticated(SignUp),
    path: '/signup',
    exact: true
  },
  {
    component: userIsNotAuthenticated(Login),
    path: '/login',
    exact: true
  },
  {
    component: userIsAuthenticated(Events),
    path: '/events',
    exact: true
  },
  {
    component: userIsAuthenticated(Event),
    path: '/events/:eventId',
    exact: true
  },
  {
    component: userIsAuthenticated(PlayList),
    path: '/playlist',
    exact: true
  },
  {
    component: userIsAuthenticated(PlaylistDetailed),
    path: '/playlist/:playlistId',
    exact: true
  },
  {
    component: userIsAuthenticated(Finder),
    path: '/finder',
    exact: true
  },
  {
    component: userIsAuthenticated(Finder),
    path: '/finder/:playlistId',
    exact: true
  },
  {
    component: userIsAuthenticated(Requests),
    path: '/requests',
    exact: true
  },
  {
    component: userIsAuthenticated(Account),
    path: '/account',
    exact: true
  },
  {
    component: redirectToEvent(Home),
    path: '/',
    exact: true
  }
]

const renderSubRoutes = (route: any) => (props: any) => (
  <route.component {...props} routes={route.routes} />
)

export const RouteWithSubRoutes = (route: any) => (
  <Route
    path={route.path}
    exact={route.exact}
    render={renderSubRoutes(route)}
  />
)

interface IRoutesProps {
  history: any
}

export const Routes: React.SFC<IRoutesProps> = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <div className="main-page-container">
        <LoadingSpinner />
        <MainAppBar history={history} />
        <div className="main-body">
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} history={history} />
          ))}
        </div>
        <BottomBar history={history} />
      </div>
    </ConnectedRouter>
  )
}
