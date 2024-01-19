import { Box, Paper, Typography } from '@mui/material'
import { useSelectorAppState } from '../../store/mainStore'

import { useEffect, useState } from 'react'
import TypingKpmLineChart from './TypingKpmLineChart'

export const TypingKpmDisplay = () => {
    const kpmInterval = useSelectorAppState((s) => s.typing.keyPerMsInterval)

    const [data, setData] = useState<
        {
            time: number
            kpm: number
        }[]
    >([])

    useEffect(() => {
        const renderTimeout = setTimeout(() => {
            let currentTime = 0
            const newData = kpmInterval.map((val) => {
                currentTime += val
                return {
                    time: currentTime,
                    kpm: 64000 / val,
                }
            })
            setData(newData)
        }, 300)

        return () => {
            clearTimeout(renderTimeout)
        }
    }, [kpmInterval])

    return (
        <Paper>
            <Box p={3} display={'flex'} justifyContent={'center'}>
                <Box>
                    <Typography
                        variant={'h5'}
                        textAlign={'center'}
                        sx={{
                            flexGrow: 1,
                        }}
                    >
                        KPM
                    </Typography>
                </Box>
                <TypingKpmLineChart data={data} />
            </Box>
        </Paper>
    )
}
