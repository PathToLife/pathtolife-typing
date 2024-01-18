import React from 'react'
import { MainPage } from './pages/MainPage'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { darkTheme } from './styles/theme'

export const App: React.FC = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <MainPage />
        </ThemeProvider>
    )
}

export default App
