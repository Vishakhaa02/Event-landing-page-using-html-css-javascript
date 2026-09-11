(function () {
  'use strict';

  var eventDate = new Date('2026-12-12T16:00:00+05:30').getTime();
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  function updateCountdown() {
    var remaining = eventDate - Date.now();
    if (remaining < 0) remaining = 0;
    var units = {
      days: Math.floor(remaining / 86400000),
      hours: Math.floor((remaining % 86400000) / 3600000),
      minutes: Math.floor((remaining % 3600000) / 60000),
      seconds: Math.floor((remaining % 60000) / 1000)
    };
    Object.keys(units).forEach(function (unit) {
      var element = document.getElementById(unit);
      if (element) element.textContent = String(units[unit]).padStart(2, '0');
    });
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var status = form.querySelector('.form-status');
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      status.textContent = 'Thanks - your message is on its way.';
      form.reset();
    });
  }

  var revealItems = document.querySelectorAll('.reveal, .artist-card, .schedule-row, .ticket-card, .gallery-grid img');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (item) {
      item.classList.add('will-reveal');
      observer.observe(item);
    });
  }

  var sections = document.querySelectorAll('[data-section]');
  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-links a').forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.dataset.section);
        });
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(function (section) { sectionObserver.observe(section); });
}());
