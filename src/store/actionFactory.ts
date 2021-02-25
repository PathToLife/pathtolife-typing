import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { IRootState } from './mainStore'

export type RootThunkAction<
    TReturn = void,
    TAction extends Action = Action<string>
> = ThunkAction<TReturn, IRootState, undefined, TAction>
