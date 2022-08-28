import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../server/db/client'

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { query, method } = req

	if (method !== 'GET') {
		res.status(400).json({ message: 'Only GET method allowed' })
	}
	console.log(query)

	try {
		const response = prisma.urls.findUnique({
			where: {
				short_url: 'gugl',
			},
		})

		res.status(200).json({ message: response })
	} catch (error) {
		let message = 'Unknown Error'

		if (error instanceof Error) message = error.message
		else message = String(error)

		res.status(500).json({ message })
	}
}
