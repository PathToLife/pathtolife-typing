import { RootState } from './mainStore'
import { Action, ThunkAction } from '@reduxjs/toolkit'

export type RootThunkAction<
    TReturn = void,
    TAction extends Action = Action<string>,
> = ThunkAction<TReturn, RootState, undefined, TAction>
