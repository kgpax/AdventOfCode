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
    [td1, rd1] = getData(`./${year}/${day}_1.txt`);
    [td2, rd2] = getData(`./${year}/${day}_2.txt`);
    run(challenge, td1, rd1, td2);
  } catch {
    console.log(chalk.red(`Could not find AoC for ${day}/${year}`));
    await getDate();
  }
};

const run = async () => {
  console.clear();

  if (td1 || rd1) {
    console.log(chalk.magenta('PART ONE'));
    console.log('');

    if (td1?.length) {
      console.log(chalk.blue('With test data:'));
      challenge.partOne(td1, { isTest: true, isReal: false, helpers, chalk });
      console.log('');
    }

    if (rd1?.length) {
      console.log(chalk.green('With real data:'));
      challenge.partOne(rd1, { isTest: false, isReal: true, helpers, chalk });
      console.log('');
    }
  }

  if (td2?.length || rd2?.length) {
    console.log(chalk.magenta('PART TWO'));
    console.log('');

    if (td2?.length) {
      console.log(chalk.blue('With test data:'));
      challenge.partTwo(td2, { isTest: true, isReal: false, helpers, chalk });
      console.log('');
    }

    if (rd2?.length) {
      console.log(chalk.green('With real data:'));
      challenge.partTwo(rd2, { isTest: false, isReal: true, helpers, chalk });
      console.log('');
    }
  }
};

(async () => {
  const [argYear, argDay] = process.argv.splice(2);
  loadFiles(argYear, argDay);
})();
