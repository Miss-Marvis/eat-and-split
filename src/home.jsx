import { useState } from 'react'

export default function Home() {
	const [username, setUsername] = useState('')
	const [redirectPath, setRedirectPath] = useState(null)

	function handleSubmit(e) {
		e.preventDefault()
		if (!username.trim()) return
		setRedirectPath(`/user/${username.toLowerCase()}`)
	}

	// Simple redirect mechanism
	if (redirectPath) {
		window.location.href = redirectPath
		return null
	}

	return (
		<div className='home'>
			<div className='home-container'>
				<h1>Welcome to Eat & Split 🍽️</h1>
				<div>
					<input
						className='form-input'
						type='text'
						placeholder='Enter your name'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						autoFocus
					/>
					<button className='home-button' onClick={handleSubmit}>
						Go to your dashboard
					</button>
				</div>
			</div>
		</div>
	)
}
