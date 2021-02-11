import {
    Box,
    Container,
    createStyles,
    Grid,
    makeStyles,
    Typography,
} from '@material-ui/core'
import React from 'react'

import { TypingMain } from '../components/typing/TypingMain'
import { VERSION } from '../constants'

const styles = makeStyles((theme) =>
    createStyles({
        mainContainer: {
            paddingTop: theme.spacing(5),
        },
        typingContainer: {
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '65%',
            },
        },
        subtitle: {
            paddingLeft: theme.spacing(1),
        },
    })
)

export const MainPage: React.FC = () => {
    const classes = styles()

    return (
        <Container className={classes.mainContainer}>
            <Grid container spacing={2} justify="center">
                <Grid item container xs={12} alignItems={'flex-end'}>
                    <Box fontStyle={'italic'}>
                        <Typography display={'inline'} variant={'h4'}>
                            PathToLife
                        </Typography>
                    </Box>
                    <Typography
                        display={'inline'}
                        variant={'h4'}
                        className={classes.subtitle}
                    >
                        Typing
                    </Typography>
                    <Typography
                        display={'inline'}
                        variant={'subtitle1'}
                        className={classes.subtitle}
                    >
                        v{VERSION}
                    </Typography>
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
