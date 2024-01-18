import React, { useEffect, useState } from 'react'
import { TextField, Theme } from '@mui/material'
import { useSelectorAppState, useThunkDispatch } from '../../store/mainStore'
import { onKeyDownTyping } from '../../store/typing/typingActions'

export const TypingInput: React.FC = () => {
    const currentWordIdx = useSelectorAppState((s) => s.typing.currentWordIdx)

    const wordStates = useSelectorAppState((s) => s.typing.lineStateCurrent)

    const [greenEnabled, setGreenEnabled] = useState(false)
    const [redEnabled, setRedEnabled] = useState(false)
    const [flashWordIdx, setFlashWordIdx] = useState<number>(-1)

    const dispatch = useThunkDispatch()
    const currentWordInput = useSelectorAppState(
        (s) => s.typing.currentWordInput,
    )

    useEffect(() => {
        if (flashWordIdx && flashWordIdx > currentWordIdx) {
            // we moved back a word
            setFlashWordIdx(currentWordIdx)
            return
        }

        if (
            currentWordIdx <= 0 ||
            flashWordIdx === currentWordIdx ||
            wordStates.length < currentWordIdx
        ) {
            return
        }

        const lastTyped = wordStates[currentWordIdx - 1]
        if (lastTyped.isCorrect()) {
            flashGreen()
        } else {
            flashRed()
        }
        setFlashWordIdx(currentWordIdx)
    }, [currentWordIdx, wordStates, flashWordIdx])

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

    const handleTextInputKeyPress = (
        key: React.KeyboardEvent<HTMLDivElement>,
    ) => {
        dispatch(onKeyDownTyping(key))
    }

    const bgColor = (theme: Theme) => {
        if (greenEnabled) {
            return theme.palette.success.light
        }
        if (redEnabled) {
            return theme.palette.error.light
        }
        return theme.palette.background.default
    }

    const color = (theme: Theme) => {
        if (greenEnabled) {
            return theme.palette.success.dark
        }
        if (redEnabled) {
            return theme.palette.error.dark
        }
        return theme.palette.text.primary
    }

    return (
        <TextField
            autoFocus
            placeholder="type here"
            fullWidth
            variant="outlined"
            InputProps={{
                sx: {
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 20,
                },
            }}
            value={currentWordInput}
            onKeyDown={(e) => handleTextInputKeyPress(e)}
            sx={(theme) => ({
                backgroundColor: bgColor(theme),
                color: color(theme),
                transition: 'background-color 0.2s linear',
            })}
        />
    )
}
