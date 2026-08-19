/* ╔══════════════════════════════════════════════════════════╗
   ║  IRAV Press Kit — JavaScript                             ║
   ║  Vanilla JS, sin dependencias                            ║
   ╚══════════════════════════════════════════════════════════╝ */

/* ── Navbar scroll effect ── */
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function () {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ── Mobile menu ── */
var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

function closeMenu() {
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Scroll reveal animations ── */
var reveals = document.querySelectorAll('.scroll-reveal');
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(function (el) { observer.observe(el); });

/* ── Gallery lightbox ── */
var galleryPhotos = [
  'img/IMG_0046.JPG',
  'img/IMG_0071.JPG',
  'img/IMG_0082.JPG',
  'img/IMG_0085.JPG',
  'img/IMG_0105.JPG',
  'img/IMG_0107.JPG',
  'img/IMG_0154.JPG',
  'img/IMG_0158.JPG',
  'img/IMG_0168.JPG'
];

var currentPhoto = 0;
var lightbox = document.getElementById('lightbox');
var lightboxImg = document.getElementById('lightboxImg');

function openLightbox(index) {
  currentPhoto = index;
  lightboxImg.src = galleryPhotos[index];
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function prevPhoto() {
  currentPhoto = currentPhoto > 0 ? currentPhoto - 1 : galleryPhotos.length - 1;
  lightboxImg.src = galleryPhotos[currentPhoto];
}

function nextPhoto() {
  currentPhoto = currentPhoto < galleryPhotos.length - 1 ? currentPhoto + 1 : 0;
  lightboxImg.src = galleryPhotos[currentPhoto];
}

document.addEventListener('keydown', function (e) {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevPhoto();
  if (e.key === 'ArrowRight') nextPhoto();
});
