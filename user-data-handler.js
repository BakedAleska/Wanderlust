const fs = require('fs');
const path = require('path');
const { app } = require('electron');
const userDataPath = path.join(app.getPath('userData'), 'user-data.json');

function increment_page() {
  let data = {};
  try {
    data = JSON.parse(fs.readFileSync(userDataPath));
  } catch {}
  data.page = (data.page || 0) + 1;
  fs.writeFileSync(userDataPath, JSON.stringify(data, null, 2));
}

function get_data(key) {
  try {
    const data = JSON.parse(fs.readFileSync(userDataPath));
    return data[key] || 0;
  } catch {
    return 0;
  }
}

module.exports = {
  increment_page,
  get_data
};
