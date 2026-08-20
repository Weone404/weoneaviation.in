# How to Create Lead Magnet PDFs for We One Aviation

## 3 Approaches (Pick One):

### **Approach 1: DIY - Generate PDFs Programmatically (Recommended for your setup)**

**Tools Needed:**
- `jsPDF` library (for PDF generation) 
- `html2canvas` (to convert HTML to images)

**Installation:**
```bash
npm install jspdf html2canvas
```

**Create a Script to Generate PDFs:**

Create `/scripts/generate-pdfs.js`:

```javascript
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Function to generate PDF from HTML content
async function generatePDF(htmlContent, filename) {
  const canvas = await html2canvas(htmlContent);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgWidth = 210;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  pdf.save(filename);
}

// Export function
export { generatePDF };
```

**OR Use a Service-Based Approach (Simpler):**

---

### **Approach 2: Use Online PDF Generator (Easiest)**

**Services:**
- Canva (drag-drop design → export PDF)
- Figma (design → export PDF)
- Google Docs (write content → download as PDF)
- Adobe InDesign (professional design)

**Steps:**
1. Design PDF in Canva/Figma
2. Export as PDF
3. Save to `/public/pdfs/` folder
4. Link in your lead magnet pages

---

### **Approach 3: Use PDF Generation Service (Best for Automation)**

**Services:**
- **CloudConvert API** (easy, reliable)
- **PDFShift** (HTML to PDF)
- **Document API** 

**Example with CloudConvert:**

```bash
npm install cloudconvert
```

---

## **Recommended: DIY Google Docs Approach (Zero Cost)**

### **Step-by-Step:**

1. **Create in Google Docs**
   - Write all content in Google Docs
   - Format nicely with headers, colors, images
   - Add your branding

2. **Export as PDF**
   - File → Download → PDF Document

3. **Upload to Your Site**
   - Save to `/public/pdfs/` folder
   - Link in lead magnet pages

4. **Example Files to Create:**

```
/public/pdfs/
  ├── DGCA-Exam-Checklist.pdf
  ├── CPL-Cost-Breakdown-Guide.pdf
  └── Pre-Admission-Checklist.pdf
```

---

## **What to Include in Each PDF:**

### **1. DGCA Exam Checklist PDF** (4-5 pages)
- Pre-exam documentation checklist
- Subject-wise study checklist
- Exam day timeline
- Common mistakes
- Quick tips

**File:** `/public/pdfs/DGCA-Exam-Checklist.pdf`

### **2. CPL Cost Breakdown PDF** (5-6 pages)
- Detailed cost table (India)
- International comparison (USA, Australia, Canada)
- Hidden costs list
- Payment options & plans
- Budget calculator template

**File:** `/public/pdfs/CPL-Cost-Breakdown-Guide.pdf`

### **3. Pre-Admission Checklist PDF** (4-5 pages)
- Eligibility criteria checklist
- Documents required list
- Medical test requirements
- DGCA registration steps
- First-day preparation

**File:** `/public/pdfs/Pre-Admission-Checklist.pdf`

---

## **Alternative: Use Gumroad (Hosted PDFs)**

If you don't want to host PDFs yourself:

1. Sign up at **gumroad.com**
2. Upload PDF files
3. Set price: $0 (free) with email capture
4. Get shareable links
5. Link from your pages

Gumroad handles email capture + file delivery automatically.

---

## **Implementation Timeline:**

| Timeline | Action |
|----------|--------|
| **Day 1-2** | Decide PDF creation method (Google Docs recommended) |
| **Day 3-5** | Create 3 PDFs with content from your website |
| **Day 6** | Upload PDFs to `/public/pdfs/` folder |
| **Day 7** | Test lead magnet pages + downloads |
| **Week 2** | Monitor email captures, optimize |
| **Week 3+** | Create 2-3 more PDFs |

---

## **Quick Wins:**

✅ Use Google Docs (free, looks professional)
✅ Export directly as PDF  
✅ Upload to `/public/pdfs/`
✅ Deploy to production
✅ Start capturing leads immediately

---

## **Testing Before Launch:**

1. Fill out lead form with test email
2. Verify email saved to MongoDB
3. Verify PDF downloads correctly
4. Check PDF formatting on mobile
5. Test on different browsers

---

## **Next Steps:**

1. Choose PDF creation method (recommend: Google Docs)
2. Create 3 PDF files with content
3. Upload to `/public/pdfs/`
4. Deploy website
5. Start sharing lead magnet links
6. Monitor email captures

---

**Questions?** These lead magnets will start capturing emails within 24 hours of deployment.
