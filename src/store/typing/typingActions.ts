import React from 'react'
import { RootThunkAction } from '../actionFactory'
import {
    generateRandomLineState,
    IWordInterval,
    TLineState,
} from './wordHelpers'
import { createAction } from '@reduxjs/toolkit'
import { WordState } from './wordHelpers'

// resets everything in typing state, i.e. new game
export const resetTyping = createAction('typing/reset')

// sets the index of the current word being typed
export const setCurrentWordIdx = createAction<number>('currentWordIdx/set')

export const setInputWord = createAction<string>('inputWord/set')

export const setKeyLastSeen = createAction<number | null>('keyLastSeen/set')

export const setKeyInterval = createAction<number[]>('keyInterval/set')

export const setWordLastSeen = createAction<number | null>('wordLastSeen/set')

export const setLineIdx = createAction<number>('lineIdx/set')

export const setWordInterval = createAction<IWordInterval[]>('wordInterval/set')

export const setCurrentLineState = createAction<WordState[]>('currentLine/set')

export const loadNextLine = createAction<TLineState>('nextLine/load')

export const onKeyDownTyping = (
    e: React.KeyboardEvent<HTMLElement>
): RootThunkAction => async (dispatch, store) => {
    const currentWord = store().typing.currentWordInput
    const currentWordIdx = store().typing.currentWordIdx

    if (e.ctrlKey && e.key === 'r') {
        dispatch(resetTyping())
        e.preventDefault()
        return
    }

    const key = e.key

    if (key.length === 1) {
        if (key === ' ') {
            // space
            e.preventDefault()
            if (currentWord.length !== 0) {
                dispatch(nextWord())
                dispatch(storeKeydownRate())
            }
            return
        } else {
            e.preventDefault()
            const newWord = currentWord + key
            dispatch(updateWordState(newWord, currentWordIdx))
            dispatch(setInputWord(newWord))
            dispatch(storeKeydownRate())
            return
        }
    }

    if (key === 'Enter' && currentWord.length > 0) {
        e.preventDefault()
        dispatch(nextWord())
        dispatch(storeKeydownRate())
        return
    } else if (key === 'Backspace') {
        e.preventDefault()

        if (currentWord.length > 0) {
            const newWord = currentWord.slice(0, -1)
            dispatch(updateWordState(newWord, currentWordIdx))
            dispatch(setInputWord(newWord))
            dispatch(storeKeydownRate())
        } else {
            dispatch(previousWord())
        }
        return
    }
}

const updateWordState = (
    typedWord: string,
    currentWordIdx: number,
    isSubmit: boolean = false
): RootThunkAction => (dispatch, store) => {
    const newLineState = [...store().typing.lineStateCurrent]
    const currentWordState = newLineState[currentWordIdx]
    const typedWordClean = typedWord.trim()

    if (typedWordClean.length === 0) {
        // set all to pending
        currentWordState.setAllPending()
    } else {
        currentWordState.generateLetterState(
            typedWordClean,
            isSubmit ? 'incorrect-missing-letter' : 'pending'
        )
    }

    // trigger react render
    newLineState[currentWordIdx] = currentWordState.clone()

    dispatch(setCurrentLineState(newLineState))
}

const storeKeydownRate = (): RootThunkAction => (dispatch, store) => {
    const keyMsInterval = store().typing.keyPerMsInterval
    const lastKeyDown = store().typing.keyLastSeen

    dispatch(setKeyLastSeen(Date.now()))

    if (lastKeyDown !== null) {
        const durationSinceLast = Date.now() - lastKeyDown
        const newInterval = [...keyMsInterval, durationSinceLast]
        return dispatch(setKeyInterval(newInterval))
    }
}

export const initLine = (): RootThunkAction => {
    return (dispatch) => {
        dispatch(setLineIdx(0))
        dispatch(loadNextLine(generateRandomLineState(10)))
        dispatch(loadNextLine(generateRandomLineState(10)))
    }
}

export const nextLine = (): RootThunkAction => (dispatch, store) => {
    const lineIdx = store().typing.currentLineIdx
    dispatch(setLineIdx(lineIdx + 1))

    dispatch(loadNextLine(generateRandomLineState(10)))
}

const previousWord = (): RootThunkAction => (dispatch, store) => {
    const currentWordIdx = store().typing.currentWordIdx

    if (currentWordIdx === 0) return

    const previousWordState = new WordState(
        store().typing.lineStateCurrent[currentWordIdx - 1]
    )
    const previousWord = previousWordState.getTypedWord()

    dispatch(updateWordState('', currentWordIdx)) // clear current word

    dispatch(setCurrentWordIdx(currentWordIdx - 1))
    dispatch(setInputWord(previousWord))
    dispatch(updateWordState(previousWord, currentWordIdx - 1))
}

const updateWordStats = (): RootThunkAction => (dispatch, store) => {
    const currentWordIdx = store().typing.currentWordIdx
    const currentWord = store().typing.lineStateCurrent[currentWordIdx]
        .correctWord
    const currentWordInput = store().typing.currentWordInput
    const wordInterval = store().typing.wordsPerMsInterval
    const wordLastSeen = store().typing.wordLastSeen

    if (wordLastSeen === null) {
        dispatch(setWordLastSeen(Date.now()))
        return
    }

    const timeSinceLast = Date.now() - wordLastSeen
    dispatch(setWordLastSeen(Date.now()))

    const newInterval: IWordInterval = {
        isWordCorrect: currentWord === currentWordInput,
        msSinceLast: timeSinceLast,
        word: currentWord,
        wordIdx: currentWordIdx,
    }

    dispatch(setWordInterval([...wordInterval, newInterval]))
}

const nextWord = (): RootThunkAction => (dispatch, store) => {
    const currentWordIdx = store().typing.currentWordIdx
    const currentLineLength = store().typing.lineStateCurrent.length
    const currentWordInput = store().typing.currentWordInput

    dispatch(updateWordStats())

    if (currentWordIdx >= currentLineLength - 1) {
        // reached end of line
        dispatch(nextLine())
    } else {
        dispatch(updateWordState(currentWordInput, currentWordIdx, true))
        dispatch(setInputWord(''))
        dispatch(setCurrentWordIdx(currentWordIdx + 1))
    }
}
