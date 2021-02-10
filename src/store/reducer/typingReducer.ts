import {
    SET_CURRENT_WORD_IDX,
    SET_INPUT_WORD,
    SET_KEY_LAST_SEEN,
    TypingActions,
} from '../actions/typingActions'

export interface ITypingStats {
    timeRemainingMS: number

    correctWordsCount: number
    incorrectWordsCount: number

    wordsPerMinuteAvg: number // wpm correct words
    wordsPerMsInterval: number[] // wpm graph

    keyPerMsInterval: number[] // kpm graph
    keyLastSeen: number | null
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
    wordsPerMsInterval: [],
    keyPerMsInterval: [],
    keyLastSeen: null,
}

export const typingReducer = (
    state: ITypingState = initialState,
    action: TypingActions
) => {
    switch (action.type) {
        case SET_CURRENT_WORD_IDX:
            state.currentWordIdx = action.payload
            break
        case SET_INPUT_WORD:
            state.currentWordInput = action.payload
            break
        case SET_KEY_LAST_SEEN:
            state.keyLastSeen = action.payload
            break
        default:
    }

    return state
}
