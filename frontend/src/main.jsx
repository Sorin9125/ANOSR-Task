import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import Context from './Context/Context.jsx'
import Theme from './Theme.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Context>
      <Theme>
        <ToastContainer />
        <App />
      </Theme>
    </Context>

  </StrictMode>,
)
