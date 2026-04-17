import { MongoClient, ObjectId } from 'mongodb'
import formidable from 'formidable'
import { v2 as cloudinary } from 'cloudinary'


cloudinary.config({
    cloud_name: 'dw8f4vrth',
    api_key: '646332872161894',
    api_secret: 'pc8mCXoKkQpleIwwWs_lCHLnljc',
    secure: true
})

export const config = { api: { bodyParser: false } }

const client = new MongoClient(process.env.MONGODB_URI)

function parseForm(req) {
    return new Promise((resolve, reject) => {
        const form = formidable({ keepExtensions: true, maxFileSize: 5 * 1024 * 1024 })
        form.parse(req, (err, fields, files) => {
            if (err) reject(err)
            else resolve({ fields, files })
        })
    })
}

export default async function handler(req, res) {
    try {
        await client.connect()
        const db = client.db('weoneaviation')

        // ── Extract id from query if present (/api/blogs?id=xxx) ──────────
        const { id } = req.query

        // ── Routes WITH id (GET one, PUT, DELETE) ─────────────────────────
        if (id) {
            if (!ObjectId.isValid(id))
                return res.status(400).json({ success: false, message: 'Invalid blog ID' })

            const objectId = new ObjectId(id)

            if (req.method === 'GET') {
                const blog = await db.collection('blogs').findOne({ _id: objectId })
                if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' })
                return res.status(200).json({
                    ...blog,
                    _id: blog._id.toString(),
                    createdAt: blog.createdAt?.toString()
                })

            } else if (req.method === 'PUT') {
                const { fields, files } = await parseForm(req)

                const title = Array.isArray(fields.title) ? fields.title[0] : fields.title
                const excerpt = Array.isArray(fields.excerpt) ? fields.excerpt[0] : fields.excerpt
                const content = Array.isArray(fields.content) ? fields.content[0] : fields.content
                const category = Array.isArray(fields.category) ? fields.category[0] : fields.category

                if (!title || !content)
                    return res.status(400).json({ success: false, message: 'Title and content are required' })

                const updateData = {
                    title,
                    excerpt: excerpt || '',
                    content,
                    category: category || 'Blog',
                    slug: title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
                    updatedAt: new Date()
                }

                if (files.coverImage) {
                    const file = Array.isArray(files.coverImage) ? files.coverImage[0] : files.coverImage
                    const uploaded = await cloudinary.uploader.upload(file.filepath, { folder: 'weoneaviation/blogs' })
                    updateData.coverImage = uploaded.secure_url
                }

                const result = await db.collection('blogs').updateOne(
                    { _id: objectId },
                    { $set: updateData }
                )

                if (result.matchedCount === 0)
                    return res.status(404).json({ success: false, message: 'Blog not found' })

                return res.status(200).json({ success: true, message: 'Blog updated successfully' })

            } else if (req.method === 'DELETE') {
                const result = await db.collection('blogs').deleteOne({ _id: objectId })

                if (result.deletedCount === 0)
                    return res.status(404).json({ success: false, message: 'Blog not found' })

                return res.status(200).json({ success: true, message: 'Blog deleted successfully' })

            } else {
                res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
                return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` })
            }
        }

        // ── Routes WITHOUT id (GET all, POST new) ─────────────────────────
        if (req.method === 'POST') {
            const { fields, files } = await parseForm(req)

            const title = Array.isArray(fields.title) ? fields.title[0] : fields.title
            const excerpt = Array.isArray(fields.excerpt) ? fields.excerpt[0] : fields.excerpt
            const content = Array.isArray(fields.content) ? fields.content[0] : fields.content
            const category = Array.isArray(fields.category) ? fields.category[0] : fields.category

            if (!title || !content)
                return res.status(400).json({ success: false, message: 'Title and content are required' })

            let coverImage = ''
            if (files.coverImage) {
                const file = Array.isArray(files.coverImage) ? files.coverImage[0] : files.coverImage
                const uploaded = await cloudinary.uploader.upload(file.filepath, { folder: 'weoneaviation/blogs' })
                coverImage = uploaded.secure_url
            }

            const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
            const result = await db.collection('blogs').insertOne({
                title, excerpt: excerpt || '', content, coverImage,
                category: category || 'Blog', slug, createdAt: new Date(),
            })

            return res.status(200).json({ success: true, id: result.insertedId.toString() })

        } else if (req.method === 'GET') {
            const blogs = await db.collection('blogs').find({}).sort({ createdAt: -1 }).toArray()
            return res.status(200).json(blogs.map(b => ({
                ...b, _id: b._id.toString(), createdAt: b.createdAt.toString()
            })))

        } else {
            res.setHeader('Allow', ['GET', 'POST'])
            return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` })
        }

    } catch (err) {
        console.error('[blogs] error:', err)
        return res.status(500).json({ success: false, message: err.message || 'Internal server error' })
    }
}