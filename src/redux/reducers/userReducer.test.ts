import IAction from '../../models/IAction'
import { emptyUser } from '../../models/user/userInitialState'
import {
  FETCH_USER,
  FETCH_USER_ERROR,
  FETCH_USER_SUCCESS
} from '../actions/userActions'
import user from './userReducer'

it('should return the initial state when no action matches', () => {
  expect(user(undefined, {} as IAction)).toEqual(emptyUser)
})

it('should handle FETCH_USER', () => {
  expect(user(emptyUser, { type: FETCH_USER })).toEqual({
    ...emptyUser,
    isLoading: true
  })
})

it('should handle FETCH_USER_SUCCESS', () => {
  expect(
    user(
      { ...emptyUser, isLoading: true },
      {
        payload: {
          id: 'test-id'
        },
        type: FETCH_USER_SUCCESS
      }
    )
  ).toEqual({
    ...emptyUser,
    data: { id: 'test-id' },
    isLoading: false
  })
})

it('should handle FETCH_USER_ERROR', () => {
  expect(
    user(emptyUser, {
      payload: new Error('Oh dear :('),
      type: FETCH_USER_ERROR
    })
  ).toEqual({ ...emptyUser, error: new Error('Oh dear :(') })
})
