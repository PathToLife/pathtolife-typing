import { makeAction, RootThunkAction } from './actionFactory'

export const SET_CURRENT_WORD_IDX = 'SET_CURRENT_WORD_IDX'
export const setCurrentWordIdx = (idx: number) =>
    makeAction<typeof SET_CURRENT_WORD_IDX, number>(SET_CURRENT_WORD_IDX, idx)

export const SET_INPUT_WORD = 'SET_INPUT_WORD'
export const setInputWord = (word: string) =>
    makeAction<typeof SET_INPUT_WORD, string>(SET_INPUT_WORD, word)

export const SET_KEY_LAST_SEEN = 'SET_KEY_LAST_SEEN'
export const setKeyLastSeen = (unix: number) =>
    makeAction<typeof SET_KEY_LAST_SEEN, number>(SET_KEY_LAST_SEEN, unix)

export const onKeyDownTyping = (key: string): ThunkTypingAction => {
    return (dispatch, store) => {
        const currentWord = store().typing.currentWordInput

        if (key.length === 1) {
            if (key === ' ') {
                // space
                return dispatch(nextWord())
            } else {
                return dispatch(setInputWord(currentWord + key))
            }
        }

        if (key === 'Enter') {
            return dispatch(nextWord())
        } else if (key === 'Backspace') {
            return dispatch(setInputWord(currentWord.slice(0, -1)))
        }

        console.log(key)
    }
}

const storeKeydownRate = (): ThunkTypingAction => {
    return (dispatch, store) => {
        const keyMsInterval = store().typing.keyPerMsInterval
        const lastKeyDown = store().typing.keyLastSeen

        if (lastKeyDown === null) {
            return dispatch(setKeyLastSeen(Date.now()))
        }
    }
}

const shuffleWords = (oldWords: string): string => {
    let newWords = ''
    const wordList = oldWords.split(' ')
    do {
        let words = [...wordList]
        let newWordsList = []
        while (words.length) {
            const idx = Math.floor(Math.random() * words.length)
            const selectedWord = words.splice(idx, 1)[0]
            newWordsList.push(selectedWord)
        }
        newWords = newWordsList.join(' ')
    } while (newWords === oldWords)
    return newWords
}

const nextLine = (): ThunkTypingAction => {
    return () => {}
}

export const previousWord = (): ThunkTypingAction => {
    return (dispatch) => {
        dispatch(setInputWord(''))
    }
}

const nextWord = (): ThunkTypingAction => {
    return (dispatch) => {
        dispatch(setInputWord(''))
    }
}

const submitText = (): ThunkTypingAction => {
    return () => {}
}

export type TypingActions =
    | ReturnType<typeof setCurrentWordIdx>
    | ReturnType<typeof setInputWord>
    | ReturnType<typeof setKeyLastSeen>

export type ThunkTypingAction<TReturn = void> = RootThunkAction<
    TReturn,
    TypingActions
>
