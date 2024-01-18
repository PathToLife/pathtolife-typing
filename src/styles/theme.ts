import { ThemeOptions, createTheme } from '@mui/material/styles'

const otherOverrides: ThemeOptions = {
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    width: '100%',
                },
            },
        },
    },
}

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    ...otherOverrides,
})

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
    ...otherOverrides,
})
