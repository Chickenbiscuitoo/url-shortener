import axios from 'axios'
import create from 'zustand'

interface data {
	original_url: string
	short_url: string
}

interface Store {
	data: data
	setData: (data: data) => void
	createShortUrl: () => void
}

const useDataStore = create<Store>((set, get) => ({
	data: {
		original_url: '',
		short_url: '',
	},
	setData: (data) => set({ data }),
	createShortUrl: async () => {
		const data = get().data
		const response = await axios.post(
			'http://localhost:3000/api/short',
			data
		)
	},
}))

export default useDataStore
