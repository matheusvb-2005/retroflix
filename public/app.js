// RETROFLIX - Global JavaScript
// Common utilities and functions

// API Base URL
const API_BASE = window.location.origin + '/api';

// Check authentication
function isAuthenticated() {
  return !!localStorage.getItem('userId');
}

// Get current user
function getCurrentUser() {
  return {
    userId: localStorage.getItem('userId'),
    username: localStorage.getItem('username'),
    favoriteGenres: JSON.parse(localStorage.getItem('favoriteGenres') || '[]')
  };
}

// Logout function
function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}

// Show notification (simple alert for now)
function showNotification(message, type = 'info') {
  console.log(`[${type.toUpperCase()}] ${message}`);
  // Could be enhanced with custom pixel art notifications
}

// Format year
function formatYear(year) {
  return year || 'N/A';
}

// Format rating
function formatRating(rating) {
  return rating ? `${rating}/10` : 'N/A';
}

// Console Easter Egg
console.log(`
  ╔════════════════════════════════════════╗
  ║   🎮 RETROFLIX DEVELOPER CONSOLE 🎮   ║
  ║                                        ║
  ║   Made with 💜 by Matheus             ║
  ║   Trabalho A3 - Banco de Dados II     ║
  ║                                        ║
  ║   Ready Player One! 🕹️                 ║
  ╚════════════════════════════════════════╝
`);

// Smooth scroll for anchors
document.addEventListener('DOMContentLoaded', () => {
  // Add smooth scrolling to all links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
