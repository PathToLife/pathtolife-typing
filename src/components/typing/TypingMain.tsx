import {
    Box,
    TextField,
    Grid,
    makeStyles,
    createStyles,
    Typography,
} from '@material-ui/core'
import React, { useRef, useState } from 'react'
import clsx from 'clsx'
import { TypingCurrentWordsDisplay } from './TypingCurrentWordsDisplay'

const styles = makeStyles((theme) =>
    createStyles({
        rootContainer: {
            width: '100%',
        },
        textDisplay: {
            height: '30vh',
            width: '100%',
            borderColor: theme.palette.common.black,
            borderRadius: theme.shape.borderRadius,
            borderStyle: 'solid',
            padding: theme.spacing(1),
            overflowY: 'scroll',
        },
        textInput: {
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
        },
        textInputContainer: {
            transition: 'background-color 0.2s linear',
        },
        currentTargetTextDisplay: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            width: '100%',
            height: theme.spacing(6),
            borderColor: theme.palette.common.black,
            borderRadius: theme.shape.borderRadius,
            borderStyle: 'solid',
        },
        greenColor: {
            backgroundColor: theme.palette.success.light,
            color: theme.palette.success.dark,
        },
        redColor: {
            backgroundColor: theme.palette.error.light,
            color: theme.palette.error.dark,
        },
    })
)

export const TypingMain: React.FC = () => {
    const classes = styles()

    const textEndRef = useRef<HTMLDivElement>(null)

    const [textInput, setTextInput] = useState('')
    const [targetLine, setTargetLine] = useState(
        'through though thought through'
    )
    const [textDisplay, setTextDisplay] = useState<string[]>([])

    const [greenEnabled, setGreenEnabled] = useState(false)
    const [redEnabled, setRedEnabled] = useState(false)

    const flashGreen = () => {
        setGreenEnabled(true)
        setTimeout(() => {
            setGreenEnabled(false)
        }, 200)
    }

    const flashRed = () => {
        setRedEnabled(true)
        setTimeout(() => {
            setRedEnabled(false)
        }, 200)
    }

    const scrollToBottom = () => {
        if (!textEndRef || !textEndRef.current) return
        textEndRef.current.scrollIntoView()
    }

    const submitText = () => {
        if (textInput.length) {
            setTextDisplay([...textDisplay, textInput])

            if (textInput.trim() === 'green') {
                flashGreen()
            } else {
                flashRed()
            }

            setTextInput('')
            scrollToBottom()
        }
    }

    const handleTextInputKeyChange = (value: string) => {
        switch (value) {
            case 'Enter':
                submitText()
                break
            case ' ':
                submitText()
                break
            default:
        }
    }

    return (
        <Grid container className={classes.rootContainer} spacing={2}>
            <Grid item container justify="center" xs={12}>
                <div className={classes.textDisplay}>
                    {textDisplay.map((text, index) => {
                        return <Typography key={index}>{text}</Typography>
                    })}
                    <div ref={textEndRef} />
                </div>
            </Grid>
            <Grid item container justify="center" xs={12}>
                <div className={classes.currentTargetTextDisplay}>
                    <Typography variant="h5">{targetLine}</Typography>
                </div>
            </Grid>
            <Grid item container justify="center" xs={12}>
                <div className={classes.currentTargetTextDisplay}>
                    <Typography variant="h5">
                        <TypingCurrentWordsDisplay
                            words={[
                                {
                                    letters: [
                                        {
                                            letter: 't',
                                            status: 'correct',
                                        },
                                        {
                                            letter: 'h',
                                            status: 'correct',
                                        },
                                        {
                                            letter: 'r',
                                            status: 'correct',
                                        },
                                        {
                                            letter: 'o',
                                            status: 'correct',
                                        },
                                        {
                                            letter: 'u',
                                            status: 'correct',
                                        },
                                        {
                                            letter: 'g',
                                            status: 'incorrect',
                                        },
                                        {
                                            letter: 'h',
                                            status: 'pending',
                                        },
                                    ],
                                    word: 'through',
                                },
                                {
                                    letters: [
                                        {
                                            letter: 't',
                                            status: 'correct',
                                        },
                                        {
                                            letter: 'h',
                                            status: 'correct',
                                        },
                                        {
                                            letter: 'r',
                                            status: 'correct',
                                        },
                                        {
                                            letter: 'o',
                                            status: 'correct',
                                        },
                                        {
                                            letter: 'u',
                                            status: 'correct',
                                        },
                                        {
                                            letter: 'g',
                                            status: 'incorrect',
                                        },
                                        {
                                            letter: 'h',
                                            status: 'pending',
                                        },
                                    ],
                                    word: 'through',
                                }
                            ]}
                        />
                    </Typography>
                </div>
            </Grid>
            <Grid item container justify="center" xs={12}>
                <TextField
                    autoFocus
                    placeholder="type here"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                        classes: {
                            input: classes.textInput,
                        },
                    }}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onKeyDown={(e) => handleTextInputKeyChange(e.key)}
                    className={clsx(
                        classes.textInputContainer,
                        greenEnabled && classes.greenColor,
                        redEnabled && classes.redColor
                    )}
                />
            </Grid>
        </Grid>
    )
}
