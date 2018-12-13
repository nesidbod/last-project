import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
// import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import saga from './saga'

const isDevBuild = process.env.NODE_ENV !== 'production'
export const history = createHistory()

const reactRouterMiddleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()

// const logger = createLogger({
//   duration: true
// })

const rootMidlelwares = [reactRouterMiddleware, sagaMiddleware]

const middleware = isDevBuild
  ? [...rootMidlelwares, reduxImmutableStateInvariant()]
  : rootMidlelwares

if (isDevBuild) {
  ;(Map.prototype as any).toJSON = function() {
    return JSON.parse(JSON.stringify([...this]))
  }
}

const windowIfDefined = typeof window === 'undefined' ? null : (window as any)
const composeEnhancers = isDevBuild
  ? windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleware))
)
sagaMiddleware.run(saga)
