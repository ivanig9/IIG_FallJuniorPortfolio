// Year auto-update
function updateYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Mobile navigation toggle
function initMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Close menu when a link is clicked
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

// Close mobile menu when clicking outside
function initOutsideClickHandler() {
  const navMenu = document.getElementById('navMenu');
  if (!navMenu) return;

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
      navMenu.classList.remove('active');
    }
  });
}

// Smooth scroll behavior for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Active nav link on scroll
function initActiveNavLink() {
  const navLinks = document.querySelectorAll('.nav-menu a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;

    document.querySelectorAll('section[id]').forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}` || 
          link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Toggle CFU code display
function initCFUToggle() {
  const cfuCards = document.querySelectorAll('.cfu-card');
  
  cfuCards.forEach(card => {
    const link = card.querySelector('.cfu-link');
    const iframe = card.querySelector('.cfu-iframe');
    
    if (link && iframe) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';
        link.textContent = iframe.style.display === 'none' ? 'View Code →' : 'Hide Code →';
      });
    }
  });
}

// Intersection Observer for fade-in animations
function initIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.project-card, .cfu-card, .interest-card, .highlight-card').forEach(el => {
    observer.observe(el);
  });
}

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  updateYear();
  initMobileNav();
  initOutsideClickHandler();
  initSmoothScroll();
  initActiveNavLink();
  initCFUToggle();
  initIntersectionObserver();
});
