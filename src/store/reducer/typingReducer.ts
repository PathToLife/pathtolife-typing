import {TypingActions} from '../actions/typingActions';

export interface ITypingStats {
    timeRemainingMS: number

    correctWordsCount: number
    incorrectWordsCount: number

    wordsPerMinuteAvg: number // wpm correct words

    wordsPerMinuteInterval: number[] // wpm graph
}

export interface ITypingState extends ITypingStats {
    typedLines: string[]
    currentWordIdx: number
    currentWord: string
    currentLine: string
    currentWordInput: string
}

const initialState: ITypingState = {
    typedLines: [],

    currentWordIdx: 0,
    currentWord: '',
    currentLine: '',
    currentWordInput: '',


    correctWordsCount: 0,
    incorrectWordsCount: 0,
    timeRemainingMS: 0,
    wordsPerMinuteAvg: 0,
    wordsPerMinuteInterval: [],
}

export const typingReducer = (state: ITypingState = initialState, action: TypingActions) => {

    switch (action.type) {
        case '':
        default:
    }

    return state
}