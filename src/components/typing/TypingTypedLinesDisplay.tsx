import { useEffect, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import { useSelectorAppState } from '../../store/mainStore'

// This component is not complete
// Purpose -  allow the user to see more of the text that has been typed

export const TypingTypedLinesDisplay = () => {
    const textEndRef = useRef<HTMLDivElement>(null)

    const textDisplay = useSelectorAppState((s) => s.typing.typedLines)

    useEffect(() => {
        const scrollToBottom = () => {
            if (!textEndRef || !textEndRef.current) return
            textEndRef.current.scrollIntoView(true)
        }

        const t = setTimeout(() => {
            scrollToBottom()
        }, 100) // needs delay before the new line is rendered

        return () => {
            clearTimeout(t)
        }
    }, [textDisplay])

    return (
        <Box
            sx={(theme) => ({
                height: '30vh',
                width: '100%',
                borderColor: theme.palette.common.black,
                borderRadius: theme.shape.borderRadius,
                borderStyle: 'solid',
                padding: theme.spacing(1),
                overflowY: 'scroll',
            })}
        >
            {textDisplay.map((text, index) => {
                return <Typography key={index}>{text}</Typography>
            })}
            pre
            <div ref={textEndRef} />
        </Box>
    )
}
