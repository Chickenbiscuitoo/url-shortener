import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../server/db/client'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { query, method } = req

	if (method !== 'POST') {
		res.status(400).json({ message: 'Only POST method allowed' })
	}

	console.log(req.body)

	try {
		const response = await prisma.urls.create({
			data: {
				original_url: req.body.original_url,
				short_url: req.body.short_url,
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

// { original_url: 'www.instagram.com', short_url: 'ig' }
