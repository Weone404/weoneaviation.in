import { MongoClient, ObjectId } from 'mongodb';

function createMongoClient() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is required to generate MongoDB-backed blog pages.');
  }

  return new MongoClient(uri);
}

async function withBlogCollection(operation) {
  const client = createMongoClient();
  try {
    await client.connect();
    return await operation(client.db('weoneaviation').collection('blogs'));
  } finally {
    await client.close();
  }
}

export async function getMongoBlogServerProps(id) {
  if (typeof id !== 'string' || !ObjectId.isValid(id)) {
    return { notFound: true };
  }

  const raw = await withBlogCollection((collection) => (
    collection.findOne({ _id: new ObjectId(id) })
  ));
  if (!raw) return { notFound: true };

  const displayDate = raw.updatedAt
    ? `${new Date(raw.updatedAt).toDateString()} (edited)`
    : new Date(raw.createdAt).toDateString();
  const datePublishedISO = new Date(raw.createdAt).toISOString();
  const dateModifiedISO = new Date(raw.updatedAt || raw.createdAt).toISOString();

  return {
    props: {
      blog: {
        id: raw._id.toString(),
        title: raw.title,
        excerpt: raw.excerpt || '',
        category: raw.category || 'Blog',
        readTime: '5 min',
        date: displayDate,
        datePublishedISO,
        dateModifiedISO,
        img:
          raw.coverImage ||
          'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80',
        content: raw.content,
        slug: raw.slug || '',
        faqs: Array.isArray(raw.faqs) ? raw.faqs : [],
      },
    },
  };
}

export async function getMongoBlogIndex() {
  return withBlogCollection(async (collection) => {
    const blogs = await collection.find({}).sort({ createdAt: -1 }).toArray();
    return blogs.map((blog) => ({
      id: blog._id.toString(),
      title: blog.title,
      excerpt: blog.excerpt || '',
      category: blog.category || 'Blog',
      readTime: '5 min',
      date: new Date(blog.createdAt).toDateString(),
      img:
        blog.coverImage ||
        'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80',
      faqs: Array.isArray(blog.faqs) ? blog.faqs : [],
    }));
  });
}
