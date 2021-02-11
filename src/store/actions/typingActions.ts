import React from 'react'
import { makeAction, RootThunkAction } from './actionFactory'
import { ILetterState, IWordState } from '../reducer/typingReducer'

export const SET_CURRENT_WORD_IDX = 'SET_CURRENT_WORD_IDX'
export const setCurrentWordIdx = (idx: number) =>
    makeAction<typeof SET_CURRENT_WORD_IDX, number>(SET_CURRENT_WORD_IDX, idx)

export const SET_INPUT_WORD = 'SET_INPUT_WORD'
export const setInputWord = (word: string) =>
    makeAction<typeof SET_INPUT_WORD, string>(SET_INPUT_WORD, word)

export const SET_KEY_LAST_SEEN = 'SET_KEY_LAST_SEEN'
export const setKeyLastSeen = (unix: number | null) =>
    makeAction<typeof SET_KEY_LAST_SEEN, number | null>(SET_KEY_LAST_SEEN, unix)

export const SET_KEY_INTERVAL = 'SET_KEY_INTERVAL'
export const setKeyInterval = (interval: number[]) =>
    makeAction<typeof SET_KEY_INTERVAL, number[]>(SET_KEY_INTERVAL, interval)

export const SET_CURRENT_LINE_STATE = 'SET_CURRENT_LINE_STATE'
export const setCurrentLineState = (state: IWordState[]) =>
    makeAction<typeof SET_CURRENT_LINE_STATE, IWordState[]>(
        SET_CURRENT_LINE_STATE,
        state
    )

export const SET_WORDS_TYPED = 'SET_WORDS_TYPED'
export const setWordsTyped = (words: string[]) =>
    makeAction<typeof SET_WORDS_TYPED, string[]>(SET_WORDS_TYPED, words)

export const SET_LINE_IDX = 'SET_LINE_IDX'
export const setLineIdx = (idx: number) =>
    makeAction<typeof SET_LINE_IDX, number>(SET_LINE_IDX, idx)

export const setCurrentLine = (line: string): ThunkTypingAction => (
    dispatch
) => {
    const words = line.split(' ')
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

const testSentence = 'through though thought through those throw'

export const TYPING_STATE_RESET = 'TYPING_STATE_RESET'
export const resetTyping = () =>
    makeAction<typeof TYPING_STATE_RESET, undefined>(
        TYPING_STATE_RESET,
        undefined
    )

export const onKeyDownTyping = (
    e: React.KeyboardEvent<HTMLElement>
): ThunkTypingAction => async (dispatch, store) => {
    const currentWord = store().typing.currentWordInput.trim()
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
): ThunkTypingAction => (dispatch, store) => {
    const newLineState = [...store().typing.currentLineState]
    const currentWordState = newLineState[currentWordIdx]
    const correctWord = currentWordState.word
    const testWord = word.trim()

    let newLetterState: ILetterState[] = []

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

const storeKeydownRate = (): ThunkTypingAction => (dispatch, store) => {
    const keyMsInterval = store().typing.keyPerMsInterval
    const lastKeyDown = store().typing.keyLastSeen

    dispatch(setKeyLastSeen(Date.now()))

    if (lastKeyDown !== null) {
        const durationSinceLast = Date.now() - lastKeyDown
        const newInterval = [...keyMsInterval, durationSinceLast]
        return dispatch(setKeyInterval(newInterval))
    }
}

const shuffleSentence = (sentence: string): string => {
    let newWords = ''
    const wordList = sentence.split(' ')
    do {
        let words = [...wordList]
        let newWordsList = []
        while (words.length) {
            const idx = Math.floor(Math.random() * words.length)
            const selectedWord = words.splice(idx, 1)[0]
            newWordsList.push(selectedWord)
        }
        newWords = newWordsList.join(' ')
    } while (newWords === sentence)
    return newWords
}

const nextLine = (): ThunkTypingAction => (dispatch, store) => {
    const lineIdx = store().typing.currentLineIdx
    dispatch(setLineIdx(lineIdx + 1))
    dispatch(setCurrentWordIdx(0))
    dispatch(setInputWord(''))
    dispatch(setCurrentLine(shuffleSentence(testSentence)))
}

const previousWord = (): ThunkTypingAction => (dispatch, store) => {
    const currentWordIdx = store().typing.currentWordIdx
    const wordsTyped = store().typing.currentLineWordsTyped

    if (currentWordIdx === 0) return

    const previousWord = wordsTyped[currentWordIdx - 1]

    dispatch(updateWordState('', currentWordIdx)) // clear current word

    dispatch(setWordsTyped(wordsTyped.slice(0, -1)))
    dispatch(setCurrentWordIdx(currentWordIdx - 1))
    dispatch(setInputWord(previousWord))
    dispatch(updateWordState(previousWord, currentWordIdx - 1))
}

const nextWord = (): ThunkTypingAction => (dispatch, store) => {
    const currentWordIdx = store().typing.currentWordIdx
    const currentLineLength = store().typing.currentLineState.length
    const currentWordInput = store().typing.currentWordInput
    const wordsTyped = store().typing.currentLineWordsTyped

    if (currentWordIdx >= currentLineLength - 1) {
        dispatch(nextLine())
    } else {
        dispatch(updateWordState(currentWordInput, currentWordIdx, true))
        dispatch(setInputWord(''))
        dispatch(setWordsTyped([...wordsTyped, currentWordInput]))
        dispatch(setCurrentWordIdx(currentWordIdx + 1))
    }
}

export type TypingActions =
    | ReturnType<typeof setCurrentWordIdx>
    | ReturnType<typeof setInputWord>
    | ReturnType<typeof setKeyLastSeen>
    | ReturnType<typeof setKeyInterval>
    | ReturnType<typeof setCurrentLineState>
    | ReturnType<typeof setWordsTyped>
    | ReturnType<typeof setLineIdx>
    | ReturnType<typeof resetTyping>

export type ThunkTypingAction<TReturn = void> = RootThunkAction<
    TReturn,
    TypingActions
>
