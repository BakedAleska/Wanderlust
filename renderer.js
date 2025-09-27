// Once the DOM is ready, attach.
window.addEventListener('DOMContentLoaded', () => {
  const home_btn = document.querySelector('.menu-button');
  const scenario_btn = document.querySelector('.rect')
  const scenarioSection = document.getElementById('scenario');
  const homeSection = document.getElementById('home');

  if (!btn || !scenarioSection || !homeSection) return;

  scenarioSection.setAttribute('aria-hidden', 'false');
  scenarioSection.style.display = '';
  homeSection.setAttribute('aria-hidden', 'true');
  homeSection.style.display = 'none';

  home_btn.addEventListener('click', () => {
    if (scenarioSection && homeSection) {
      scenarioSection.setAttribute('aria-hidden', 'true');
      homeSection.setAttribute('aria-hidden', 'false');
      scenarioSection.style.display = 'none';
      homeSection.style.display = '';
    }
  });

  scenario_btn.addEventListener('click', () => {
    
  })
})
