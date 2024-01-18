import React from 'react'
import {
    Box,
    createStyles,
    Grid,
    makeStyles,
    Paper,
    Typography,
} from '@mui/material'
import { useSelectorAppState } from '../../store/mainStore'

const styles = makeStyles(() =>
    createStyles({
        fullWidth: {
            width: '100%',
        },
    }),
)

interface TypingCardProps {
    title: string
    value: any
}

export const TypingCard = (props: TypingCardProps) => {
    const classes = styles()

    return (
        <Paper>
            <Box p={3} className={classes.fullWidth}>
                <Grid
                    container
                    alignItems={'center'}
                    direction={'column'}
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <Typography variant={'h5'}>{props.title}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'h4'}>{props.value}</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}

export const TypingWPMCard = () => {
    const wpm = useSelectorAppState((s) => s.typing.wordsPerMinuteAvgAdjusted)

    return <TypingCard title={'WPM Adjusted'} value={wpm} />
}

export const TypingTotalWordsCard = () => {
    const totalWordsTyped = useSelectorAppState(
        (s) => s.typing.wordsPerMsInterval,
    ).filter((word) => word.isWordCorrect).length
    return <TypingCard title={'Total Words'} value={totalWordsTyped} />
}

export const TypingLastKeyIntervalCard = () => {
    const lastKeyInterval = useSelectorAppState((s) =>
        s.typing.keyPerMsInterval.slice(-1),
    )
    return (
        <TypingCard
            title={'Last Key MS'}
            value={`${lastKeyInterval || 0} ms`}
        />
    )
}
