import { createStyles, Grid, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'

import { TypingLineStatusDisplay } from './TypingLineStatusDisplay'
import { TypingInput } from './TypingInput'
import { useThunkDispatch } from '../../store/mainStore'
import { TypingKpmDisplay } from './TypingKpmDisplay'
import { initLine } from '../../store/typing/typingActions'
import {
    TypingLastKeyIntervalCard,
    TypingTotalWordsCard,
    TypingWPMCard,
} from './TypingCards'
// import { TypingTypedLinesDisplay } from './TypingTypedLinesDisplay'

const styles = makeStyles((theme) =>
    createStyles({
        rootContainer: {
            width: '100%',
        },
    })
)

export const TypingMain: React.FC = () => {
    const classes = styles()

    const dispatch = useThunkDispatch()

    useEffect(() => {
        dispatch(initLine())
    }, [dispatch])

    return (
        <Grid container className={classes.rootContainer} spacing={2}>
            <Grid item container justify="center" xs={12}>
                {/* <TypingTypedLinesDisplay /> */}
            </Grid>
            <Grid item container justify="center" xs={12}>
                <TypingLineStatusDisplay />
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
            <Grid item container xs={6}>
                <TypingLastKeyIntervalCard />
            </Grid>
        </Grid>
    )
}
