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
    correctWord: string
    letterStates: ILetterState[]
}

export class WordState implements IWordState {
    public correctWord
    public letterStates

    constructor(wordState: Partial<IWordState>) {
        this.correctWord = wordState.correctWord || ''
        this.letterStates = wordState.letterStates || ([] as ILetterState[])

        if (this.letterStates.length === 0) {
            this.setAllPending()
        }
    }

    public setAllPending() {
        this.letterStates = [...this.correctWord].map((l) => ({
            letter: l,
            status: 'pending',
        }))
    }

    public setAllIncorrect() {
        this.letterStates = [...this.correctWord].map((l) => ({
            letter: l,
            status: 'incorrect-wrong-letter',
        }))
    }

    public setAllCorrect() {
        this.letterStates = [...this.correctWord].map((l) => ({
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

        let newLetterState: ILetterState[] = [...this.correctWord].map(
            (l, i) => {
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
            }
        )

        const hasMissingLetters = typedWord.length < this.correctWord.length
        const hasExtraLetters = typedWord.length > this.correctWord.length
        if (hasMissingLetters) {
            // not enough words
            const offset = typedWord.length

            for (let i = offset; i < this.correctWord.length; i++) {
                newLetterState[i].status = missingLetterStatus
            }
        } else if (hasExtraLetters) {
            // extra words
            const extraLetters = [...typedWord.slice(this.correctWord.length)]
            extraLetters.forEach((letter) => {
                newLetterState.push({
                    status: 'incorrect-extra-letter',
                    letter: letter,
                })
            })
        }

        this.letterStates = newLetterState
    }

    public setTypedWord(word: string, isSubmit = false) {
        if (isSubmit) {
            this.generateLetterState(word, 'incorrect-missing-letter')
        } else {
            this.generateLetterState(word)
        }
    }

    public getTypedWord(): string {
        const typedStates: TLetterStatus[] = [
            'correct',
            'incorrect-extra-letter',
            'incorrect-wrong-letter',
        ]
        return this.letterStates
            .filter((letter) => typedStates.includes(letter.status))
            .map((letter) => letter.letter)
            .join('')
    }

    public isCorrect(): boolean {
        return (
            this.letterStates.every((letter) => letter.status === 'correct') &&
            this.getTypedWord() === this.correctWord
        )
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
