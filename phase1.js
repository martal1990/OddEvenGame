const readline = require("readline");
const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout,
});

const playersStatuses = {
  odd: {
    name: "",
    points: 0,
  },
  even: {
    name: "",
    points: 0,
  },
};

const oddPlayer = () => {
  return new Promise((resolve, reject) => {
    rl.question(
      "Please enter name for player in the odd numbers team: ",
      (name) => {
        console.log(`Hi ${name}. You play in the odd numbers team`);
        playersStatuses.odd.name = name;
        resolve();
      }
    );
  });
};

const evenPlayer = () => {
  return new Promise((resolve, reject) => {
    rl.question(
      "Please enter name for player in the even numbers team: ",
      (name) => {
        console.log(`Hi ${name}. You play in the even numbers team`);
        playersStatuses.even.name = name;
        resolve();
      }
    );
  });
};

const main = async () => {
  await oddPlayer();
  await evenPlayer();
  rl.close();

  const { odd, even } = playersStatuses;
  let roundCounter = 1;
  while (odd.points < 3 && even.points < 3) {
    const randomNum = Math.floor(Math.random() * (13 - -5) - 5);
    const scored = randomNum % 2 == 1 ? odd : even;
    const missed = scored === odd ? even : odd;
    console.log(`Round #${roundCounter++}, random number is ${randomNum}, ${
      scored.name
    } scored!
Status: ${scored.name} ${++scored.points}, ${missed.name} ${missed.points}`);

    if (roundCounter >= 3 && odd.points >= 3) {
      console.log(`${odd.name} Wins!`);
      break;
    }

    if (roundCounter >= 3 && even.points >= 3) {
      console.log(`${even.name} Wins!`);
      break;
    }
  }
  return;
};

main();
