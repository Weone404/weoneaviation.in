import os, re, pathlib
root = pathlib.Path(r'd:\weoneaviation.in')
pages_dir = root / 'pages'
route_files = []
for path in pages_dir.rglob('*'):
    if path.is_file() and path.suffix in {'.js', '.jsx', '.ts', '.tsx'}:
        rel = path.relative_to(pages_dir).as_posix()
        if rel.startswith('api/') or rel.startswith('admin/'):
            continue
        if rel in {'_app.jsx','_document.jsx','404.jsx','sitemap.xml.js','robots.txt.js'}:
            continue
        if rel.startswith('blogs/') and rel.endswith('[id].jsx'):
            continue
        if rel.startswith('pilot-training-in/') and rel.endswith('[city].jsx'):
            continue
        route_files.append(rel)

routes = set()
for rel in route_files:
    route = '/' + re.sub(r'\.(js|jsx|ts|tsx)$','', rel)
    route = re.sub(r'/index$','', route)
    if route == '/':
        routes.add('/')
    else:
        routes.add(route)

# add explicit routes
for rel in ['index.jsx','about-us.jsx','contact.jsx','courses.jsx','credentials.jsx','privacy-policy.jsx','terms.jsx','sitemap.jsx','sitemap.xml.js','robots.txt.js']:
    pass

# scan for internal hrefs / Link hrefs
pattern = re.compile(r'''(?:href|to)=['"](/[^'"#?]+)(?:[?#][^'"\s]*)?['"]''', re.I)
files = list((root/'pages').rglob('*'))
for path in files:
    if not path.is_file() or path.suffix not in {'.js','.jsx','.ts','.tsx'}:
        continue
    try:
        text = path.read_text(encoding='utf-8')
    except Exception:
        continue
    for i, line in enumerate(text.splitlines(), 1):
        for m in pattern.finditer(line):
            target = m.group(1)
            if target in {'/','/contact','/blogs','/courses','/about-us'}:
                continue
            if target.startswith('/#'):
                continue
            if target.startswith('/assets/') or target.startswith('/favicon'):
                continue
            if target not in routes:
                print(f'{path.relative_to(root).as_posix()}:{i}: {target}')
