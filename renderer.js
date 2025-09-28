
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
    console.log("Home button clicked.")
  });

  document.querySelectorAll('.rect').forEach(rect => {
    rect.addEventListener('click', () => {
      // TEMP (Switch to exact scenario view, must be switched to adapt.)
      scenarioSection.setAttribute('aria-hidden', 'false');
      scenarioSection.style.display = '';
      homeSection.setAttribute('aria-hidden', 'true');
      homeSection.style.display = 'none';
      
    });
  });


});
