

export type TLetterStatus = 'correct' | 'incorrect' | 'pending'

export interface ILetterState {
    letter: string
    status: TLetterStatus
}

export interface IWordState {
    word: string
    letters: ILetterState[]
}