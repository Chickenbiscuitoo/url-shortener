import { NextPage } from 'next'
import styles from '../styles/Shortener.module.css'

const Shortener: NextPage = () => {
	return (
		<>
			<form className={styles.container}>
				<input
					type="text"
					name="originalUrl"
					placeholder="original url"
					className={styles.inputbox}
				/>
				<input
					type="text"
					name="shortUrl"
					placeholder="short url"
					className={styles.inputbox}
				/>
			</form>
			<button type="submit" className={styles.btn}>
				Submit
			</button>
		</>
	)
}

export default Shortener
