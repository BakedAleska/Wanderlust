const data = require('./data/scenarios.json');
const user_data_handler = require('./user-data-handler.js');

function handle_scenario() {
    const prompts = data.scenarios[0].prompts;
    const answers = data.scenarios[0].answers;

    let scenario_history = [];
    try {
        scenario_history = user_data_handler.get_data('scenario_history');
        if (!Array.isArray(scenario_history)) scenario_history = [];
    } catch {}

    let answer_history = [];
    try {
        answer_history = user_data_handler.get_data('answer_history');
        if (!Array.isArray(answer_history)) answer_history = [];
    } catch {}

    // Determine last types
    let lastPromptType = null;
    let lastAnswerType = null;
    if (scenario_history.length > 0) {
        const lastPromptText = scenario_history[scenario_history.length - 1];
        const lastPromptObj = prompts.find(p => p.text === lastPromptText);
        if (lastPromptObj) lastPromptType = lastPromptObj.category;
    }
    if (answer_history.length > 0) {
        const lastAnswerText = answer_history[answer_history.length - 1];
        const lastAnswerObj = answers.find(a => a.text === lastAnswerText);
        if (lastAnswerObj) lastAnswerType = lastAnswerObj.category;
    }

    let availablePrompts = prompts.filter(p => !scenario_history.includes(p.text));
    if (lastPromptType && lastAnswerType && lastPromptType === lastAnswerType) {
        availablePrompts = availablePrompts.filter(p => p.category === lastPromptType);
    }

    let promptObj;
    if (availablePrompts.length > 0) {
        const n = Math.floor(Math.random() * availablePrompts.length);
        promptObj = availablePrompts[n];
        user_data_handler.append_data('scenario', promptObj.text);
    } else {
        // END OF GAME
        return {
            prompt: 'Thank you for playing!',
            choices: ['Choose a different scenario', 'Replay'],
            types: ['', '']
        };
    }

    const type = promptObj.category;
    const typeAnswers = answers.filter(a => a.category === type);

    let first_choice = null;
    let second_choice = null;
    let first_type = null;
    let second_type = null;

    let first_idx = -1;
    if (typeAnswers.length > 0) {
        first_idx = Math.floor(Math.random() * typeAnswers.length);
        first_choice = typeAnswers[first_idx].text + ' [' + typeAnswers[first_idx].category + ']';
        first_type = typeAnswers[first_idx].category;
    }

    if (answers.length > 0) {
        let available = answers.filter(a => {
            if (first_idx !== -1 && a.text === typeAnswers[first_idx].text) return false;
            if (answer_history.includes(a.text)) return false;
            if (first_type && a.category === first_type) return false;
            return true;
        });
        if (available.length === 0) {
            available = answers.filter(a => {
                if (first_idx !== -1 && a.text === typeAnswers[first_idx].text) return false;
                if (first_type && a.category === first_type) return false;
                return true;
            });
        }
        if (available.length === 0) {
            available = answers.filter(a => {
                if (first_idx !== -1 && a.text === typeAnswers[first_idx].text) return false;
                return true;
            });
        }
        if (available.length > 0) {
            const idx2 = Math.floor(Math.random() * available.length);
            second_choice = available[idx2].text + ' [' + available[idx2].category + ']';
            second_type = available[idx2].category;
        }
    }

    // If no answers left, end game gracefully
    if (!first_choice && !second_choice) {
        return {
            prompt: 'Thank you for playing!',
            choices: ['Choose a different scenario', 'Replay'],
            types: ['', '']
        };
    }

    return {
        prompt: promptObj.text + ' [' + type + ']',
        choices: [first_choice || '—', second_choice || '—'],
        types: [first_type || '',    second_type || '']
    };
}

module.exports = {
    handle_scenario
};
