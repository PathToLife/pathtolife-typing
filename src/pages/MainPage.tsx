import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'

import { TypingMain } from '../components/typing/TypingMain'
import { VERSION } from '../constants'

export const MainPage: React.FC = () => {
    return (
        <Container sx={(theme) => ({ paddingTop: theme.spacing(5) })}>
            <Grid container spacing={2} justifyContent={'center'}>
                <Grid item container xs={12} alignItems={'flex-end'}>
                    <Box fontStyle={'italic'}>
                        <Typography display={'inline'} variant={'h4'}>
                            PathToLife
                        </Typography>
                    </Box>
                    <Typography
                        display={'inline'}
                        variant={'h4'}
                        sx={(theme) => ({ paddingLeft: theme.spacing(1) })}
                    >
                        Typing
                    </Typography>
                    <Typography
                        display={'inline'}
                        variant={'subtitle1'}
                        sx={(theme) => ({ paddingLeft: theme.spacing(1) })}
                    >
                        v{VERSION}
                    </Typography>
                </Grid>
                <Grid
                    item
                    justifyContent={'center'}
                    xs={12}
                    sx={(theme) => ({
                        width: '100%',
                        [theme.breakpoints.up('md')]: {
                            width: '65%',
                        },
                    })}
                >
                    <TypingMain />
                </Grid>
            </Grid>
        </Container>
    )
}
