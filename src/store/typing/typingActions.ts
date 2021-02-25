import React from 'react'
import { RootThunkAction } from '../actionFactory'
import { ILetterState, IWordInterval, IWordState } from './typingReducer'
import { top200Words } from '../store/wordList'
import { createAction } from '@reduxjs/toolkit'

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

export const setCurrentLineWordsTyped = createAction<string[]>(
    'currentLine/wordsTyped/set'
)

export const setCurrentLineState = createAction<IWordState[]>('currentLine/set')

export const setCurrentLine = (line: string | string[]): RootThunkAction => (
    dispatch
) => {
    let words: string[]
    if (Array.isArray(line)) {
        words = line
    } else {
        words = line.split(' ')
    }
    const wordState: IWordState[] = words.map((word) => {
        const letters: ILetterState[] = [...word].map((letter) => {
            return {
                letter,
                status: 'pending',
            }
        })
        return {
            word,
            letters,
        }
    })
    dispatch(setCurrentLineState(wordState))
}

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
    word: string,
    currentWordIdx: number,
    isSubmit: boolean = false
): RootThunkAction => (dispatch, store) => {
    const newLineState = [...store().typing.currentLineState]
    const currentWordState = newLineState[currentWordIdx]
    const correctWord = currentWordState.word
    const testWord = word.trim()

    let newLetterState: ILetterState[]

    const setAllPending = (word: string): ILetterState[] =>
        [...word].map((l) => ({
            letter: l,
            status: 'pending',
        }))
    const setAllIncorrect = (word: string): ILetterState[] =>
        [...word].map((l) => ({
            letter: l,
            status: 'incorrect',
        }))
    const setAllCorrect = (word: string): ILetterState[] =>
        [...word].map((l) => ({
            letter: l,
            status: 'correct',
        }))

    if (isSubmit) {
        if (correctWord !== testWord) {
            newLetterState = setAllIncorrect(correctWord)
        } else {
            newLetterState = setAllCorrect(correctWord)
        }
    } else if (testWord.length === 0) {
        // set all to pending
        newLetterState = setAllPending(correctWord)
    } else if (testWord.length <= correctWord.length) {
        const testWordArray = [...testWord]
        newLetterState = [...correctWord].map((l, i) => {
            if (i >= testWordArray.length)
                return {
                    status: 'pending',
                    letter: l,
                }
            return {
                status: l === testWordArray[i] ? 'correct' : 'incorrect',
                letter: l,
            }
        })
    } else {
        newLetterState = setAllIncorrect(correctWord)
    }

    newLineState[currentWordIdx] = {
        word: currentWordState.word,
        letters: newLetterState,
    }

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

const generateRandomSentence = (
    numWords: number,
    wordList: string[] = top200Words
): string[] => {
    const outList = [] as string[]

    for (let i = 0; i < numWords; i++) {
        const idx = Math.floor(Math.random() * wordList.length)
        outList.push(wordList[idx])
    }

    return outList
}

export const generateNewLine = (numWords = 10): RootThunkAction => (
    dispatch
) => {
    dispatch(setCurrentWordIdx(0))
    dispatch(setInputWord(''))
    dispatch(setCurrentLine(generateRandomSentence(numWords)))
    dispatch(setCurrentLineWordsTyped([]))
}

export const nextLine = (): RootThunkAction => (dispatch, store) => {
    const lineIdx = store().typing.currentLineIdx
    dispatch(setLineIdx(lineIdx + 1))
    dispatch(generateNewLine())
}

const previousWord = (): RootThunkAction => (dispatch, store) => {
    const currentWordIdx = store().typing.currentWordIdx
    const wordsTyped = store().typing.currentLineWordsTyped

    if (currentWordIdx === 0) return

    const previousWord = wordsTyped[currentWordIdx - 1]

    dispatch(updateWordState('', currentWordIdx)) // clear current word

    dispatch(setCurrentLineWordsTyped(wordsTyped.slice(0, -1)))
    dispatch(setCurrentWordIdx(currentWordIdx - 1))
    dispatch(setInputWord(previousWord))
    dispatch(updateWordState(previousWord, currentWordIdx - 1))
}

const updateWordStats = (): RootThunkAction => (dispatch, store) => {
    const currentWordIdx = store().typing.currentWordIdx
    const currentWord = store().typing.currentLineState[currentWordIdx].word
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
    const currentLineLength = store().typing.currentLineState.length
    const currentWordInput = store().typing.currentWordInput
    const wordsTyped = store().typing.currentLineWordsTyped

    dispatch(updateWordStats())

    if (currentWordIdx >= currentLineLength - 1) {
        // reached end of line
        dispatch(nextLine())
    } else {
        dispatch(updateWordState(currentWordInput, currentWordIdx, true))
        dispatch(setInputWord(''))
        dispatch(setCurrentLineWordsTyped([...wordsTyped, currentWordInput]))
        dispatch(setCurrentWordIdx(currentWordIdx + 1))
    }
}