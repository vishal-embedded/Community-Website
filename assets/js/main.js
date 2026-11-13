/**
 * SiliconCraft — Global UI Controller & Standard Layout Component
 * Standard Static Architecture (No VPS / No Node server required)
 */

// 1. Initialize UI on DOM Ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSiliconCraftApp);
} else {
  initSiliconCraftApp();
}

function initSiliconCraftApp() {
  renderCommonNavbar();
  renderCommonFooter();
}

// 2. Standard Common Public Header
function renderCommonNavbar() {
  const header = document.getElementById('site-header');
  if (!header) return;

  // Determine relative prefix for assets/links if inside a subdirectory
  const isInsideAdmin = window.location.pathname.includes('/admin/');
  const rootPrefix = isInsideAdmin ? '../' : '';

  // Get active file name
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  const navItems = [
    { label: 'Home', href: rootPrefix + 'index.html', key: 'index.html' },
    { label: 'Insights', href: rootPrefix + 'insights.html', key: 'insights.html' },
    { label: 'Interviews', href: rootPrefix + 'interviews.html', key: 'interviews.html' },
    { label: 'Community', href: rootPrefix + 'community.html', key: 'community.html' },
    { label: 'Projects', href: rootPrefix + 'projects.html', key: 'projects.html' },
    { label: 'Opportunities', href: rootPrefix + 'opportunities.html', key: 'opportunities.html' },
    { label: 'About', href: rootPrefix + 'about.html', key: 'about.html' },
  ];

  const store = (typeof SiliconData !== 'undefined') ? SiliconData.get() : null;
  const isLoggedIn = store && store.currentUser && store.currentUser.email;
  const userButtonText = isLoggedIn ? 'Profile' : 'Sign In';
  const userButtonHref = isLoggedIn ? (rootPrefix + 'profile.html') : (rootPrefix + 'login.html');
  const userButtonClass = isLoggedIn ? 'btn btn-outline btn-sm' : 'btn btn-primary btn-sm';

  const desktopNavHtml = navItems.map(item => {
    const isActive = (item.key === currentPath) || (currentPath === '' && item.key === 'index.html');
    return `<a href="${item.href}" class="nav-link ${isActive ? 'active' : ''}">${item.label}</a>`;
  }).join('');

  const mobileNavHtml = navItems.map(item => {
    const isActive = (item.key === currentPath) || (currentPath === '' && item.key === 'index.html');
    return `<a href="${item.href}" class="mobile-nav-link ${isActive ? 'active' : ''}">${item.label}</a>`;
  }).join('');

  header.innerHTML = `
    <div class="container nav-wrap">
      <a href="${rootPrefix}index.html" class="brand">
        <div class="brand-icon">⚡</div>
        <span>Silicon<span class="brand-accent">Craft</span></span>
      </a>

      <nav class="nav-links">
        ${desktopNavHtml}
      </nav>

      <div class="nav-actions">
        <a href="${userButtonHref}" id="user-nav-action" class="${userButtonClass}">${userButtonText}</a>
        <button class="nav-mobile-toggle" id="nav-mobile-toggle" aria-label="Toggle Navigation" onclick="toggleMobileNav()">
          ☰
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div class="mobile-nav-drawer" id="mobile-nav-drawer">
      <div class="mobile-nav-links">
        ${mobileNavHtml}
        <div class="mobile-nav-auth">
          <a href="${userButtonHref}" class="btn btn-primary btn-block">${userButtonText}</a>
        </div>
      </div>
    </div>
  `;
}

// 3. Mobile Navigation Toggle
function toggleMobileNav() {
  const drawer = document.getElementById('mobile-nav-drawer');
  const toggleBtn = document.getElementById('nav-mobile-toggle');
  if (!drawer) return;
  const isOpen = drawer.classList.contains('active');
  if (isOpen) {
    drawer.classList.remove('active');
    if (toggleBtn) toggleBtn.textContent = '☰';
  } else {
    drawer.classList.add('active');
    if (toggleBtn) toggleBtn.textContent = '✕';
  }
}

// Auto close mobile nav when resizing to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 868) {
    const drawer = document.getElementById('mobile-nav-drawer');
    const toggleBtn = document.getElementById('nav-mobile-toggle');
    if (drawer && drawer.classList.contains('active')) {
      drawer.classList.remove('active');
      if (toggleBtn) toggleBtn.textContent = '☰';
    }
  }
});

