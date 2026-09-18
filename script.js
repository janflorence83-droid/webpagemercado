// Mobile navigation menu.
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Close the mobile menu after choosing a section.
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Smooth scrolling works as a fallback for browsers that do not support CSS scrolling.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Reveal sections as they enter the viewport.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

// Animate skill bars only when the skills panel is visible.
const skillsSection = document.querySelector('#skills');
const skillsObserver = new IntersectionObserver((entries) => {
  if (!entries[0].isIntersecting) return;
  document.querySelectorAll('.progress-fill').forEach((bar) => {
    bar.style.width = `${bar.dataset.percent}%`;
  });
  skillsObserver.unobserve(skillsSection);
}, { threshold: 0.3 });
skillsObserver.observe(skillsSection);

// Keep the navigation link in sync with the section currently on screen.
const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav-link');
const activeSectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navItems.forEach((item) => item.classList.toggle('active', item.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => activeSectionObserver.observe(section));

// Small welcome typing animation for the hero kicker.
const welcomeText = document.querySelector('.hero-kicker');
const originalWelcome = welcomeText.textContent;
welcomeText.textContent = '';
let welcomeIndex = 0;
const typeWelcome = () => {
  if (welcomeIndex < originalWelcome.length) {
    welcomeText.textContent += originalWelcome.charAt(welcomeIndex);
    welcomeIndex += 1;
    window.setTimeout(typeWelcome, 55);
  }
};
window.setTimeout(typeWelcome, 450);

// Front-end-only contact confirmation.
const contactForm = document.querySelector('#contact-form');
const formMessage = document.querySelector('#form-message');
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const visitorName = document.querySelector('#name').value.trim();
  formMessage.textContent = `Message queued, ${visitorName || 'player'}! I will get back to you soon.`;
  contactForm.reset();
});
