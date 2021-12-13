const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const helpers = require('./helpers');

const getData = file => {
  const filePath = path.resolve(file);
  if (!fs.existsSync(filePath)) return [undefined, undefined];
  const lines = fs.readFileSync(filePath, 'UTF-8').split('\n');
  const splitIdx = lines.indexOf('===');
  if (splitIdx === -1) return [lines, undefined];
  const testData = lines.splice(0, splitIdx);
  const realData = lines.splice(1);
  return [testData, realData];
};

const getDate = async () => {
  const input = await helpers.prompt('Enter a year and day (YYYY DD): ');
  const [year, day] = input.split(' ');
  if (!year || !day) {
    console.log(chalk.red(`You must specify a year and day!`));
    await getDate();
  } else {
    await loadFiles(year, day);
  }
};

const loadFiles = async (year, day) => {
  try {
    challenge = require(`./${year}/${day}`);
    [testData, realData] = getData(`./${year}/${day}.txt`);
    run(challenge, testData, realData);
  } catch {
    console.log(chalk.red(`Could not find AoC for ${day}/${year}`));
    await getDate();
  }
};

const hasFunction = fn =>
  typeof fn === 'function' && !fn.toString().endsWith('{}');

const run = async (challenge, testData, realData) => {
  console.clear();

  const passes = [
    { heading: 'PART ONE', fn: 'partOne' },
    { heading: 'PART TWO', fn: 'partTwo' },
  ];

  for (const { heading, fn } of passes) {
    if (hasFunction(challenge[fn])) {
      console.log(chalk.magenta(heading));
      console.log('');

      if (testData?.length) {
        console.log(chalk.blue('With test data:'));
        challenge[fn](testData, {
          isTest: true,
          isReal: false,
          helpers,
          chalk,
        });
        console.log('');
      }

      if (realData?.length) {
        console.log(chalk.blue('With real data:'));
        challenge[fn](realData, {
          isTest: false,
          isReal: true,
          helpers,
          chalk,
        });
        console.log('');
      }
    }
  }
};

(async () => {
  const [argYear, argDay] = process.argv.splice(2);
  loadFiles(argYear, argDay);
})();
