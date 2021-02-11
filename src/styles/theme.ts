import { createMuiTheme } from '@material-ui/core'

export const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
    overrides: {
        MuiPaper: {
            root: {
                width: '100%',
            },
        },
    },
})

export const lightTheme = createMuiTheme({
    palette: {
        type: 'light',
    },
})
