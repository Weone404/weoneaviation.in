const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const images = [
  {
    input: path.join('public', '1725_piper-pa34-seneca.jpg'),
    width: 1920,
    height: 1080,
  },
  {
    input: path.join('public', 'Piper Archer.jpg'),
    width: 1920,
    height: 1080,
  },
];

async function resizeImage({ input, width, height }) {
  if (!fs.existsSync(input)) {
    console.log(`NOT FOUND: ${input}`);
    return;
  }

  const extension = path.extname(input);
  const backup = input.slice(0, -extension.length) + '-original' + extension;
  const temporary = input.slice(0, -extension.length) + '-resized' + extension;

  if (!fs.existsSync(backup)) {
    fs.copyFileSync(input, backup);
    console.log(`Backed up to: ${backup}`);
  }

  await sharp(input)
    .resize(width, height, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90, progressive: true })
    .toFile(temporary);

  fs.renameSync(temporary, input);
  const metadata = await sharp(input).metadata();
  console.log(`Resized: ${path.basename(input)} -> ${metadata.width}x${metadata.height}`);
}

Promise.all(images.map(resizeImage)).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
