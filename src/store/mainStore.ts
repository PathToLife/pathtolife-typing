import { ITypingState, typingReducer } from './typing/typingReducer'
import { configureStore } from '@reduxjs/toolkit'

export interface IRootState {
    typing: ITypingState
}

// thunk middleware is automatically added
export const mainStore = configureStore({
    reducer: {
        typing: typingReducer,
    },
})
