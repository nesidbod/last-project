import IEvent from '../event/IEvent'

export default interface IInviteState {
  inviteId: string
  event: IEvent
  open: boolean
  error: any
}
