import { WordState } from './wordHelpers'

test('typing get inital word correct', () => {
    const word = new WordState({
        word: 'someWord',
    })
    word.setAllPending()
    expect(word.getTypedWord()).toBe('someWord')
})

test('typing get typed word correct', () => {
    const word = new WordState({
        word: 'someWord',
    })
    word.generateLetterState('someWord')
    expect(word.getTypedWord()).toBe('someWord')
})

test('typing')
