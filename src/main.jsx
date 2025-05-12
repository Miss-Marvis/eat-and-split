import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { Route, Routes, Navigate } from 'react-router-dom'

import Home from './home.jsx'
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/user/:username' element={<App />} />
			<Route path='/' element={<Navigate to='/user/guest' />} />
			<Route path='*' element={<div>Please provide a valid user URL.</div>} />
		</Routes>
	</BrowserRouter>
)
