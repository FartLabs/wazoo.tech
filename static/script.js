// Retro-Futurism Premium Website - Interactive Features

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll Progress Bar
  function initScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (!scrollProgress) return;

    function updateScrollProgress() {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();
  }

  // Scroll Reveal Animation
  function initScrollReveal() {
    if (prefersReducedMotion) {
      // Activate all reveals immediately if reduced motion
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
      return;
    }

    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length === 0) return;

    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Optional: unobserve after animation to improve performance
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    reveals.forEach(reveal => observer.observe(reveal));
  }

  // Navigation Dots
  function initNavigationDots() {
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section[id]');

    if (navDots.length === 0 || sections.length === 0) return;

    function updateActiveDot() {
      const scrollPos = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const dot = document.querySelector(`.nav-dot[data-section="${section.id}"]`);

        if (dot && scrollPos >= sectionTop && scrollPos < sectionBottom) {
          navDots.forEach(d => d.classList.remove('active'));
          dot.classList.add('active');
        }
      });
    }

    // Smooth scroll for nav dots
    navDots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = dot.getAttribute('data-section');
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          const headerOffset = 80;
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    window.addEventListener('scroll', updateActiveDot, { passive: true });
    updateActiveDot();
  }

  // Parallax Effect for Hero Section
  function initParallax() {
    if (prefersReducedMotion) return;

    const heroSection = document.querySelector('.hero-section');
    const floatingShapes = document.querySelectorAll('.floating-shape');

    if (!heroSection || floatingShapes.length === 0) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroHeight = heroSection.offsetHeight;
      
      if (scrolled < heroHeight) {
        const parallaxValue = scrolled * 0.5;
        heroSection.style.transform = `translateY(${parallaxValue * 0.3}px)`;
        
        floatingShapes.forEach((shape, index) => {
          const speed = 0.2 + (index * 0.1);
          shape.style.transform = `translateY(${parallaxValue * speed}px)`;
        });
      }
    }, { passive: true });
  }

  // Smooth Scroll for Anchor Links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#top') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Interactive Card Enhancements
  function initInteractiveCards() {
    const cards = document.querySelectorAll('.highlight-card, .company-card');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    cards.forEach(card => {
      // Add click interaction for cards
      card.addEventListener('click', function(e) {
        // Don't trigger if clicking a link
        if (e.target.tagName === 'A' || e.target.closest('a')) {
          return;
        }

        // Add a subtle pulse effect
        this.style.animation = 'none';
        setTimeout(() => {
          this.style.animation = 'pulse 0.3s ease';
        }, 10);
      });

      // Enhanced hover effect with mouse tracking (desktop only)
      if (!isTouchDevice && !prefersReducedMotion) {
        card.addEventListener('mousemove', function(e) {
          const rect = this.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = (y - centerY) / 20;
          const rotateY = (centerX - x) / 20;

          this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', function() {
          this.style.transform = '';
        });
      }
    });
  }

  // Header Scroll Effect
  function initHeaderScroll() {
    const header = document.querySelector('.sticky-header');
    if (!header) return;

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
      } else {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // Add pulse animation for cards
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }
  `;
  document.head.appendChild(style);

  // Initialize all features when DOM is ready
  function init() {
    initScrollProgress();
    initScrollReveal();
    initNavigationDots();
    initParallax();
    initSmoothScroll();
    initInteractiveCards();
    initHeaderScroll();
  }

  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-initialize on resize (for responsive adjustments)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Recalculate scroll positions
      const event = new Event('scroll');
      window.dispatchEvent(event);
    }, 250);
  }, { passive: true });

})();

