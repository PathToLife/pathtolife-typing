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

interface TypingKpmLineChartProps {
    data: {
        time: number
        kpm: number
    }[]
}

const TypingKpmLineChart: React.FC<TypingKpmLineChartProps> = ({ data }) => {
    return (
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
                <XAxis dataKey="time" name="key" unit="ms" type="number" />
                <YAxis dataKey="kpm" name="time" unit="kpm" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Line
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="kpm"
                    stroke="#8884d8"
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default TypingKpmLineChart
