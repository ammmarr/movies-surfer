import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from "react-redux"
import store from './reduxStore/index'
import { BrowserRouter } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
 
  <Provider store={store}>

    <React.StrictMode>
      <BrowserRouter basename="/movies-surfer">
        <AnimatePresence  mode={'wait'}>
          <App />
        </AnimatePresence>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
)
