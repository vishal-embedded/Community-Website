# ⚡ SiliconCraft — Production Platform

A fast, lightweight, production-ready community and knowledge platform built for the next generation of **Embedded Systems, Electronics, VLSI, and Semiconductor** enthusiasts.

---

## 🎯 Platform Vision & Mission

> "A community-driven platform for Embedded Systems, Electronics, VLSI, and Semiconductor enthusiasts, aimed at bridging the gap between college education and real industry expectations.
>
> Through conversations with industry professionals, engineers, researchers, founders, and technical leaders, we share real career journeys, industry insights, skill requirements, projects, opportunities, and practical guidance.
>
> The goal is to ensure that students interested in these fields don't struggle for years without direction—and instead have access to a central place to learn, connect, share projects, ask questions, and grow with guidance from people already working in the industry.
>
> In short: **A platform built to help the next generation of hardware and embedded engineers find the guidance you wish you had.**"

---

## 💎 Visual Design System

- **Background Canvas**: Deep Charcoal / Pure Black (`#06070a`, `#0c0e14`, `#131722`)
- **Primary Accent**: **Neon Pink** (`#ff2a85`, `rgba(255, 42, 133, 0.15)`)
- **Signal Highlights**: Circuit Cyan (`#00f0ff`), Logic High Green (`#00e676`), Warning Red (`#ff5555`)
- **Aesthetic**: Engineering hardware feel with subtle animated circuit board traces and signal pulses on an HTML5 canvas.

---

## 🌐 Public Website Navigation (7 Core Pages)

Strictly structured for clarity and focus:

