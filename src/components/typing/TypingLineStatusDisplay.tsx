import { createStyles, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { green, red } from '@material-ui/core/colors'
import clsx from 'clsx'
import { IRootState } from '../../store/mainStore'
import { IWordState, TLineState } from '../../store/typing/wordHelpers'
import { connect } from 'react-redux'

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

const styles2 = makeStyles((theme) =>
    createStyles({
        container: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',

            width: '100%',
            minHeight: theme.spacing(6),

            borderColor: theme.palette.common.black,
            borderRadius: theme.shape.borderRadius,
            borderStyle: 'solid',

            padding: theme.spacing(1),
        },
        flexBreak: {
            width: '100%',
            flexBasis: '100%',
            height: 0,
        },
    })
)

interface TypingLineStatusDisplayProps {
    previousLineState: TLineState
    currentLineState: TLineState
    nextLineState: TLineState
}

const UnconnectedTypingLineStatusDisplay: React.FC<TypingLineStatusDisplayProps> = (
    props
) => {
    const { previousLineState, currentLineState, nextLineState } = props
    const classes = styles2()

    const renderLine = (lineState: TLineState) => {
        if (lineState.length === 0) {
            return <>-</>
        }

        return lineState.map((word, i) => {
            return (
                <>
                    <TypingWordDisplay word={word} key={i} />
                    <span key={`space-${i}`}>&nbsp;</span>
                </>
            )
        })
    }

    return (
        <div className={classes.container}>
            <Typography variant="h6" color={'textSecondary'}>
                {renderLine(previousLineState)}
            </Typography>

            <div className={classes.flexBreak} />

            <Typography variant="h5">{renderLine(currentLineState)}</Typography>

            <div className={classes.flexBreak} />

            <Typography variant="h6" color={'textSecondary'}>
                {renderLine(nextLineState)}
            </Typography>
        </div>
    )
}

export const TypingLineStatusDisplay = connect<
    TypingLineStatusDisplayProps,
    {},
    {},
    IRootState
>((s) => {
    return {
        previousLineState: s.typing.lineStatePrevious,
        currentLineState: s.typing.lineStateCurrent,
        nextLineState: s.typing.lineStateNext,
    }
})(UnconnectedTypingLineStatusDisplay)
