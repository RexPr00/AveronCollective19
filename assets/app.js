const focusableSelectors = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

function trapFocus(container, event) {
  const focusables = [...container.querySelectorAll(focusableSelectors)];
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (event.key === 'Tab') {
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}

function initLang() {
  document.querySelectorAll('[data-lang]').forEach((wrap) => {
    const trigger = wrap.querySelector('.lang-trigger');
    trigger?.addEventListener('click', () => {
      wrap.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target)) wrap.classList.remove('open');
    });
  });
}

function initFaq() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item) => {
    const btn = item.querySelector('.faq-q');
    btn?.addEventListener('click', () => {
      items.forEach((it) => it.classList.remove('open'));
      item.classList.add('open');
    });
  });
}

function initModal() {
  const modalWrap = document.querySelector('.modal-backdrop');
  const openers = document.querySelectorAll('[data-open-privacy]');
  const closers = document.querySelectorAll('[data-close-privacy]');
  const dialog = modalWrap?.querySelector('.modal');
  if (!modalWrap || !dialog) return;

  const close = () => {
    modalWrap.classList.remove('open');
    document.body.classList.remove('lock');
  };

  openers.forEach((opener) => opener.addEventListener('click', (e) => {
    e.preventDefault();
    modalWrap.classList.add('open');
    document.body.classList.add('lock');
    dialog.querySelector('.modal-x')?.focus();
  }));

  closers.forEach((el) => el.addEventListener('click', close));
  modalWrap.addEventListener('click', (e) => {
    if (e.target === modalWrap) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalWrap.classList.contains('open')) close();
    if (modalWrap.classList.contains('open')) trapFocus(dialog, e);
  });
}

function initDrawer() {
  const drawer = document.querySelector('.drawer');
  const openBtn = document.querySelector('.burger');
  const closeBtn = document.querySelector('.drawer-close');
  const backdrop = document.querySelector('.drawer-backdrop');
  if (!drawer || !openBtn || !closeBtn || !backdrop) return;

  const open = () => {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.classList.add('lock');
    closeBtn.focus();
  };
  const close = () => {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.classList.remove('lock');
    openBtn.focus();
  };

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) close();
    if (drawer.classList.contains('open')) trapFocus(drawer, e);
  });
}

function initAnimation() {
  const blocks = document.querySelectorAll('[data-animate]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('in');
    });
  }, { threshold: 0.12 });
  blocks.forEach((b) => obs.observe(b));
}

document.addEventListener('DOMContentLoaded', () => {
  initLang();
  initFaq();
  initModal();
  initDrawer();
  initAnimation();
});
