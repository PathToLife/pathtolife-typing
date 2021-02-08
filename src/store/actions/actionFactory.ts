import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';
import {IRootState} from '../mainStore';


export interface IReduxAction<T = any> {
    type: string
    payload: T
}

export type RootThunkAction<TReturn = void, TAction = string> = ThunkAction<TReturn, IRootState, undefined, Action<TAction>>

export const makeAction = <T>(type: string, value: T) => ({type, payload: value})