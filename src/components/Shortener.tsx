import { NextPage } from 'next'
import styles from '../styles/Shortener.module.css'
import { useState } from 'react'
import useDataStore from '../store'

const Shortener: NextPage = () => {
	const { setData, data } = useDataStore()

	const [userInput, setUserInput] = useState({
		originalUrl: '',
		shortUrl: '',
	})
	const { originalUrl, shortUrl } = userInput

	const handleChange = (e: any) => {
		setUserInput({
			...userInput,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = (e: any) => {
		e.preventDefault()
		setData({
			original_url: originalUrl,
			short_url: shortUrl,
		})
		setUserInput({ originalUrl: '', shortUrl: '' })
	}

	return (
		<>
			<form onSubmit={handleSubmit} className={styles.container}>
				<input
					type="text"
					name="originalUrl"
					value={originalUrl}
					onChange={handleChange}
					placeholder="original url"
					className={styles.inputbox}
				/>
				<input
					type="text"
					name="shortUrl"
					value={shortUrl}
					onChange={handleChange}
					placeholder="short url"
					className={styles.inputbox}
				/>
				<button type="submit" className={styles.btn}>
					Submit
				</button>
			</form>
		</>
	)
}

export default Shortener
