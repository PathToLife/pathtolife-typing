import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { IRootState } from '../mainStore'

export type RootThunkAction<
    TReturn = void,
    TAction extends Action = Action<string>
> = ThunkAction<TReturn, IRootState, undefined, TAction>

export const makeAction = <TType = string, TPayload = undefined>(
    type: TType,
    payload: TPayload
) => ({ type, payload })
