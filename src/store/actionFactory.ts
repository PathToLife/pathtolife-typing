import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { RootState } from './mainStore'

export type RootThunkAction<
    TReturn = void,
    TAction extends Action = Action<string>,
> = ThunkAction<TReturn, RootState, undefined, TAction>
