const readline = require("readline");
const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout,
});

const players = [];
let roundCounter = 1;

const getPlayersFromUser = () => {
  return new Promise((resolve, reject) => {
    rl.question(
      "Please enter names of your players (mininmum 2, maximum 7) separated by comas only: ",
      (names) => {
        const playersNames = names.split(",");
        playersNames.forEach((name) => {
          players.push({ name: name, points: 0 });
        });
        resolve();
      }
    );
  });
};

function oddEvenSingleRound(player1, player2) {
  const randomNum = Math.floor(Math.random() * (13 - -5) - 5);
  const scored = randomNum % 2 == 1 ? player1 : player2;
  const missed = scored === player1 ? player2 : player1;
  console.log(`Round #${roundCounter++}, random number is ${randomNum}, ${
    scored.name
  } scored!
Status: ${scored.name} ${++scored.points}, ${missed.name} ${missed.points}`);
}

function tournament(playersArray, bestOf) {
  const threshold = Math.ceil(bestOf / 2);
  while (true) {
    const position1 = Math.floor(Math.random() * playersArray.length);
    let position2 = Math.floor(Math.random() * playersArray.length);
    position2 =
      position1 !== position2
        ? position2
        : position1 !== 0
        ? playersArray.length - position1
        : position1 + 1;
    const firstPlayer = playersArray[position1];
    const secondPlayer = playersArray[position2];
    oddEvenSingleRound(firstPlayer, secondPlayer);
    if (firstPlayer.points >= threshold) {
      console.log(`${firstPlayer.name} Wins!`);
      break;
    }
    if (secondPlayer.points >= threshold) {
      console.log(`${secondPlayer.name} Wins!`);
      break;
    }
  }
  return;
}

const main = async () => {
  await getPlayersFromUser();
  rl.close();
  tournament(players, 5);
};
main();
