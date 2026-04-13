/* =========================================
   MENU HAMBURGER
   ========================================= */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
});

// Ferme le menu quand on clique sur un lien
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-label', 'Ouvrir le menu');
  });
});


/* =========================================
   LIGHTBOX
   ========================================= */
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

// Images de présentation (balises <img>)
document.querySelectorAll('.lightbox-trigger').forEach(img => {
  img.addEventListener('click', () => openLightbox(img.src, img.alt));
});

// Photos du bas (fonds CSS sur <li>)
document.querySelectorAll('.lightbox-bg').forEach(li => {
  li.addEventListener('click', () => openLightbox(li.dataset.src, li.dataset.alt));
});

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}


/* =========================================
   ANIMATIONS AU SCROLL (IntersectionObserver)
   ========================================= */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // déclenche une seule fois
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


/* =========================================
   FORMULAIRE DE CONTACT
   =========================================
   Option A (recommandée) : Formspree
   → Créez un compte sur https://formspree.io
   → Remplacez "VOTRE_ID" ci-dessous par votre ID de formulaire
   → Décommentez le bloc "Option A" et commentez le bloc "Option B"

   Option B (active par défaut) : mailto
   ========================================= */
document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const btn      = document.getElementById('submitBtn');
  const feedback = document.getElementById('formFeedback');
  const nom      = document.getElementById('formNom').value.trim();
  const email    = document.getElementById('formEmail').value.trim();
  const message  = document.getElementById('formMessage').value.trim();

  btn.textContent = 'Envoi en cours…';
  btn.disabled    = true;
  feedback.textContent = '';

  /* ------ Option A : Formspree (recommandée) ------
  try {
    const res = await fetch('https://formspree.io/f/VOTRE_ID', {
      method:  'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body:    JSON.stringify({ Nom: nom, email: email, Message: message })
    });

    if (res.ok) {
      feedback.style.color = '#01DF74';
      feedback.textContent = '✅ Message envoyé ! Nous vous répondrons bientôt.';
      this.reset();
    } else {
      throw new Error('Réponse serveur : ' + res.status);
    }
  } catch (err) {
    feedback.style.color = '#e74c3c';
    feedback.textContent = '❌ Une erreur s\'est produite. Veuillez réessayer.';
    console.error(err);
  } finally {
    btn.textContent = 'Envoyer';
    btn.disabled    = false;
  }
  */

  /* ------ Option B : mailto (active par défaut) ------ */
  const body = 'Nom : ' + nom + '\nE-mail : ' + email + '\n\nMessage :\n' + message;
  window.location.href =
    'mailto:ludovicjm.aime@laposte.net?subject=Contact%20Les%20Lucioles&body=' +
    encodeURIComponent(body);

  btn.textContent = 'Envoyer';
  btn.disabled    = false;
});