1. **[Home](file:///Users/vishal/Documents/Community-Website/index.html)** (`index.html`) — Hero with animated circuit canvas, featured industry interviews, latest technical guides, community discussions, hardware projects showcase, and career opportunities.
2. **[Insights](file:///Users/vishal/Documents/Community-Website/insights.html)** (`insights.html`) — In-depth technical articles, register-level tutorials (DMA, UART, STM32, RTOS mutexes), category filter tabs, and modal guide reader.
3. **[Interviews](file:///Users/vishal/Documents/Community-Website/interviews.html)** (`interviews.html` & `interview-detail.html`) — Unvarnished conversations with engineers from Texas Instruments, Qualcomm, Bosch, and STMicro detailing career journeys, hiring realities, and 5 key takeaways.
4. **[Community](file:///Users/vishal/Documents/Community-Website/community.html)** (`community.html` & `post-detail.html`) — Peer discussion board, technical Q&A, build logs, upvoting, and verified solutions.
5. **[Projects](file:///Users/vishal/Documents/Community-Website/projects.html)** (`projects.html` & `project-detail.html`) — Verified hardware showcase featuring BOM lists, schematics, engineering problem/solution breakdowns, and GitHub repositories.
6. **[Opportunities](file:///Users/vishal/Documents/Community-Website/opportunities.html)** (`opportunities.html`) — Curated board for firmware/semiconductor internships, fresher openings, and national hardware hackathons.
7. **[About](file:///Users/vishal/Documents/Community-Website/about.html)** (`about.html`) — Personal, authentic story and mission. Zero AI slop or corporate buzzwords.

---

## 🔐 Secret Admin Access & Security (`/arthurmorgan`)

The Admin Panel is **completely hidden and secured**:

- **Secret Admin URL**: To access the admin login page, simply type **`/arthurmorgan`** in your browser's address bar:
  - Live Domain: `https://domainname.in/arthurmorgan` (or `https://domainname.in/arthurmorgan.html`)
  - Local Preview: `http://localhost:8000/arthurmorgan` (or `file:///.../arthurmorgan.html`)
- **Zero Exposed Links**: There are **no visible admin links** on the public website. Regular visitors will never know where the admin console is located.
- **Pre-Render Security Guard**: Every admin page inside `/admin/` includes `assets/js/admin-guard.js` at the top of `<head>`. If anyone tries to open any admin URL directly without logging in, they are immediately bounced back to `/arthurmorgan.html`.
- **Master Admin Password**:
  - **Username**: `admin`
  - **Default Passkey**: `siliconcraft@admin2026`
  - **Customizable**: You can change this master passkey at any time inside **Admin > Settings** (`admin/settings.html`).
- **Session Protection**: Successful authentication writes an isolated session token to `sessionStorage`. Clicking **Sign Out** clears the session and returns to `/arthurmorgan.html`.

### Admin CMS Suite (`/admin/`):
- `arthurmorgan.html` — Secret Arthur Morgan administrative login gate.
- `arthurmorgan/index.html` — Clean directory-level fallback for all web servers.
- `admin/dashboard.html` — Real-time metrics overview and central **Pending Moderation Queue** for one-click verification of project applications and job opportunities.
- `admin/articles.html` — Create, edit, toggle draft/publish, and delete articles.
- `admin/editor.html` — Rich technical article composer with Markdown & HTML formatting toolbar.
- `admin/interviews.html` — Manage expert interviews and structured Q&A.
- `admin/community.html` — Moderate discussions, verify accepted solutions, and clean spam.
- `admin/projects.html` — **Project Moderation Console**: Split into *Pending Approvals* and *Live Showcase*. Displays applicant contact emails with one-click `mailto:` mail composer, schematic links, and Accept/Reject buttons.
- `admin/opportunities.html` — **Opportunity Verification Console**: Split into *Pending Verification* and *Live Board*. Displays submitter/HR emails with one-click `mailto:` composer, eligibility, and Accept/Reject buttons.
- `admin/settings.html` — Change master admin password, export full JSON backup, restore data, or factory reset.

---

## 🛡️ Content Submission & Moderation Pipeline

To maintain high engineering standards and protect students from spam:

1. **Hardware Projects (`projects.html` & `index.html`)**:
   - Submissions require the **Creator Contact Email**, schematic repo, domain, and architecture breakdown.
   - Newly submitted projects enter `status: 'pending'` and are **NOT visible on the public website**.
   - In **Admin > Projects** (`admin/projects.html`) or the **Admin Dashboard**, the admin can review the build, click **✉ Email Creator** to request adjustments or corrections, and click **✓ Accept & Publish** to push it live to the public showcase.
2. **Career & Job Opportunities (`opportunities.html`)**:
   - Submissions require the **Submitter / HR Email**, company name, role, eligibility, and link.
   - Newly submitted opportunities enter `status: 'pending'` and remain hidden until **personally verified by the admin**.
   - In **Admin > Opportunities** (`admin/opportunities.html`), the admin verifies the listing, contacts HR directly if needed, and clicks **✓ Verify & Post** to publish.
3. **Community Discussions (`community.html`)**:
   - The Community is the open peer-to-peer exchange where students and engineers can directly ask questions, reply to threads, and share debugging updates immediately. The admin retains full deletion and verified-solution marking controls in `admin/community.html`.

---

## 🚀 How to Host on Standard Shared Hosting (No VPS Required)

You do **not** need to manage a VPS or pay expensive monthly server fees.

### 1. Standard cPanel / Shared Hosting (Hostinger, Namecheap, GoDaddy, Bluehost)
1. Log into your hosting account and open **cPanel File Manager** (or connect via FTP/SFTP).
2. Go to your web root directory (usually `public_html/`).
3. Upload all files and folders (`index.html`, `assets/`, `admin/`, etc.) into `public_html/`.
4. Your website is live immediately at your domain.

### 2. GitHub Pages (100% Free Forever)
1. Push this folder to your GitHub repository.
2. In your repo, go to **Settings > Pages**.
3. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. Live at `https://<your-username>.github.io/<repo-name>/`.

### 3. Cloudflare Pages / Netlify (Global Edge CDN)
1. Drag and drop this folder onto [Netlify Drop](https://app.netlify.com/drop) or connect your Git repo to Cloudflare Pages.
2. Leave the Build Command empty and set the Publish directory to `.`.
3. You get free automatic SSL, edge caching, and instant deployments.

---

## 💻 Local Testing
To preview the website on your computer, run:
```bash
python3 -m http.server 8000
```
Open `http://localhost:8000` in your web browser.
