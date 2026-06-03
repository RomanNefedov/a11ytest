import { createRoot } from 'react-dom/client'
import 'a11y-react-kit/styles.css'
import './index.css'
import App from './App.tsx'
import { A11yProvider } from 'a11y-react-kit'

createRoot(document.getElementById('root')!).render(
  <A11yProvider storageKey="a11ytest">
    <App />
  </A11yProvider>,
)
