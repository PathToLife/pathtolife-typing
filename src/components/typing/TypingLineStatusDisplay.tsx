import React from 'react'
import { Box, Typography } from '@mui/material'
import { green, red } from '@mui/material/colors'
import {
    IWordState,
    TLetterStatus,
    TLineState,
} from '../../store/typing/wordHelpers'
import { connect } from 'react-redux'
import { RootState } from '../../store/mainStore'

function calulateStyle(status: TLetterStatus) {
    switch (status) {
        case 'correct':
            return {
                color: green[500],
            }
        case 'incorrect-wrong-letter':
            return {
                color: red[500],
            }
        case 'incorrect-extra-letter':
            return {
                color: red[500],
                textDecoration: 'line-through',
            }
        case 'incorrect-missing-letter':
            return {
                color: red[500],
                textDecoration: 'underline',
            }
        default:
            return {}
    }
}

interface TypingWordsDisplayProps {
    word: IWordState
}

export const TypingWordDisplay: React.FC<TypingWordsDisplayProps> = (props) => {
    const { word } = props

    return (
        <>
            {word.letterStates.map((letter, index) => {
                return (
                    <span key={index} style={calulateStyle(letter.status)}>
                        {letter.letter}
                    </span>
                )
            })}
        </>
    )
}

const FlexBreak = () => (
    <div
        style={{
            width: '100%',
            flexBasis: '100%',
            height: 0,
        }}
    />
)

interface TypingLineStatusDisplayProps {
    previousLineState: TLineState
    currentLineState: TLineState
    nextLineState: TLineState
}

const UnconnectedTypingLineStatusDisplay: React.FC<
    TypingLineStatusDisplayProps
> = (props) => {
    const { previousLineState, currentLineState, nextLineState } = props

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
        <Box
            sx={(theme) => ({
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',

                width: '100%',
                minHeight: theme.spacing(6),

                borderColor: theme.palette.common.black,
                borderRadius: theme.shape.borderRadius,
                borderStyle: 'solid',

                padding: theme.spacing(1),
            })}
        >
            <Typography variant="h6" color={'textSecondary'}>
                {renderLine(previousLineState)}
            </Typography>

            <FlexBreak />

            <Typography variant="h5">{renderLine(currentLineState)}</Typography>

            <FlexBreak />

            <Typography variant="h6" color={'textSecondary'}>
                {renderLine(nextLineState)}
            </Typography>
        </Box>
    )
}

export const TypingLineStatusDisplay = connect<
    TypingLineStatusDisplayProps,
    {},
    {},
    RootState
>((s) => {
    return {
        previousLineState: s.typing.lineStatePrevious,
        currentLineState: s.typing.lineStateCurrent,
        nextLineState: s.typing.lineStateNext,
    }
})(UnconnectedTypingLineStatusDisplay)
