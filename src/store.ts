import create from 'zustand'

interface data {
	original_url: string
	short_url: string
}

interface Store {
	data: data
	setData: (data: data) => void
}

const useDataStore = create<Store>((set) => ({
	data: {
		original_url: '',
		short_url: '',
	},
	setData: (data) => set({ data }),
}))

export default useDataStore
