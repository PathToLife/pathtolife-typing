import { TLetterStatus, WordState } from './wordHelpers'

const makeWord = (word = 'someWord') => {
    return new WordState({
        correctWord: word,
    })
}

test('typing get initial word correct', () => {
    const testWord = 'someWord'
    const word = makeWord(testWord)
    expect(word.getTypedWord()).toBe('')
})

test('typing get typed word correct', () => {
    const testWord = 'someWord'
    const word = makeWord(testWord)
    word.generateLetterState(testWord)
    expect(word.getTypedWord()).toBe(testWord)
    expect(word.isCorrect()).toBe(true)
})

test('typing incorrect missing words detection', () => {
    const testWord = 'someWord'
    const typedWord = 'someWo'
    const word = makeWord(testWord)
    word.setTypedWord(typedWord, true)
    expect(word.isCorrect()).toBe(false)
    expect(word.getTypedWord()).toBe(typedWord)
    expect(word.letterStates[6].status).toBe<TLetterStatus>(
        'incorrect-missing-letter'
    )
    expect(word.letterStates[7].status).toBe<TLetterStatus>(
        'incorrect-missing-letter'
    )
})

test('typing pending words detection', () => {
    const testWord = 'someWord'
    const typedWord = 'someWo'
    const word = makeWord(testWord)
    word.setTypedWord(typedWord, false)
    expect(word.isCorrect()).toBe(false)
    expect(word.getTypedWord()).toBe(typedWord)
    expect(word.letterStates[6].status).toBe<TLetterStatus>('pending')
    expect(word.letterStates[7].status).toBe<TLetterStatus>('pending')
})

test('typing extra word detection', () => {
    const testWord = 'something'
    const typedWord = 'somethingExtra'
    const word = makeWord(testWord)

    word.setTypedWord(typedWord)
    expect(word.getTypedWord()).toBe(typedWord)
    expect(word.isCorrect()).toBe(false)
    for (let i = testWord.length; i < typedWord.length; i++) {
        expect(word.letterStates[i].status).toBe<TLetterStatus>(
            'incorrect-extra-letter'
        )
    }
})
