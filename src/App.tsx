
import React from 'react'
import { MainPage } from './pages/MainPage'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { darkTheme } from './styles/theme'

export const App: React.FC = () => {

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <MainPage/>
        </ThemeProvider>
        
    )
}

export default App
