

export type TLetterStatus = 'correct' | 'incorrect' | 'pending'

export interface ILetterDisplay {
    letter: string
    status: TLetterStatus
}

export interface IWordDisplay {
    word: string
    letters: ILetterDisplay[]
}