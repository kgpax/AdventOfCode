const readline = require('readline');

const prompt = async query =>
  new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(query, resolve);
  });

module.exports = {
  prompt,
};
