import { Action, applyMiddleware, combineReducers, createStore } from 'redux'
import { ITypingState, typingReducer } from './typing/typingReducer'
import { createSelectorHook, useDispatch } from 'react-redux'
import thunk, { ThunkDispatch } from 'redux-thunk'

export interface IRootState {
    typing: ITypingState
}

const reducers = combineReducers<IRootState>({
    typing: typingReducer,
})

export const mainStore = createStore(reducers, applyMiddleware(thunk))

export const useThunkDispatch = () =>
    useDispatch<ThunkDispatch<IRootState, undefined, Action<string>>>()
export const useSelectorAppState = createSelectorHook<IRootState>()
