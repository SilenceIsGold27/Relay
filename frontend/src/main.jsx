import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

function App() {
  const [status, setStatus] = useState('Checking connection…')

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/health', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('Health check failed')
        return response.json()
      })
      .then(() => setStatus('Backend and Postgres are connected.'))
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('Backend or Postgres is unavailable.')
      })
    return () => controller.abort()
  }, [])

  return (
    <main>
      <h1>Relay</h1>
      <p>Your video call app starts here.</p>
      <p role="status">{status}</p>
    </main>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>,
)
