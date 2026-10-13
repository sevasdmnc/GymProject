document.addEventListener('DOMContentLoaded', () => {
  const currentYear = new Date().getFullYear();
  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = currentYear;
  });

  document.querySelectorAll('.nav-toggle').forEach((toggle) => {
    const menu = document.getElementById(toggle.getAttribute('aria-controls'));
    if (!menu) return;

    const closeMenu = () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      toggle.textContent = '☰';
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
      toggle.textContent = isOpen ? '☰' : '×';
      menu.classList.toggle('is-open', !isOpen);
    });

    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  });

  const tabs = document.querySelectorAll('.tab[data-filter]');
  const cards = document.querySelectorAll('.photo-card[data-category]');
  const count = document.getElementById('photo-count');
  const emptyState = document.getElementById('empty-state');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      let visible = 0;
      const filter = tab.dataset.filter;
      tabs.forEach((item) => item.setAttribute('aria-pressed', String(item === tab)));
      cards.forEach((card) => {
        const shouldShow = filter === 'all' || card.dataset.category === filter;
        card.hidden = !shouldShow;
        if (shouldShow) visible += 1;
      });
      if (count) count.textContent = `${visible} ${visible === 1 ? 'photo' : 'photos'}`;
      if (emptyState) emptyState.hidden = visible > 0;
    });
  });

  const signupForm = document.querySelector('[data-signup-form]');
  const confirmation = document.getElementById('signup-confirmation');
  if (signupForm && confirmation) {
    const startDate = signupForm.querySelector('[name="start-date"]');
    if (startDate) {
      const today = new Date();
      startDate.min = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-');
    }

    signupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!signupForm.reportValidity()) return;
      const firstName = signupForm.elements.namedItem('full-name').value.trim().split(/\s+/)[0];
      const plan = signupForm.elements.namedItem('membership').selectedOptions[0].textContent;
      signupForm.hidden = true;
      confirmation.hidden = false;
      confirmation.querySelector('[data-confirmation-name]').textContent = firstName;
      confirmation.querySelector('[data-confirmation-plan]').textContent = plan;
      confirmation.focus();
    });
  }
});
