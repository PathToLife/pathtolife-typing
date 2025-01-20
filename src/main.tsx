import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { mainStore } from './store/mainStore'
import App from './App'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={mainStore}>
            <App />
        </Provider>
    </StrictMode>,
)
