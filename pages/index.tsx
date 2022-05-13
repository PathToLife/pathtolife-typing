import React from 'react'
import { Provider } from 'react-redux'
import { mainStore } from './store/mainStore'
import { MainPage } from './pages/MainPage'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { darkTheme } from './styles/theme'

export const App: React.FC = () => {
  return (
    <Provider store={mainStore}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <MainPage/>
      </ThemeProvider>
    </Provider>
  )
}

export default App
