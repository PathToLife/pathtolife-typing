import { createStyles, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'

import { TypingCurrentWordsDisplay } from './TypingCurrentWordsDisplay'
import { TypingInput } from './TypingInput'
import { useSelectorAppState, useThunkDispatch } from '../../store/mainStore'
import { TypingKpmDisplay } from './TypingKpmDisplay'
import { setCurrentLine } from '../../store/actions/typingActions'

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

    const dispatch = useThunkDispatch()
    const textEndRef = useRef<HTMLDivElement>(null)
    const textDisplay = useSelectorAppState((s) => s.typing.typedLines)

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

    useEffect(() => {
        dispatch(setCurrentLine('through though thought through'))
    }, [])

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
                        <TypingCurrentWordsDisplay />
                    </Typography>
                </div>
            </Grid>
            <Grid item container justify="center" xs={12}>
                <TypingInput />
            </Grid>
            <Grid item container justify="center" xs={12}>
                <TypingKpmDisplay />
            </Grid>
        </Grid>
    )
}
