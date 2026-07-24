import urllib.request, re
urls = [
    'https://www.weoneaviation.in/icse-full-form',
    'https://www.weoneaviation.in/icse-full-form?cachebust=1',
    'https://www.weoneaviation.in/cbse-full-form',
    'https://www.weoneaviation.in/cbse-full-form?cachebust=2'
]
for u in urls:
    print('URL:', u)
    try:
        html = urllib.request.urlopen(u, timeout=30).read().decode('utf-8', 'replace')
    except Exception as e:
        print('ERROR', e)
        continue
    matches = re.findall(r'<meta[^>]+name=["\']robots["\'][^>]*>', html, re.I)
    print('COUNT', len(matches))
    for m in matches:
        print(m)
    print('-'*50)
