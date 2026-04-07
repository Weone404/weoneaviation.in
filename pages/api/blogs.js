import { MongoClient } from 'mongodb'
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

export const config = {
    api: {
        bodyParser: false,
    },
}

const client = new MongoClient(process.env.MONGODB_URI)

export default async function handler(req, res) {
    await client.connect()
    const db = client.db('weoneaviation')

    if (req.method === 'POST') {
        const uploadDir = path.join(process.cwd(), 'public/uploads')

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true })
        }

        const form = formidable({
            uploadDir,
            keepExtensions: true,
            maxFileSize: 5 * 1024 * 1024,
        })

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'File upload failed' })
            }

            const title = Array.isArray(fields.title) ? fields.title[0] : fields.title
            const excerpt = Array.isArray(fields.excerpt) ? fields.excerpt[0] : fields.excerpt
            const content = Array.isArray(fields.content) ? fields.content[0] : fields.content
            const category = Array.isArray(fields.category) ? fields.category[0] : fields.category

            if (!title || !content) {
                return res.status(400).json({ success: false, message: 'Title and content are required' })
            }

            let coverImage = ''
            if (files.coverImage) {
                const file = Array.isArray(files.coverImage) ? files.coverImage[0] : files.coverImage
                const filename = path.basename(file.filepath)
                coverImage = `/uploads/${filename}`
            }

            const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')

            const result = await db.collection('blogs').insertOne({
                title,
                excerpt: excerpt || '',
                content,
                coverImage,
                category: category || 'Blog',
                slug,
                createdAt: new Date(),
            })

            return res.status(200).json({ success: true, id: result.insertedId.toString() })
        })

    } else if (req.method === 'GET') {
        const blogs = await db.collection('blogs').find({}).sort({ createdAt: -1 }).toArray()
        const serialized = blogs.map(b => ({
            ...b,
            _id: b._id.toString(),
            createdAt: b.createdAt.toString()
        }))
        return res.status(200).json(serialized)
    }
}