import React, { useEffect, useRef } from 'react'
import { createStyles, makeStyles, Typography } from '@material-ui/core'
import { useSelectorAppState } from '../../store/mainStore'

const styles = makeStyles((theme) =>
    createStyles({
        textDisplay: {
            height: '30vh',
            width: '100%',
            borderColor: theme.palette.common.black,
            borderRadius: theme.shape.borderRadius,
            borderStyle: 'solid',
            padding: theme.spacing(1),
            overflowY: 'scroll',
        },
    })
)


// This component is not complete
// Purpose -  allow the user to see more of the text that has been typed

export const TypingTypedLinesDisplay = () => {
    const classes = styles()
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
        <div className={classes.textDisplay}>
            {textDisplay.map((text, index) => {
                return <Typography key={index}>{text}</Typography>
            })}
            pre
            <div ref={textEndRef} />
        </div>
    )
}
