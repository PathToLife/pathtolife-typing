import {ThunkAction} from 'redux-thunk';
import {Action, AnyAction} from 'redux';
import {IRootState} from '../mainStore';

export type RootThunkAction<TReturn = void, TAction = string> = ThunkAction<TReturn, IRootState, undefined, Action<TAction>>

export const makeAction = <T>(type: string, value: T): AnyAction => ({type, payload: value})