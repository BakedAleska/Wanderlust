
  // Once the DOM is ready, attach.
  window.addEventListener('DOMContentLoaded', () => {
    const home_btn = document.querySelector('.menu-button');
    const scenarioSection = document.getElementById('scenario');
    const homeSection = document.getElementById('home');
    const choice_1_btn = document.getElementById('choice-1');
    const choice_2_btn = document.getElementById('choice-2');

    if (!choice_1_btn || !choice_2_btn || !home_btn || !scenarioSection || !homeSection) return;

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

    window.electronAPI.getScenario().then(scenarioText => {
      document.querySelector('.scenario-paragraph').textContent = scenarioText;
    });

    window.electronAPI.getChoices().then(choices => {
      document.getElementById('choice-1').textContent = choices[0];
      document.getElementById('choice-2').textContent = choices[1];
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

    choice_1_btn.addEventListener('click', () => {
          window.electronAPI.getScenario().then(scenarioText => {
            document.querySelector('.scenario-paragraph').textContent = scenarioText;
          });
          window.electronAPI.getChoices().then(choices => {
            document.getElementById('choice-1').textContent = choices[0];
            document.getElementById('choice-2').textContent = choices[1];
          });
    });

    choice_2_btn.addEventListener('click', () => {
          window.electronAPI.getScenario().then(scenarioText => {
            document.querySelector('.scenario-paragraph').textContent = scenarioText;
          });
          window.electronAPI.getChoices().then(choices => {
            document.getElementById('choice-1').textContent = choices[0];
            document.getElementById('choice-2').textContent = choices[1];
          });
    });
    
  });
