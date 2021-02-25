import { createStyles, makeStyles } from '@material-ui/core'
import React from 'react'
import { green, red } from '@material-ui/core/colors'
import clsx from 'clsx'
import { useSelectorAppState } from '../../store/mainStore'
import { IWordState } from '../../store/typing/wordHelpers'

const styles = makeStyles((theme) =>
    createStyles({
        correctLetter: {
            color: green[500],
        },
        incorrectLetter: {
            color: red[500],
        },
        incorrectExtraLetter: {
            color: red[500],
            textDecoration: 'line-through',
        },
        incorrectMissingLetter: {
            color: red[500],
            textDecoration: 'underline',
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
            {word.letterStates.map((letter, index) => {
                return (
                    <span
                        key={index}
                        className={clsx(
                            letter.status === 'correct' &&
                                classes.correctLetter,
                            letter.status === 'incorrect-wrong-letter' &&
                                classes.incorrectLetter,
                            letter.status === 'incorrect-missing-letter' &&
                                classes.incorrectMissingLetter,
                            letter.status === 'incorrect-extra-letter' &&
                                classes.incorrectExtraLetter
                        )}
                    >
                        {letter.letter}
                    </span>
                )
            })}
        </>
    )
}

export const TypingCurrentWordsDisplay = () => {
    const words = useSelectorAppState((s) => s.typing.currentLineState)

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
