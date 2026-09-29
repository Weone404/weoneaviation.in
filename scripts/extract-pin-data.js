const fs = require('fs');
const path = require('path');

const KNOWN_STATES = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
  'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka',
  'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Orissa', 'Uttaranchal',
  'Pondicherry', 'Tamilnadu', 'Utter Pradesh', 'Chattisgarh',
];

async function extractPdfRows(pdfPath) {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const pdf = await pdfjs.getDocument({
    data: new Uint8Array(fs.readFileSync(pdfPath)),
    disableFontFace: true,
  }).promise;
  const rows = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    let leftBuffer = [];
    for (let index = 0; index < content.items.length; index += 1) {
      const item = content.items[index];
      const value = normalizeText(item.str);
      const x = item.transform[4];
      if (!value || value === '|' || value === 'ALL INDIA PIN CODE LIST') continue;

      if (/^\d{6}$/.test(value)) {
        const rightColumn = content.items.filter((candidate) => (
          candidate.transform[4] >= 300
          && candidate.transform[5] <= item.transform[5] + 12.6
          && candidate.transform[5] >= item.transform[5] - 0.1
        ));
        const sameLine = rightColumn
          .filter((candidate) => Math.abs(candidate.transform[5] - item.transform[5]) < 0.1)
          .map((candidate) => normalizeText(candidate.str))
          .filter((candidate) => candidate && candidate !== '|');
        let state = recognizeState(sameLine.join(' '));
        if (!state) {
          const previousLine = rightColumn
            .filter((candidate) => candidate.transform[5] > item.transform[5] + 0.1)
            .sort((a, b) => b.transform[5] - a.transform[5])
            .map((candidate) => normalizeText(candidate.str))
            .filter((candidate) => candidate && candidate !== '|');
          state = recognizeState([...previousLine, ...sameLine].join(' '));
        }
        const postOffice = normalizeText(leftBuffer.join(' '));
        if (postOffice && postOffice !== 'POST OFFICE NAME') {
          rows.push({ postOffice, pinCode: value, state, sourcePage: pageNumber });
        }
        leftBuffer = [];
        continue;
      }

      function recognizeState(value) {
        const candidate = normalizeText(value);
        const known = KNOWN_STATES.find((state) => normalizeText(state) === candidate);
        return known ? normalizeState(known) : '';
      }

      if (x < 240) leftBuffer.push(value);
    }
  }

  return rows;
}

function normalizeText(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .replace(/\s+\)/g, ')')
    .trim()
    .toUpperCase();
}

function normalizeState(value) {
  const state = normalizeText(value);
  return state
    .replace(/^ANDAMAN AND NICOBAR$/, 'ANDAMAN AND NICOBAR ISLANDS')
    .replace(/^TAMILNADU$/, 'TAMIL NADU')
    .replace(/^UTTER PRADESH$/, 'UTTAR PRADESH')
    .replace(/^CHATTISGARH$/, 'CHHATTISGARH')
    .replace(/^ORISSA$/, 'ODISHA')
    .replace(/^UTTARANCHAL$/, 'UTTARAKHAND')
    .replace(/^PONDICHERRY$/, 'PUDUCHERRY');
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function deduplicate(rows) {
  const byRecord = new Map();
  rows.forEach((row) => {
    const key = `${row.pinCode}|${row.postOffice}|${row.state}`;
    if (!byRecord.has(key)) byRecord.set(key, row);
  });
  return [...byRecord.values()];
}

function buildReport(rows) {
  const pins = new Map();
  const offices = new Map();
  rows.forEach((row) => {
    if (!pins.has(row.pinCode)) pins.set(row.pinCode, []);
    pins.get(row.pinCode).push(row);
    if (!offices.has(row.postOffice)) offices.set(row.postOffice, []);
    offices.get(row.postOffice).push(row);
  });
  return {
    records: rows.length,
    uniquePins: pins.size,
    duplicatePins: [...pins.entries()].filter(([, values]) => values.length > 1).length,
    duplicatePostOfficeNames: [...offices.entries()].filter(([, values]) => values.length > 1).length,
    source: 'India PIN Code List PDF supplied by the site owner',
  };
}

async function main() {
  const pdfPath = process.argv[2];
  if (!pdfPath) throw new Error('Usage: node scripts/extract-pin-data.js <pdf-path>');

  const rows = deduplicate(await extractPdfRows(pdfPath));
  const outputDir = path.join(process.cwd(), 'data', 'locations');
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, 'pin-records.json'), `${JSON.stringify(rows, null, 2)}\n`);
  fs.writeFileSync(path.join(outputDir, 'pin-report.json'), `${JSON.stringify(buildReport(rows), null, 2)}\n`);
  console.log(JSON.stringify(buildReport(rows), null, 2));
}

module.exports = { deduplicate, extractPdfRows };

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
