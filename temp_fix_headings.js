const fs = require('fs');
const path = require('path');

const root = 'd:/weoneaviation.in';
const dirs = [path.join(root, 'pages'), path.join(root, 'components')];

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else if (/\.(jsx|js|tsx|ts)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

let updated = 0;
for (const dir of dirs) {
  for (const file of walk(dir)) {
    let text = fs.readFileSync(file, 'utf8');
    const pattern = /<\/?h[1-6]\b[^>]*>/gi;
    const tags = text.match(pattern) || [];
    if (!tags.length) continue;

    let stack = [];
    let modified = false;
    let cursor = 0;
    let result = '';

    while (cursor < text.length) {
      const match = pattern.exec(text);
      if (!match) {
        result += text.slice(cursor);
        break;
      }

      result += text.slice(cursor, match.index);
      const tag = match[0];
      const isClosing = tag.startsWith('</h');

      if (isClosing) {
        const level = Number(tag.match(/h([1-6])/i)[1]);
        const expected = stack.length ? stack[stack.length - 1] : level;
        if (stack.length) stack.pop();
        if (level !== expected) {
          result += `</h${expected}>`;
          modified = true;
        } else {
          result += tag;
        }
      } else {
        const level = Number(tag.match(/h([1-6])/i)[1]);
        let nextLevel = level;
        if (stack.length && level > stack[stack.length - 1] + 1) {
          nextLevel = stack[stack.length - 1] + 1;
          modified = true;
        }
        const attrs = tag.slice(3, -1);
        result += `<h${nextLevel}${attrs}>`;
        stack.push(nextLevel);
      }

      cursor = match.index + match[0].length;
    }

    if (modified) {
      fs.writeFileSync(file, result, 'utf8');
      updated += 1;
    }
  }
}

console.log('Updated files:', updated);
