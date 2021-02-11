import { createStyles, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'

import { TypingCurrentWordsDisplay } from './TypingCurrentWordsDisplay'
import { TypingInput } from './TypingInput'
import { useThunkDispatch } from '../../store/mainStore'
import { TypingKpmDisplay } from './TypingKpmDisplay'
import { generateNewLine } from '../../store/actions/typingActions'
import { TypingTotalWordsCard, TypingWPMCard } from './TypingCards'
import { TypingTypedLinesDisplay } from './TypingTypedLinesDisplay'

const styles = makeStyles((theme) =>
    createStyles({
        rootContainer: {
            width: '100%',
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

    useEffect(() => {
        dispatch(generateNewLine())
    }, [dispatch])

    return (
        <Grid container className={classes.rootContainer} spacing={2}>
            <Grid item container justify="center" xs={12}>
                <TypingTypedLinesDisplay />
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
            <Grid item container xs={6}>
                <TypingWPMCard />
            </Grid>
            <Grid item container xs={6}>
                <TypingTotalWordsCard />
            </Grid>
        </Grid>
    )
}
