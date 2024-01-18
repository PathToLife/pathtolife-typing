import { Box, Grid, Paper, Typography } from '@mui/material'
import { useSelectorAppState } from '../../store/mainStore'
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { useEffect, useState } from 'react'

export const TypingKpmDisplay = () => {
    const kpmInterval = useSelectorAppState((s) => s.typing.keyPerMsInterval)

    const [data, setData] = useState<any[]>([])

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
            <Box p={3}>
                <Grid container direction="column" alignItems="center">
                    <Grid item xs={3}>
                        <Typography variant={'h5'}>KPM</Typography>
                    </Grid>
                </Grid>
                <ResponsiveContainer width={'100%'} height={150}>
                    <LineChart
                        data={data}
                        margin={{
                            bottom: 10,
                            left: 20,
                            top: 20,
                            right: 50,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="time"
                            name="key"
                            unit="ms"
                            type="number"
                        />
                        <YAxis dataKey="kpm" name="time" unit="kpm" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="kpm"
                            stroke="#8884d8"
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    )
}