// 4. Standard Common Public Footer
function renderCommonFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  const isInsideAdmin = window.location.pathname.includes('/admin/');
  const rootPrefix = isInsideAdmin ? '../' : '';

  footer.innerHTML = `
    <div class="container footer-grid">
      <div class="footer-brand">
        <a href="${rootPrefix}index.html" class="brand" style="margin-bottom: 0.8rem; display: inline-flex;">
          <div class="brand-icon">⚡</div>
          <span>Silicon<span class="brand-accent">Craft</span></span>
        </a>
        <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; max-width: 360px; margin-bottom: 1.2rem;">
          A community-driven knowledge ecosystem bridging the gap between college education and real industry expectations in Embedded Systems, Electronics, VLSI, and Semiconductors.
        </p>
        <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--neon-pink);">
          Built for serious engineers and students.
        </div>
      </div>

      <div>
        <h4 class="footer-heading">Platform</h4>
        <div class="footer-links">
          <a href="${rootPrefix}insights.html" class="footer-link">Industry Insights</a>
          <a href="${rootPrefix}interviews.html" class="footer-link">Engineer Interviews</a>
          <a href="${rootPrefix}community.html" class="footer-link">Community Discussions</a>
          <a href="${rootPrefix}projects.html" class="footer-link">Project Showcase</a>
          <a href="${rootPrefix}opportunities.html" class="footer-link">Career Opportunities</a>
          <a href="${rootPrefix}about.html" class="footer-link">About Our Mission</a>
        </div>
      </div>

      <div>
        <h4 class="footer-heading">Domains</h4>
        <div class="footer-links">
          <a href="${rootPrefix}insights.html" class="footer-link">Embedded Systems & Firmware</a>
          <a href="${rootPrefix}insights.html" class="footer-link">Embedded Linux & Kernel</a>
          <a href="${rootPrefix}insights.html" class="footer-link">VLSI & Digital Design</a>
          <a href="${rootPrefix}insights.html" class="footer-link">Automotive Electronics & CAN</a>
          <a href="${rootPrefix}projects.html" class="footer-link">PCB Design & Hardware</a>
        </div>
      </div>
    </div>

    <div class="container footer-bottom">
      <div class="footer-copy">
        © 2026 SiliconCraft. Built for the next generation of hardware & silicon engineers. Zero AI slop.
      </div>
      <div class="footer-badges">
        <span class="badge badge-circuit" style="font-size: 0.75rem;">Pure Vanilla Stack</span>
        <span class="badge badge-pink" style="font-size: 0.75rem;">⚡ Silicon Ready</span>
      </div>
    </div>
  `;
}

// 5. Modal Helpers
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}

function closeAllModals() {
  document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllModals();
});

// 6. Toast Notification System
function showToast(message, type = 'info') {
  let toast = document.getElementById('silicon-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'silicon-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      background: var(--bg-surface-elevated, #1b1f30);
      color: #fff;
      border: 1px solid var(--neon-pink, #ff2a85);
      border-radius: 12px;
      padding: 0.75rem 1.25rem;
      font-size: 0.85rem;
      font-family: var(--font-mono, monospace);
      box-shadow: 0 10px 30px rgba(0,0,0,0.8), 0 0 15px rgba(255,42,133,0.3);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateY(10px);
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span style="color: var(--neon-pink, #ff2a85);">⚡</span> ${message}`;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 2800);
}

// 7. Upvoting & Bookmarking
function likePost(id) {
  if (typeof SiliconData === 'undefined') return;
  const store = SiliconData.get();
  const p = store.posts.find(x => x.id === id);
  if (p) {
    p.likes = (p.likes || 0) + 1;
    SiliconData.save(store);
    showToast(`Appreciated post! (${p.likes} total)`);
    const countEl = document.getElementById(`likes-post-${id}`) || document.getElementById(`like-count-${id}`);
    if (countEl) countEl.textContent = p.likes;
  }
}

function likeProject(id) {
  if (typeof SiliconData === 'undefined') return;
  const store = SiliconData.get();
  const p = store.projects.find(x => x.id === id);
  if (p) {
    p.likes = (p.likes || 0) + 1;
    SiliconData.save(store);
    showToast(`Starred project! (${p.likes} total)`);
    const countEl = document.getElementById(`likes-proj-${id}`) || document.getElementById(`likes-count-${id}`);
    if (countEl) countEl.textContent = p.likes;
  }
}

function toggleBookmark(id) {
  if (typeof SiliconData === 'undefined') return;
  const store = SiliconData.get();
  if (!store.currentUser) store.currentUser = { bookmarks: [] };
  if (!store.currentUser.bookmarks) store.currentUser.bookmarks = [];
  const b = store.currentUser.bookmarks;
  if (b.includes(id)) {
    store.currentUser.bookmarks = b.filter(x => x !== id);
    showToast('Removed from bookmarks');
  } else {
    store.currentUser.bookmarks.push(id);
    showToast('Saved to bookmarks!');
  }
  SiliconData.save(store);
}
