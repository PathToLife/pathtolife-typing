import {
    SET_CURRENT_LINE_STATE,
    SET_CURRENT_WORD_IDX,
    SET_INPUT_WORD,
    SET_KEY_INTERVAL,
    SET_KEY_LAST_SEEN,
    SET_WORDS_TYPED,
    TYPING_STATE_RESET,
    TypingActions,
} from '../actions/typingActions'

// letter status
export type TLetterStatus = 'correct' | 'incorrect' | 'pending'

// stores status of each letter
export interface ILetterState {
    letter: string
    status: TLetterStatus
}

export interface IWordState {
    word: string
    letters: ILetterState[]
}

export interface ITypingStats {
    timeRemainingMS: number

    correctWordsCount: number
    incorrectWordsCount: number

    wordsPerMinuteAvg: number // wpm correct words
    wordsPerMsInterval: number[] // wpm graph
    wordLastSeen: number | null

    keyPerMsInterval: number[] // kpm graph
    keyLastSeen: number | null
}

export interface ITypingState extends ITypingStats {
    typedLines: string[]

    currentLineIdx: number
    currentLineState: IWordState[] // the correctness of current line
    currentLineWordsTyped: string[] // the words previously typed
    currentWordIdx: number // the word idx being typed on the current line
    currentWordInput: string // the word currently being typed
}

const initialState: ITypingState = {
    typedLines: [],

    currentLineIdx: 0,
    currentLineState: [],
    currentLineWordsTyped: [],
    currentWordIdx: 0,
    currentWordInput: '',

    correctWordsCount: 0,
    incorrectWordsCount: 0,
    timeRemainingMS: 0,

    wordsPerMinuteAvg: 0,
    wordsPerMsInterval: [],
    wordLastSeen: null,

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
        case SET_KEY_INTERVAL:
            state.keyPerMsInterval = action.payload
            break
        case SET_CURRENT_LINE_STATE:
            state.currentLineState = action.payload
            break
        case SET_WORDS_TYPED:
            state.currentLineWordsTyped = action.payload
            break
        case TYPING_STATE_RESET:
            state = initialState
            break
        default:
    }

    return state
}
