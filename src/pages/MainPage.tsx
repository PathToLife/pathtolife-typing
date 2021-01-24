import {
    Container,
    Grid,
    Typography,
    makeStyles,
    createStyles,
} from '@material-ui/core'
import React from 'react'

import { TypingMain } from '../components/typing/TypingMain'

const styles = makeStyles((theme) =>
    createStyles({
        mainContainer: {
            paddingTop: theme.spacing(5),
            display: 'flex',
        },
        typingContainer: {
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '65%',
            },
        },
    })
)

export const MainPage: React.FC = () => {
    const classes = styles()

    return (
        <Container className={classes.mainContainer}>
            <Grid container spacing={2} justify="center">
                <Grid item container justify="center" xs={12}>
                    <Typography variant={'h3'}>PathToLife Typing</Typography>
                </Grid>
                <Grid item container justify="center" xs={12}>
                    <div className={classes.typingContainer}>
                        <TypingMain />
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}
