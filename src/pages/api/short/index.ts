import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../server/db/client'
import { z } from 'zod'

const schema = z.object({
	original_url: z.string().min(6).max(255),
	short_url: z.string().min(2).max(125),
})
// { original_url: 'www.instagram.com', short_url: 'ig' }

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { query, method } = req

	if (method !== 'POST') {
		res.status(400).json({ message: 'Only POST method allowed' })
	}

	try {
		const data = schema.parse(req.body)
		console.log(data)
		const response = await prisma.urls.create({
			data: {
				original_url: data.original_url,
				short_url: data.short_url,
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
