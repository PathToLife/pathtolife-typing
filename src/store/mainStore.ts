import {createStore, combineReducers} from 'redux';
import {ITypingState, typingReducer} from './reducer/typingReducer';
import {createDispatchHook, createSelectorHook, createStoreHook, useSelector} from 'react-redux';

export interface IRootState {
    typing: ITypingState
}
const reducers = combineReducers<IRootState>({
    typing: typingReducer
})

export const mainStore = createStore(reducers)

export const useThunkDispatch = createDispatchHook<IRootState>()
export const useSelectorAppState = createSelectorHook<IRootState>()