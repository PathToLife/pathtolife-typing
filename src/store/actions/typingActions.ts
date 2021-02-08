import {makeAction, RootThunkAction} from './actionFactory';

export const SET_CURRENT_WORD_IDX = 'SET_CURRENT_WORD_IDX'
export const setCurrentWordIdx = (idx: number) => makeAction(SET_CURRENT_WORD_IDX, idx)


type TActions = typeof SET_CURRENT_WORD_IDX
type ThunkTypingAction<TReturn = void> = RootThunkAction<TReturn, TActions>

export const newCharacter = (): ThunkTypingAction => {
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
    return (dispatch) => {
        dispatch(setCurrentWordIdx(0))
        setTargetLine(shuffleWords(targetLine))
    }

}

export const previousWord = (): ThunkTypingAction => {
    return () => {

    }
}

const nextWord = (): ThunkTypingAction => {
    return (dispatch, state) => {
        const newWordIdx = state().typing.currentWordIdx + 1
        const currentWordsState = state().typing.currentWord
        if (newWordIdx >= currentWordsState.length) {
            dispatch(nextLine())
        } else {
            dispatch(setCurrentWordIdx(newWordIdx))
        }
    }
}

const submitText = () => {
    if (textInput.length && currentWordIdx < currentWordsState.length) {
        setTextDisplay([...textDisplay, textInput])

        const currentWord = currentWordsState[currentWordIdx].word
        const textCorrect = textInput.trim() === currentWord

        if (textCorrect) {
            flashGreen()
        } else {
            flashRed()
        }

        setTextInput('')
        nextWord()

    }
}