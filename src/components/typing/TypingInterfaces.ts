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