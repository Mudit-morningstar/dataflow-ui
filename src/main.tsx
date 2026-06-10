import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Button } from './index'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="flex gap-3 p-8">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button loading>Loading</Button>
    </div>
  </StrictMode>,
)
