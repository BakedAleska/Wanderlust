// Once the DOM is ready, attach.
window.addEventListener('DOMContentLoaded', () => {
  const home_btn = document.querySelector('.menu-button');
  const scenarioSection = document.getElementById('scenario');
  const homeSection = document.getElementById('home');

  if (!home_btn || !scenarioSection || !homeSection) return;

  scenarioSection.setAttribute('aria-hidden', 'false');
  scenarioSection.style.display = '';
  homeSection.setAttribute('aria-hidden', 'true');
  homeSection.style.display = 'none';

  home_btn.addEventListener('click', () => {
    scenarioSection.setAttribute('aria-hidden', 'true');
    scenarioSection.style.display = 'none';
    homeSection.setAttribute('aria-hidden', 'false');
    homeSection.style.display = '';
  });

  // Set up click listeners for all rectangles
  document.querySelectorAll('.rect').forEach(rect => {
    rect.addEventListener('click', () => {
      // Example: switch to scenario view when a rectangle is clicked
      scenarioSection.setAttribute('aria-hidden', 'false');
      scenarioSection.style.display = '';
      homeSection.setAttribute('aria-hidden', 'true');
      homeSection.style.display = 'none';
    });
  });
});
