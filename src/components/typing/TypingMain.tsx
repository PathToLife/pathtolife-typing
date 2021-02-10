import { createStyles, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useReducer, useRef, useState } from 'react'

import { TypingCurrentWordsDisplay } from './TypingCurrentWordsDisplay'
import { ILetterState, IWordState } from './TypingInterfaces'
import { TypingInput } from './TypingInput'
import { useSelectorAppState } from '../../store/mainStore'

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
    })
)

export const TypingMain: React.FC = () => {
    const classes = styles()

    const textEndRef = useRef<HTMLDivElement>(null)

    const textDisplay = useSelectorAppState((s) => s.typing.typedLines)

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

    useEffect(() => {
        const scrollToBottom = () => {
            if (!textEndRef || !textEndRef.current) return
            textEndRef.current.scrollIntoView(true)
        }

        const t = setTimeout(() => {
            scrollToBottom()
        }, 100) // needs delay before the new line is rendered

        return () => {
            clearTimeout(t)
        }
    }, [textDisplay])

    return (
        <Grid container className={classes.rootContainer} spacing={2}>
            <Grid item container justify="center" xs={12}>
                <div className={classes.textDisplay}>
                    {textDisplay.map((text, index) => {
                        return <Typography key={index}>{text}</Typography>
                    })}
                    pre
                    <div ref={textEndRef} />
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
                <TypingInput />
            </Grid>
        </Grid>
    )
}
