import {makeAction, RootThunkAction} from './actionFactory';

export const SET_CURRENT_WORD_IDX = 'SET_CURRENT_WORD_IDX'
export const setCurrentWordIdx = (idx: number) => makeAction(SET_CURRENT_WORD_IDX, idx)

export const newCharacter = (): ThunkTypingAction => {
    return () => {

    }
}

export const onKeyDownTyping = (key: string): ThunkTypingAction => {
    return () => {

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
    return () => {

    }

}

export const previousWord = (): ThunkTypingAction => {
    return () => {

    }
}

const nextWord = (): ThunkTypingAction => {
    return () => {

    }
}

const submitText = (): ThunkTypingAction => {
    return () => {

    }
}

export type TypingActions = ReturnType<typeof setCurrentWordIdx>
export type ThunkTypingAction<TReturn = void> = RootThunkAction<TReturn, TypingActions>