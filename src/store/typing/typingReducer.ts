import {
    resetTyping,
    setCurrentLineState,
    setCurrentWordIdx,
    setInputWord,
    setKeyInterval,
    setKeyLastSeen,
    setLineIdx,
    setWordInterval,
    setWordLastSeen,
} from './typingActions'
import { createReducer } from '@reduxjs/toolkit'
import { IWordInterval, WordState } from './wordHelpers'

export interface ITypingStats {
    timeRemainingMS: number

    correctWordsCount: number
    incorrectWordsCount: number

    wordsPerMinuteAvgAdjusted: number // wpm correct words
    wordsPerMsInterval: IWordInterval[] // wpm graph
    wordLastSeen: number | null

    keyPerMsInterval: number[] // kpm graph
    keyLastSeen: number | null
}

export interface ITypingState extends ITypingStats {
    typedLines: string[]

    currentLineIdx: number
    currentLineState: WordState[] // the correctness of current line

    currentWordIdx: number // the word idx being typed on the current line
    currentWordInput: string // the word currently being typed
}

const initialState: ITypingState = {
    typedLines: [],

    currentLineIdx: 0,
    currentLineState: [],

    currentWordIdx: 0,
    currentWordInput: '',

    correctWordsCount: 0,
    incorrectWordsCount: 0,
    timeRemainingMS: 0,

    wordsPerMinuteAvgAdjusted: 0,
    wordsPerMsInterval: [],
    wordLastSeen: null,

    keyPerMsInterval: [],
    keyLastSeen: null,
}

export const typingReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(resetTyping, () => initialState)
        .addCase(setCurrentWordIdx, (state, action) => {
            state.currentWordIdx = action.payload
        })
        .addCase(setInputWord, (state, action) => {
            state.currentWordInput = action.payload.trim()
        })
        .addCase(setKeyLastSeen, (state, action) => {
            state.keyLastSeen = action.payload
        })
        .addCase(setKeyInterval, (state, action) => {
            state.keyPerMsInterval = action.payload
        })
        .addCase(setWordLastSeen, (state, action) => {
            state.wordLastSeen = action.payload
        })
        .addCase(setWordInterval, (state, action) => {
            state.wordsPerMsInterval = action.payload

            const [
                totalCorrectWords,
                totalTimeMs,
            ] = state.wordsPerMsInterval.reduce<[number, number]>(
                ([tCW, ttMs], val) => {
                    if (val.isWordCorrect) {
                        return [tCW + 1, ttMs + val.msSinceLast]
                    }
                    return [tCW, ttMs + val.msSinceLast]
                },
                [0, 0]
            )
            const wpm = (totalCorrectWords * 60) / (totalTimeMs / 1000)
            state.wordsPerMinuteAvgAdjusted = Math.floor(wpm)
        })
        .addCase(setLineIdx, (state, action) => {
            state.currentLineIdx = action.payload
        })
        .addCase(setCurrentLineState, (state, action) => {
            state.currentLineState = action.payload
        })
})
