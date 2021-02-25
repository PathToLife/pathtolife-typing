// letter status
export type TLetterStatus =
    | 'correct'
    | 'pending'
    | 'incorrect-wrong-letter'
    | 'incorrect-extra-letter'
    | 'incorrect-missing-letter'

// stores status of each letter
export interface ILetterState {
    letter: string
    status: TLetterStatus
}

export interface IWordState {
    word: string
    letterStates: ILetterState[]
}

export class WordState implements IWordState {
    public word
    public letterStates

    constructor(wordState: Partial<IWordState>) {
        this.word = wordState.word || ''
        this.letterStates = wordState.letterStates || ([] as ILetterState[])
    }

    public setAllPending() {
        this.letterStates = [...this.word].map((l) => ({
            letter: l,
            status: 'pending',
        }))
    }

    public setAllIncorrect() {
        this.letterStates = [...this.word].map((l) => ({
            letter: l,
            status: 'incorrect-wrong-letter',
        }))
    }

    public setAllCorrect() {
        this.letterStates = [...this.word].map((l) => ({
            letter: l,
            status: 'correct',
        }))
    }

    public generateLetterState(
        typedWord: string,
        missingLetterStatus: TLetterStatus = 'pending'
    ) {
        if (typedWord.length === 0) {
            this.setAllPending()
            return
        }

        const testWordArray = [...typedWord]
        let newLetterState: ILetterState[] = [...this.word].map((l, i) => {
            if (i >= testWordArray.length)
                return {
                    status: 'pending',
                    letter: l,
                }
            return {
                status:
                    l === testWordArray[i]
                        ? 'correct'
                        : 'incorrect-wrong-letter',
                letter: l,
            }
        })

        const hasMissingLetters = typedWord.length < this.word.length
        const hasExtraLetters = typedWord.length > this.word.length
        if (hasMissingLetters) {
            // not enough words
            const offset = this.word.length - typedWord.length

            for (let i = offset; i < this.word.length; i++) {
                newLetterState[i].status = missingLetterStatus
            }
        } else if (hasExtraLetters) {
            // extra words
            const extraLetters = [...typedWord.slice(this.word.length + 1)]
            extraLetters.forEach((letter) => {
                newLetterState.push({
                    status: 'incorrect-extra-letter',
                    letter: letter,
                })
            })
        }

        this.letterStates = newLetterState
    }

    public getTypedWord(): string {
        return this.letterStates
            .map((letterState) => letterState.letter)
            .join('')
    }

    public isCorrect(): boolean {
        return this.getTypedWord() === this.word
    }

    public clone(): WordState {
        return new WordState({ ...this })
    }
}

export interface IWordInterval {
    msSinceLast: number
    isWordCorrect: boolean
    wordIdx: number
    word: string
}
