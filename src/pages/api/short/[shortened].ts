import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../server/db/client'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { query, method } = req

	const { shortened } = req.query

	if (method !== 'GET') {
		return res.status(400).json({ message: 'Only GET method allowed' })
	}

	try {
		const response = await prisma.urls.findUnique({
			where: {
				short_url: shortened && shortened.toString(),
			},
		})

		if (response) {
			return res.redirect(response.original_url)
		}

		return res.status(404).json({ message: 'Not found' })
	} catch (error) {
		let message = 'Unknown Error'

		if (error instanceof Error) message = error.message
		else message = String(error)

		return res.status(500).json({ message })
	}
}
