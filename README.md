# ✈️ WeOne Aviation Academy — Next.js Website

A complete, production-ready multi-page aviation training website built with Next.js 14, Tailwind CSS, and automatic Excel lead saving.

---

## 🚀 Quick Setup (3 Steps)

### Step 1 — Install Node.js
Download and install Node.js (v18 or later) from: https://nodejs.org

### Step 2 — Install Dependencies
Open terminal in this folder and run:
```bash
npm install
```

### Step 3 — Start the Website
```bash
npm run dev
```

Open your browser at: **http://localhost:3000**

---

## 📊 Excel Lead Capture System

Every form submission on the website is **automatically saved to Excel**:

**File location:** `data/leads.xlsx` (created automatically on first submission)

### What gets saved per submission:
| Column | Data |
|--------|------|
| S.No | Auto-incrementing row number |
| Date | Submission date (e.g., 15 Dec 2024) |
| Time | Submission time (e.g., 02:30 PM) |
| Full Name | User's name |
| Phone | User's phone number |
| Email | User's email (if provided) |
| Course | Selected course |
| Message | User's message (if provided) |
| Source Page | Which page the form was submitted from |

### Features:
- ✅ Appends new row each time — **never deletes old data**
- ✅ Works even if Excel file is open in another program
- ✅ File is created automatically on first submission
- ✅ Formatted with headers, colors, freeze pane, auto-filter
- ✅ Alternating row colors for readability
- ✅ Works in production and development

### Forms that save to Excel:
1. **Hero section form** (Home page)
2. **Contact page form**
3. **Scroll popup** (appears at 30% scroll, once per session)
4. **All course page forms** (CPL, PPL, ATPL, SPL, DGCA)
5. **City page forms** (all 13 city pages)

---

## 📄 All Pages

| URL | Page |
|-----|------|
| `/` | Home |
| `/about` | About Us |
| `/contact` | Contact |
| `/blogs` | Blog Listing |
| `/courses/cpl` | Commercial Pilot License |
| `/courses/ppl` | Private Pilot License |
| `/courses/atpl` | ATPL |
| `/courses/spl` | Sport Pilot License |
| `/courses/dgca-ground-classes` | DGCA Ground Classes |
| `/how-to-become-a-pilot/after-12th` | How to Become a Pilot After 12th |
| `/how-to-become-a-pilot/in-india` | How to Become a Pilot in India |
| `/pilot-training-in/delhi` | Pilot Training in Delhi |
| `/pilot-training-in/mumbai` | Pilot Training in Mumbai |
| `/pilot-training-in/bangalore` | Pilot Training in Bangalore |
| `/pilot-training-in/hyderabad` | + 10 more cities... |

---

## ✨ Features

| Feature | Details |
|---------|---------|
| 📊 Excel Lead Saving | Auto-appends to `data/leads.xlsx` |
| 📱 WhatsApp Integration | All forms redirect to WhatsApp (9355611996) |
| 📞 Click-to-Call | Floating call button |
| 🎠 Hero Slider | Auto-play image slider on every page |
| 💫 Animations | Scroll-triggered fade-up reveals |
| 🖱️ Custom Cursor | Animated dot + trailing ring |
| 🪟 Contact Popup | Fires at 30% scroll, once per session |
| 📍 13 City Pages | SEO pages with dynamic routing |
| 📱 Fully Responsive | Mobile, tablet, desktop |
| 🔍 SEO Optimized | Unique meta title + description per page |

---

## 🏗️ Project Structure

```
weoneaviation/
├── components/
│   ├── ContactPopup.jsx    ← Scroll popup (saves to Excel)
│   ├── CourseCard.jsx
│   ├── CoursePageTemplate.jsx
│   ├── FloatingButtons.jsx ← WhatsApp + Call buttons
│   ├── Footer.jsx
│   ├── HeroSlider.jsx
│   ├── Layout.jsx
│   ├── LeadForm.jsx        ← Main form (saves to Excel + WhatsApp)
│   ├── Navbar.jsx
│   └── ScrollReveal.jsx
│
├── pages/
│   ├── api/
│   │   └── save-lead.js    ← API that writes to Excel
│   ├── _app.jsx
│   ├── _document.jsx
│   ├── index.jsx           ← Home
│   ├── about.jsx
│   ├── contact.jsx         ← Contact (saves to Excel)
│   ├── blogs.jsx
│   ├── 404.jsx
│   ├── courses/
│   │   ├── cpl.jsx
│   │   ├── ppl.jsx
│   │   ├── atpl.jsx
│   │   ├── spl.jsx
│   │   └── dgca-ground-classes.jsx
│   ├── how-to-become-a-pilot/
│   │   ├── after-12th.jsx
│   │   └── in-india.jsx
│   └── pilot-training-in/
│       └── [city].jsx      ← Dynamic (13 cities)
│
├── styles/
│   └── globals.css
│
├── data/                   ← Excel files saved here
│   └── leads.xlsx          ← Auto-created on first submission
│
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

---

## 🌐 Production Deployment

### Deploy to Vercel (Recommended):
```bash
npm install -g vercel
vercel
```

### Or build locally:
```bash
npm run build
npm start
```

**Note for production:** The `data/` folder must be writable. On Vercel, use a database or external storage for leads instead of local files.

---

## 📞 WhatsApp Number
All forms connect to: **+91 93556 11996**

To change the number, search for `9355611996` in the codebase and replace it.

---

## 🎨 Brand Colors
```
Aviation Blue:  #0a2342
Navy:           #0d3060  
Orange:         #f97316
Sky Blue:       #0ea5e9
```
