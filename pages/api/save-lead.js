import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';

const EXCEL_FILE = path.join(process.cwd(), 'data', 'leads.xlsx');
const SHEET_NAME = 'Leads';

// Column definitions
const COLUMNS = [
  { header: 'S.No', key: 'sno', width: 8 },
  { header: 'Date', key: 'date', width: 16 },
  { header: 'Time', key: 'time', width: 12 },
  { header: 'Full Name', key: 'name', width: 22 },
  { header: 'Phone', key: 'phone', width: 16 },
  { header: 'Email', key: 'email', width: 28 },
  { header: 'Course', key: 'course', width: 30 },
  { header: 'Message', key: 'message', width: 40 },
  { header: 'Source Page', key: 'source', width: 22 },
];

async function getOrCreateWorkbook() {
  const workbook = new ExcelJS.Workbook();

  if (fs.existsSync(EXCEL_FILE)) {
    await workbook.xlsx.readFile(EXCEL_FILE);
    let sheet = workbook.getWorksheet(SHEET_NAME);
    if (!sheet) {
      sheet = workbook.addWorksheet(SHEET_NAME);
      addHeaderRow(sheet);
    }
    return { workbook, sheet };
  }

  // Create fresh workbook
  const sheet = workbook.addWorksheet(SHEET_NAME);
  addHeaderRow(sheet);
  return { workbook, sheet };
}

function addHeaderRow(sheet) {
  sheet.columns = COLUMNS;

  // Style header row
  const headerRow = sheet.getRow(1);
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF0A2342' }, // Aviation blue
    };
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, name: 'Arial', size: 11 };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FFf97316' } },
      left: { style: 'thin', color: { argb: 'FFf97316' } },
      bottom: { style: 'thin', color: { argb: 'FFf97316' } },
      right: { style: 'thin', color: { argb: 'FFf97316' } },
    };
  });
  headerRow.height = 28;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, course, message, source } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  try {
    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

    const { workbook, sheet } = await getOrCreateWorkbook();

    // Get next row number
    const lastRow = sheet.lastRow ? sheet.lastRow.number : 1;
    const sno = lastRow; // Header is row 1, so sno = lastRow (already skips header)

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

    const newRow = sheet.addRow({
      sno,
      date: dateStr,
      time: timeStr,
      name: name?.trim(),
      phone: phone?.trim(),
      email: email?.trim() || '—',
      course: course?.trim() || 'Not specified',
      message: message?.trim() || '—',
      source: source?.trim() || 'Website',
    });

    // Style data rows (alternate colors)
    const isEven = sno % 2 === 0;
    newRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: isEven ? 'FFE8F4FD' : 'FFFFFFFF' },
      };
      cell.font = { name: 'Arial', size: 10, color: { argb: 'FF1A1A2E' } };
      cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFDDDDDD' } },
        left: { style: 'thin', color: { argb: 'FFDDDDDD' } },
        bottom: { style: 'thin', color: { argb: 'FFDDDDDD' } },
        right: { style: 'thin', color: { argb: 'FFDDDDDD' } },
      };
    });
    newRow.height = 22;

    // Freeze top row
    sheet.views = [{ state: 'frozen', ySplit: 1 }];

    // Auto-filter
    sheet.autoFilter = {
      from: { row: 1, column: 1 },
      to: { row: 1, column: COLUMNS.length },
    };

    await workbook.xlsx.writeFile(EXCEL_FILE);

    return res.status(200).json({ success: true, message: 'Lead saved successfully', rowNumber: sno });
  } catch (err) {
    console.error('Excel save error:', err);
    return res.status(500).json({ error: 'Failed to save data', detail: err.message });
  }
}
