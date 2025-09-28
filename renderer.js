// Once the DOM is ready, attach.
window.addEventListener('DOMContentLoaded', () => {
  const home_btn = document.querySelector('.menu-button');
  const scenarioSection = document.getElementById('scenario');
  const homeSection = document.getElementById('home');
  let choice_1_btn = document.getElementById('choice-1');
  let choice_2_btn = document.getElementById('choice-2');

  if (!choice_1_btn || !choice_2_btn || !home_btn || !scenarioSection || !homeSection) return;

  scenarioSection.setAttribute('aria-hidden', 'false');
  scenarioSection.style.display = '';
  homeSection.setAttribute('aria-hidden', 'true');
  homeSection.style.display = 'none';

  // On initial load, reset game and generate first scenario
  window.electronAPI.restartGame().then(() => {
    window.electronAPI.getScenario().then(({ prompt, choices }) => {
      document.querySelector('.scenario-paragraph').textContent = prompt;
      document.getElementById('choice-1').textContent = choices[0];
      document.getElementById('choice-2').textContent = choices[1];
      resetChoiceButtons();
    });
  });

  home_btn.addEventListener('click', () => {
    scenarioSection.setAttribute('aria-hidden', 'true');
    scenarioSection.style.display = 'none';
    homeSection.setAttribute('aria-hidden', 'false');
    homeSection.style.display = '';
    document.querySelectorAll('.rect').forEach(rect => {
      rect.removeEventListener('click', startScenario);
      rect.addEventListener('click', startScenario);
    });
  });

  function startScenario() {
    window.electronAPI.restartGame().then(() => {
      scenarioSection.setAttribute('aria-hidden', 'false');
      scenarioSection.style.display = '';
      homeSection.setAttribute('aria-hidden', 'true');
      homeSection.style.display = 'none';
      window.electronAPI.getScenario().then(({ prompt, choices }) => {
        document.querySelector('.scenario-paragraph').textContent = prompt;
        document.getElementById('choice-1').textContent = choices[0];
        document.getElementById('choice-2').textContent = choices[1];
        resetChoiceButtons();
      });
    });
  }

  document.querySelectorAll('.rect').forEach(rect => {
    rect.addEventListener('click', startScenario);
  });

  function appendAnswerToHistory(answerText) {
    const match = answerText.match(/^(.*) \[/);
    const cleanText = match ? match[1].trim() : answerText.trim();
    window.electronAPI.appendAnswer(cleanText);
  }

  function showEndGameButtons() {
    // Confetti effect when game ends
    import('canvas-confetti').then(confetti => {
      confetti.default({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
      });
    });
    choice_1_btn.textContent = 'Choose a different scenario';
    choice_2_btn.textContent = 'Replay';
    choice_1_btn.onclick = () => {
      scenarioSection.setAttribute('aria-hidden', 'true');
      scenarioSection.style.display = 'none';
      homeSection.setAttribute('aria-hidden', 'false');
      homeSection.style.display = '';
      document.querySelectorAll('.rect').forEach(rect => {
        rect.removeEventListener('click', startScenario);
        rect.addEventListener('click', startScenario);
      });
    };
    choice_2_btn.onclick = () => {
      window.electronAPI.restartGame().then(() => {
        window.electronAPI.getScenario().then(({ prompt, choices }) => {
          document.querySelector('.scenario-paragraph').textContent = prompt;
          document.getElementById('choice-1').textContent = choices[0];
          document.getElementById('choice-2').textContent = choices[1];
          resetChoiceButtons();
        });
      });
    };
  }

  function resetChoiceButtons() {
    // Replace buttons to clear old handlers without clearing text
    const newChoice1 = choice_1_btn.cloneNode(true);
    const newChoice2 = choice_2_btn.cloneNode(true);

    choice_1_btn.parentNode.replaceChild(newChoice1, choice_1_btn);
    choice_2_btn.parentNode.replaceChild(newChoice2, choice_2_btn);

    choice_1_btn = newChoice1;
    choice_2_btn = newChoice2;

    // Re-attach handlers
    choice_1_btn.addEventListener('click', choice1Handler);
    choice_2_btn.addEventListener('click', choice2Handler);
  }

  function choice1Handler() {
    appendAnswerToHistory(document.getElementById('choice-1').textContent);
    window.electronAPI.getScenario().then(({ prompt, choices }) => {
      document.querySelector('.scenario-paragraph').textContent = prompt;
      document.getElementById('choice-1').textContent = choices[0];
      document.getElementById('choice-2').textContent = choices[1];
      if (prompt === 'Thank you for playing!') {
        showEndGameButtons();
      }
    });
  }

  function choice2Handler() {
    appendAnswerToHistory(document.getElementById('choice-2').textContent);
    window.electronAPI.getScenario().then(({ prompt, choices }) => {
      document.querySelector('.scenario-paragraph').textContent = prompt;
      document.getElementById('choice-1').textContent = choices[0];
      document.getElementById('choice-2').textContent = choices[1];
      if (prompt === 'Thank you for playing!') {
        showEndGameButtons();
      }
    });
  }

  // Attach handlers initially
  choice_1_btn.addEventListener('click', choice1Handler);
  choice_2_btn.addEventListener('click', choice2Handler);
});
