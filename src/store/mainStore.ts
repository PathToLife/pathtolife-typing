import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { typingReducer } from './typing/typingReducer'
import { configureStore } from '@reduxjs/toolkit'

// thunk middleware is automatically added
export const mainStore = configureStore({
    reducer: {
        typing: typingReducer,
    },
})

export type RootState = ReturnType<typeof mainStore.getState>
type AppDispatch = () => typeof mainStore.dispatch

export const useThunkDispatch: AppDispatch = () => mainStore.dispatch
export const useSelectorAppState: TypedUseSelectorHook<RootState> = useSelector
