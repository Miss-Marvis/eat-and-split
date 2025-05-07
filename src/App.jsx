import { useState } from 'react'
import './App.css'
import avatar1 from '/src/assets/images/Avater1.jpg'
import avatar2 from '/src/assets/images/Avater2.jpg'
import avatar3 from '/src/assets/images/Avater3.jpg'

const initialFriends = [
	{
		id: 118836,
		name: 'Clark',
		image: avatar1,
		balance: -7,
	},
	{
		id: 933372,
		name: 'Sarah',
		image: avatar2,
		balance: 20,
	},

	{
		id: 499476,
		name: 'Anthony',
		image: avatar3,
		balance: 0,
	},
]

export default function App() {
	const [friends, setFriends] = useState(initialFriends)
	const [showAddFriend, setShowAddFriend] = useState(false)
	const [selectedFriend, setSelectedFriend] = useState(null)

	function handleShowAddFriend() {
		setShowAddFriend((show) => !show)
	}

	function handleAddFriend(friend) {
		setFriends((friends) => [...friends, friend])
		setShowAddFriend(false)
	}

	function handleSelection(friend) {
		setSelectedFriend((selected) =>
			selected?.id === friend.id ? null : friend
		)
		setShowAddFriend(false)
	}

	function handleSplitBill(value) {
		setFriends((friends) =>
			friends.map((friend) =>
				friend.id === selectedFriend.id
					? { ...friend, balance: friend.balance + value }
					: friend
			)
		)

		setSelectedFriend(null)
	}

	return (
		<div className='app'>
			<div className='sidebar'>
				<FriendsList
					friends={friends}
					onSelection={handleSelection}
					selectedFriend={selectedFriend}
				/>

				{showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

				<button className='button' onClick={handleShowAddFriend}>
					{showAddFriend ? 'Close' : 'Add Friend'}
				</button>
			</div>

			{selectedFriend && (
				<FormSplitBill
					selectedFriend={selectedFriend}
					onSplitBill={handleSplitBill}
				/>
			)}
		</div>
	)
}

function FriendsList({ friends, onSelection, selectedFriend }) {
	return (
		<ul>
			{friends.map((friend) => (
				<Friend
					friend={friend}
					key={friend.id}
					onSelection={onSelection}
					isSelected={selectedFriend?.id === friend.id}
				/>
			))}
		</ul>
	)
}

function Friend({ friend, onSelection, isSelected }) {
	return (
		<li className={isSelected ? 'selected' : ''}>
			<img src={friend.image} alt={friend.name} />
			<div className='friend-info'>
				<h3>{friend.name}</h3>
				{friend.balance < 0 && (
					<p className='red'>
						You owe {friend.name} ${Math.abs(friend.balance)}
					</p>
				)}

				{friend.balance > 0 && (
					<p className='green'>
						{friend.name} owes you ${Math.abs(friend.balance)}
					</p>
				)}
				{friend.balance === 0 && <p>You and {friend.name} are even</p>}
			</div>
			<button className='button' onClick={() => onSelection(friend)}>
				{isSelected ? 'Close' : 'Select'}
			</button>
		</li>
	)
}

function FormAddFriend({ onAddFriend }) {
	const [name, setName] = useState('')
	const [image, setImage] = useState('https://i.pravatar.cc/48')

	function handleSubmit(e) {
		e.preventDefault()

		if (!name || !image) return

		const id = crypto.randomUUID()
		const newFriend = {
			id,
			name,
			image: `${image}?=${id}`,
			balance: 0,
		}

		onAddFriend(newFriend)
		setName('')
		setImage('https://i.pravatar.cc/48')
	}

	return (
		<form className='form-add-friend' onSubmit={handleSubmit}>
			<label>👯‍♀️ Friend name</label>
			<input
				type='text'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<label>🌠 Image URL</label>
			<input
				type='text'
				value={image}
				onChange={(e) => setImage(e.target.value)}
			/>
			<button className='button' type='submit'>
				Add
			</button>
		</form>
	)
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
	const [bill, setBill] = useState('')
	const [userExpense, setUserExpense] = useState('')
	const [whoIsPaying, setWhoIsPaying] = useState('user')

	const friendExpense = bill ? bill - userExpense : ''

	function handleSubmit(e) {
		e.preventDefault()

		if (!bill || !userExpense) return

		const value = whoIsPaying === 'user' ? friendExpense : -userExpense

		onSplitBill(value)
	}

	return (
		<form className='form-split-bill' onSubmit={handleSubmit}>
			<h2>Split a bill with {selectedFriend.name}</h2>

			<div className='form-row'>
				<label>💰 Bill value</label>
				<input
					type='number'
					value={bill}
					onChange={(e) => setBill(Number(e.target.value))}
				/>
			</div>

			<div className='form-row'>
				<label>🧍 Your expense</label>
				<input
					type='number'
					value={userExpense}
					onChange={(e) =>
						setUserExpense(
							Number(e.target.value) > bill
								? userExpense
								: Number(e.target.value)
						)
					}
				/>
			</div>

			<div className='form-row'>
				<label>👯‍♀️ {selectedFriend.name}'s expense</label>
				<input type='text' disabled value={friendExpense} />
			</div>

			<div className='form-row'>
				<label>🤑 Who is paying the bill</label>
				<select
					value={whoIsPaying}
					onChange={(e) => setWhoIsPaying(e.target.value)}
				>
					<option value='user'>You</option>
					<option value='friend'>{selectedFriend.name}</option>
				</select>
			</div>

			<button className='button' type='submit'>
				Split bill
			</button>
		</form>
	)
}
