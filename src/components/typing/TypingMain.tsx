import {
    TextField,
    Grid,
    makeStyles,
    createStyles,
    Typography,
} from '@material-ui/core'
import React, { useEffect, useReducer, useRef, useState } from 'react'
import clsx from 'clsx'
import { TypingCurrentWordsDisplay } from './TypingCurrentWordsDisplay'
import { IWordState, ILetterState } from './TypingInterfaces'

const styles = makeStyles((theme) =>
    createStyles({
        rootContainer: {
            width: '100%',
        },
        textDisplay: {
            height: '30vh',
            width: '100%',
            borderColor: theme.palette.common.black,
            borderRadius: theme.shape.borderRadius,
            borderStyle: 'solid',
            padding: theme.spacing(1),
            overflowY: 'scroll',
        },
        textInput: {
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
        },
        textInputContainer: {
            transition: 'background-color 0.2s linear',
        },
        currentTargetTextDisplay: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            width: '100%',
            height: theme.spacing(6),
            borderColor: theme.palette.common.black,
            borderRadius: theme.shape.borderRadius,
            borderStyle: 'solid',
        },
        greenColor: {
            backgroundColor: theme.palette.success.light,
            color: theme.palette.success.dark,
        },
        redColor: {
            backgroundColor: theme.palette.error.light,
            color: theme.palette.error.dark,
        },
    })
)

export const TypingMain: React.FC = () => {
    const classes = styles()

    const textEndRef = useRef<HTMLDivElement>(null)

    const [textInput, setTextInput] = useState('')
    const [textDisplay, setTextDisplay] = useState<string[]>([])
    const [targetLine, setTargetLine] = useState(
        'through though thought through'
    )
    const [currentWordIdx, setCurrentWordIdx] = useState(0)

    interface IWordChange {
        word: string
        wordIdx: number
    }
    interface IWordChangeAction {
        wordChange?: IWordChange
        targetLineChange?: string
    }
    const [currentWordsState, dispatchWordChange] = useReducer(
        (
            previousState: IWordState[],
            action: IWordChangeAction
        ): IWordState[] => {
            console.log(action)

            if (action.wordChange) {
                if (action.wordChange.wordIdx >= previousState.length)
                    return previousState

                const previousWordState =
                    previousState[action.wordChange.wordIdx]
                const typedLetters = [...action.wordChange.word]
                const correctLetters = [...previousWordState.word]

                const newLettersState: ILetterState[] = []
                correctLetters.forEach((letter, index) => {
                    if (index >= typedLetters.length) {
                        newLettersState.push({
                            letter,
                            status: 'pending',
                        })
                        return
                    }

                    const typedLetter = typedLetters[index]
                    const isTypedCorrect = typedLetter === letter
                    newLettersState.push({
                        letter,
                        status: isTypedCorrect ? 'correct' : 'incorrect',
                    })
                })

                previousState[action.wordChange.wordIdx] = {
                    letters: newLettersState,
                    word: previousWordState.word,
                }
                const newState = [...previousState]
                return newState
            } else if (action.targetLineChange) {
                const newWordState: IWordState[] = []
                const wordsList = action.targetLineChange.split(' ')

                wordsList.forEach((word) => {
                    const newLettersState: ILetterState[] = []

                    const letters = [...word]
                    letters.forEach((letter) => {
                        newLettersState.push({
                            letter,
                            status: 'pending',
                        })
                    })

                    newWordState.push({
                        word,
                        letters: newLettersState,
                    })
                })

                return newWordState
            }

            return previousState
        },
        []
    )

    // set initial targetLine temp, will remove later?
    useEffect(() => {
        dispatchWordChange({
            targetLineChange: targetLine,
        })
    }, [targetLine])

    const [greenEnabled, setGreenEnabled] = useState(false)
    const [redEnabled, setRedEnabled] = useState(false)

    const flashGreen = () => {
        setGreenEnabled(true)
        setTimeout(() => {
            setGreenEnabled(false)
        }, 200)
    }

    const flashRed = () => {
        setRedEnabled(true)
        setTimeout(() => {
            setRedEnabled(false)
        }, 200)
    }

    const scrollToBottom = () => {
        if (!textEndRef || !textEndRef.current) return
        textEndRef.current.scrollIntoView(true)
    }

    const shuffleWords = (oldWords: string): string => {
        let newWords = ''
        const wordList = oldWords.split(' ')
        do {
            let words = [...wordList]
            let newWordsList = []
            while (words.length) {
                const idx = Math.floor(Math.random() * words.length)
                const selectedWord = words.splice(idx, 1)[0]
                newWordsList.push(selectedWord)
            }
            newWords = newWordsList.join(' ')
        } while (newWords === oldWords)
        return newWords
    }

    const nextLine = () => {
        setCurrentWordIdx(0)
        setTargetLine(shuffleWords(targetLine))
    }

    const nextWord = () => {
        const newWordIdx = currentWordIdx + 1
        if (newWordIdx === currentWordsState.length) {
            nextLine()
        } else {
            setCurrentWordIdx((previous) => {
                return previous + 1
            })
        }
    }

    const submitText = () => {
        if (textInput.length && currentWordIdx < currentWordsState.length) {
            setTextDisplay([...textDisplay, textInput])

            const currentWord = currentWordsState[currentWordIdx].word
            const textCorrect = textInput.trim() === currentWord
            if (textCorrect) {
                flashGreen()
            } else {
                flashRed()
            }

            setTextInput('')
            nextWord()
            setTimeout(() => {
                scrollToBottom()
            }, 100) // needs delay before the new line is rendered
        }
    }

    const handleTextChange = (text: string) => {
        // const timeTyped = Date.now()

        let word = text.trim()

        dispatchWordChange({
            wordChange: {
                word,
                wordIdx: currentWordIdx,
            },
        })
        setTextInput(word)
    }

    const handleTextInputKeyPress = (pressedKey: string) => {
        switch (pressedKey) {
            case 'Enter':
                submitText()
                break
            case ' ':
                submitText()
                break
            default:
        }
    }

    return (
        <Grid container className={classes.rootContainer} spacing={2}>
            <Grid item container justify="center" xs={12}>
                <div className={classes.textDisplay}>
                    {textDisplay.map((text, index) => {
                        return <Typography key={index}>{text}</Typography>
                    })}
                    <div ref={textEndRef}/>
                </div>
            </Grid>
            <Grid item container justify="center" xs={12}>
                <div className={classes.currentTargetTextDisplay}>
                    <Typography variant="h5">{targetLine}</Typography>
                </div>
            </Grid>
            <Grid item container justify="center" xs={12}>
                <div className={classes.currentTargetTextDisplay}>
                    <Typography variant="h5">
                        <TypingCurrentWordsDisplay words={currentWordsState} />
                    </Typography>
                </div>
            </Grid>
            <Grid item container justify="center" xs={12}>
                <TextField
                    autoFocus
                    placeholder="type here"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                        classes: {
                            input: classes.textInput,
                        },
                    }}
                    value={textInput}
                    onChange={(e) => handleTextChange(e.target.value)}
                    onKeyDown={(e) => handleTextInputKeyPress(e.key)}
                    className={clsx(
                        classes.textInputContainer,
                        greenEnabled && classes.greenColor,
                        redEnabled && classes.redColor
                    )}
                />
            </Grid>
        </Grid>
    )
}
