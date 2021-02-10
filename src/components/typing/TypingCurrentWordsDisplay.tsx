import { createStyles, makeStyles } from '@material-ui/core'
import React from 'react'
import { green, red } from '@material-ui/core/colors'
import clsx from 'clsx'
import { IWordState } from './TypingInterfaces'

const styles = makeStyles((theme) =>
    createStyles({
        correctLetter: {
            color: green[500],
        },
        incorrectLetter: {
            color: red[500],
        },
    })
)

interface TypingWordsDisplayProps {
    word: IWordState
}

export const TypingWordDisplay: React.FC<TypingWordsDisplayProps> = (props) => {
    const { word } = props

    const classes = styles()

    return (
        <>
            {word.letters.map((letter, index) => {
                return (
                    <span
                        key={index}
                        className={clsx(
                            letter.status === 'correct' &&
                                classes.correctLetter,
                            letter.status === 'incorrect' &&
                                classes.incorrectLetter
                        )}
                    >
                        {letter.letter}
                    </span>
                )
            })}
        </>
    )
}

interface TypingCurrentDisplayProps {
    words: IWordState[]
}

export const TypingCurrentWordsDisplay: React.FC<TypingCurrentDisplayProps> = (
    props
) => {
    const { words } = props

    const render = (): JSX.Element[] | null => {
        const wordsJSX = words.map((word, index) => {
            return <TypingWordDisplay word={word} key={index} />
        })

        const withSpaces = wordsJSX.reduce(
            (accu: JSX.Element[] | null, elem, i) => {
                if (accu === null) return [elem]
                return [...accu, <span key={`space-${i}`}> </span>, elem]
            },
            null
        )

        return withSpaces
    }

    return <>{render()}</>
}
