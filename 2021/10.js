const closing = { '(': ')', '[': ']', '{': '}', '<': '>' };
const opening = Object.keys(closing);

exports.partOne = (data, _utils) => {
  const map = { ')': 0, ']': 0, '}': 0, '>': 0 };
  data.forEach(line => {
    const stack = [];
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (opening.includes(char)) stack.push(char);
      else {
        const expected = closing[stack.pop()];
        if (char !== expected) {
          map[char] += 1;
        }
      }
    }
  });
  const charScore = { ')': 3, ']': 57, '}': 1197, '>': 25137 };
  const score = Object.entries(map).reduce(
    (a, [char, num]) => a + num * charScore[char],
    0
  );
  console.log(`👀 >>>>> Syntax error score:`, score);
};

exports.partTwo = (data, _utils) => {
  const scores = [];
  data.forEach(line => {
    const stack = [];
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (opening.includes(char)) stack.push(char);
      else if (char !== closing[stack.pop()]) return; // bail on this one
    }

    if (stack.length) {
      const completion = stack.reverse().map(x => closing[x]);
      const charScore = { ')': 1, ']': 2, '}': 3, '>': 4 };
      let score = 0;
      for (let i = 0; i < completion.length; i++) {
        const char = completion[i];
        score = score * 5 + charScore[char];
      }
      scores.push(score);
    }
  });
  scores.sort((a, b) => a - b);
  const middleScore = scores[Math.floor(scores.length / 2)];
  console.log(`👀 >>>>> Middle autocomplete score:`, middleScore);
};
