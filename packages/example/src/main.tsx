import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import 'antd/dist/reset.css';

import 'virtual:windi.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
