import { NextPage } from 'next'
import styles from '../styles/Shortener.module.css'
import { useState, useEffect } from 'react'
import useDataStore from '../store'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Shortener: NextPage = () => {
	const { setData, data } = useDataStore()

	const [copied, setCopied] = useState(false)
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

	useEffect(() => {
		if (copied) {
			const timer = setTimeout(() => {
				setCopied(false)
			}, 2000)
			return () => clearTimeout(timer)
		}
	}, [copied])

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
				<CopyToClipboard
					text={shortUrl}
					onCopy={() => setCopied(true)}
				>
					<button type="submit" className={styles.btn}>
						Submit
					</button>
				</CopyToClipboard>
			</form>
			{copied && (
				<div className={styles.copied_container}>
					<p className={styles.copied}>Copied to Clipboard!</p>
				</div>
			)}
		</>
	)
}

export default Shortener
