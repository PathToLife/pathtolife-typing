import { Grid } from '@mui/material'
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

export const TypingMain: React.FC = () => {
    const dispatch = useThunkDispatch()

    useEffect(() => {
        dispatch(initLine())
    }, [dispatch])

    return (
        <Grid container sx={{ width: '100%' }} spacing={2}>
            <Grid item container justifyContent="center" xs={12}>
                {/* <TypingTypedLinesDisplay /> */}
            </Grid>
            <Grid item container justifyContent="center" xs={12}>
                <TypingLineStatusDisplay />
            </Grid>
            <Grid item container justifyContent="center" xs={12}>
                <TypingInput />
            </Grid>
            <Grid item container justifyContent="center" xs={12}>
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
