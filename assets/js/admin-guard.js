/**
 * SiliconCraft Admin Security Guard
 * Included in <head> of all admin pages.
 * Redirects unauthenticated visitors immediately to the Arthur Morgan gate before any admin UI is rendered.
 */
(function() {
  const isAuth = sessionStorage.getItem('siliconcraft_admin_auth') === 'true';
  if (!isAuth) {
    const path = window.location.pathname;
    if (path.includes('/admin/')) {
      window.location.replace('../arthurmorgan.html');
    }
  }

  // Centralized Admin Sign Out Handler
  window.logoutAdmin = function() {
    sessionStorage.removeItem('siliconcraft_admin_auth');
    sessionStorage.removeItem('siliconcraft_admin_time');
    window.location.href = '../arthurmorgan.html';
  };
})();
