import os
import re

root = os.getcwd()
pages_dir = os.path.join(root, 'pages')
exclude = {'_app.jsx', '_document.jsx', '404.jsx', 'sitemap.xml.js', 'robots.txt.js'}

page_routes = []
for dirpath, dirnames, filenames in os.walk(pages_dir):
    for filename in filenames:
        if not filename.endswith(('.jsx', '.js')):
            continue
        rel = os.path.relpath(os.path.join(dirpath, filename), pages_dir).replace('\\', '/')
        if rel in exclude:
            continue
        if rel.startswith('api/') or rel.startswith('admin/'):
            continue
        if re.search(r'\[.*\]', rel):
            continue
        route = '/' + re.sub(r'(\.jsx|\.js)$', '', rel)
        route = re.sub(r'/index$', '', route)
        if route == '':
            route = '/'
        page_routes.append(route)
page_routes = sorted(set(page_routes))

sitemap_path = os.path.join(pages_dir, 'sitemap.xml.js')
text = open(sitemap_path, 'r', encoding='utf-8').read()
urls = re.findall(r"loc\s*:\s*['\"]https://weoneaviation\.in([^'\"]*)['\"]", text)
urls = ['/' if u == '' else u for u in urls]
urls = sorted(set(urls))

print('PAGE_COUNT', len(page_routes))
print('SITEMAP_COUNT', len(urls))
print('MISSING_IN_SITEMAP')
for p in page_routes:
    if p not in urls:
        print(p)
print('EXTRA_IN_SITEMAP')
for u in urls:
    if u not in page_routes:
        print(u)
