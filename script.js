// Rolagem suave ao clicar nos links do menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Exemplo simples de envio de formulário (pode ser integrado com backend)
const form = document.querySelector('.form-contato');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    form.reset();
  });
}

// Animações de entrada ao rolar a página
const animatedElements = document.querySelectorAll('[data-animate]');

// Define atrasos incrementais para cards quando existirem
document.querySelectorAll('.cards').forEach(group => {
  group.querySelectorAll('[data-animate]').forEach((el, index) => {
    el.style.setProperty('--delay', `${index * 120}ms`);
  });
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  animatedElements.forEach(el => el.classList.add('is-visible'));
} else if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        entry.target.classList.remove('is-visible');
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -10%'
  });

  animatedElements.forEach(el => observer.observe(el));
} else {
  animatedElements.forEach(el => el.classList.add('is-visible'));
}

// Controle das abas de atuação
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('[data-tab-panel]');

if (tabButtons.length) {
  function activateTab(targetId) {
    tabButtons.forEach(btn => {
      const isActive = btn.dataset.tab === targetId;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
      btn.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    tabPanels.forEach(panel => {
      const isActive = panel.dataset.tabPanel === targetId;
      panel.classList.toggle('is-active', isActive);
      panel.toggleAttribute('hidden', !isActive);
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
    btn.addEventListener('keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

      event.preventDefault();
      const currentIndex = Array.from(tabButtons).indexOf(btn);
      const offset = event.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (currentIndex + offset + tabButtons.length) % tabButtons.length;
      const nextButton = tabButtons[nextIndex];
      nextButton.focus();
      activateTab(nextButton.dataset.tab);
    });
  });

  const defaultTab = document.querySelector('.tab-button.is-active');
  if (defaultTab) {
    activateTab(defaultTab.dataset.tab);
  }
}
