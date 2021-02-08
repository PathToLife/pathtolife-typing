import React, {useState} from 'react'
import clsx from 'clsx';
import {createStyles, makeStyles, TextField} from '@material-ui/core'
import {useSelectorAppState, useThunkDispatch} from '../../store/mainStore';

const styles = makeStyles(theme => createStyles({
    textInput: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    textInputContainer: {
        transition: 'background-color 0.2s linear',
    },
    greenColor: {
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.dark,
    },
    redColor: {
        backgroundColor: theme.palette.error.light,
        color: theme.palette.error.dark,
    },
}))

export const TypingInput: React.FC = () => {
    const classes = styles()

    const [textInput, setTextInput] = useState('')

    const [greenEnabled, setGreenEnabled] = useState(false)
    const [redEnabled, setRedEnabled] = useState(false)

    const dispatch = useThunkDispatch()
    const text = useSelectorAppState(s => s.typing.currentWord)

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



    const handleTextChange = (text: string) => {
        // const timeTyped = Date.now()

        let word = text.trim()

        dispatchWordChange({
            wordChange: {
                word,
                wordIdx: currentWordIdx,
            },
        })
        setTextInput(word)
    }

    const handleTextInputKeyPress = (pressedKey: string) => {
        switch (pressedKey) {
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
            onChange={(e) => handleTextChange(e.target.value)}
            onKeyDown={(e) => handleTextInputKeyPress(e.key)}
            className={clsx(
                classes.textInputContainer,
                greenEnabled && classes.greenColor,
                redEnabled && classes.redColor
            )}
        />
    )
}