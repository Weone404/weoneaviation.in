import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  getMongoBlogIndex,
  getMongoBlogServerProps,
} from '../lib/blogPosts.js';

const blogRouteSource = readFileSync(new URL('../pages/blogs/[id].jsx', import.meta.url), 'utf8');
const blogIndexSource = readFileSync(new URL('../pages/blogs/index.jsx', import.meta.url), 'utf8');
const nextConfigSource = readFileSync(new URL('../next.config.js', import.meta.url), 'utf8');

assert.match(blogRouteSource, /const id = String\(params\.id\);/);
assert.match(blogRouteSource, /hardcodedBlogs\.find\(\(b\) => String\(b\.id\) === id\)/);
assert.match(blogRouteSource, /export async function getServerSideProps\(\{ params \}\)/);
assert.match(blogRouteSource, /return getMongoBlogServerProps\(id\);/);
assert.doesNotMatch(blogRouteSource, /getStaticPaths|getStaticProps/);
assert.match(blogIndexSource, /await getMongoBlogIndex\(\)/);
assert.doesNotMatch(blogIndexSource, /catch\s*\(/);
assert.match(blogRouteSource, /canonical=\{blog\.canonicalTo\}/);
assert.match(blogRouteSource, /'@type': 'BlogPosting'/);
assert.match(nextConfigSource, /source: '\/blogs\/4'/);

const configuredUri = process.env.MONGODB_URI;
delete process.env.MONGODB_URI;

try {
  await assert.rejects(
    getMongoBlogServerProps('507f1f77bcf86cd799439011'),
    /MONGODB_URI is required to generate MongoDB-backed blog pages\./,
  );
  await assert.rejects(
    getMongoBlogIndex(),
    /MONGODB_URI is required to generate MongoDB-backed blog pages\./,
  );
  await assert.rejects(
    getMongoBlogServerProps('000000000000000000000001'),
    /MONGODB_URI is required to generate MongoDB-backed blog pages\./,
  );
  assert.deepEqual(
    await getMongoBlogServerProps('not-an-object-id'),
    { notFound: true },
  );
} finally {
  if (configuredUri === undefined) {
    delete process.env.MONGODB_URI;
  } else {
    process.env.MONGODB_URI = configuredUri;
  }
}

console.log('Blog SSR checks passed: builds do not enumerate MongoDB; infrastructure errors propagate; IDs remain unambiguous.');
