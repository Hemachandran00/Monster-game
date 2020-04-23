const attackVal = 10;
const monsterAttackVal = 14;
const strongAttackVal = 18;
const healVal = 8;
const modeAttack = "ATTACK";
const modeStrongAttack = "STRONG ATTACK";
const logEventPAttack = "PLAYER ATTACK";
const logEventPStrongAttack = "PLAYER STRONG ATTACK";
const logEventMAttack = "MONSTER ATTACK";
const logEventPHeal = "PLAYER_HEAL";
const logEventGameOver = "GAME OVER";

let battleLog = [];
function getMaxLifeVal() {
  const UserInput = prompt("Maximum life for you and the monster", "100");
  const inputVal = parseInt(UserInput);
  if (isNaN(inputVal) || inputVal <= 0) {
    alert("Invalid user input entered");
    throw {
      message:
        "The input is not a number or less than 0 . A default value 100 is assigned .",
    };
  } else if (inputVal > 1000) {
    alert("The value is too high!");
    throw {
      message: "The value is too high . A default value 100 is assigned .",
    };
  }
  return inputVal;
}
try {
  let chosenMaxLife = getMaxLifeVal();
} catch (error) {
  console.log(error);
} finally {
  chosenMaxLife = 100;
}
let currentMHealth = chosenMaxLife;
let currentPHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeLog(event, value, finalMonsterHealth, finalPlayerHealth) {
  let logEntry;
  if (event === logEventPAttack) {
    logEntry = {
      event: event,
      value: value,
      target: "MONSTER",
      finalMonsterHealth: finalMonsterHealth,
      finalPlayerHealth: finalPlayerHealth,
    };
  } else if (event === logEventPStrongAttack) {
    logEntry = {
      event: event,
      value: value,
      target: "MONSTER",
      finalMonsterHealth: finalMonsterHealth,
      finalPlayerHealth: finalPlayerHealth,
    };
  } else if (event === logEventMAttack) {
    logEntry = {
      event: event,
      value: value,
      target: "PLAYER",
      finalMonsterHealth: finalMonsterHealth,
      finalPlayerHealth: finalPlayerHealth,
    };
  } else if (event === logEventPHeal) {
    logEntry = {
      event: event,
      value: value,
      target: "PLAYER",
      finalMonsterHealth: finalMonsterHealth,
      finalPlayerHealth: finalPlayerHealth,
    };
  } else if (event === logEventGameOver) {
    logEntry = {
      event: event,
      value: value,
      finalMonsterHealth: finalPlayerHealth,
      finalPlayerHealth: finalPlayerHealth,
    };
  }
  battleLog.push(logEntry);
}

function reset() {
  currentMHealth = chosenMaxLife;
  currentPHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerLife = currentPHealth;
  const playerDamage = dealPlayerDamage(monsterAttackVal);
  currentPHealth -= playerDamage;
  writeLog(logEventMAttack, playerDamage, currentMHealth, currentPHealth);

  if (currentPHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPHealth = initialPlayerLife;
    setPlayerHealth(initialPlayerLife);
    alert("You got a new life");
  }

  if (currentMHealth <= 0 && currentPHealth > 0) {
    alert("Hoooray , You won : ) !!!");
    writeLog(logEventGameOver, "player won", currentMHealth, currentPHealth);
  } else if (currentPHealth <= 0 && currentMHealth > 0) {
    alert("OOPS , You lost :( ");
    writeLog(logEventGameOver, "monster won", currentMHealth, currentPHealth);
  } else if (currentPHealth <= 0 && currentMHealth <= 0) {
    alert("You have a draw");
    writeLog(logEventGameOver, "draw", currentMHealth, currentPHealth);
  }

  if (currentMHealth <= 0 || currentPHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage;
  let logEvent;
  if (mode === modeAttack) {
    maxDamage = attackVal;
    logEvent = logEventPAttack;
  } else if (mode === modeStrongAttack) {
    maxDamage = strongAttackVal;
    logEvent = logEventPStrongAttack;
  }

  const damage = dealMonsterDamage(maxDamage);
  currentMHealth -= damage;
  writeLog(logEvent, damage, currentMHealth, currentPHealth);
  endRound();
}

function attackHandler() {
  attackMonster(modeAttack);
}

function strongAttackHandler() {
  attackMonster(modeStrongAttack);
}

function healPlayerHandler() {
  let healPlayerValue;
  if (currentPHealth >= chosenMaxLife - healVal) {
    alert("You can't heal more than max");
    healPlayerValue = chosenMaxLife - currentPHealth;
  } else {
    healPlayerValue = healVal;
  }
  increasePlayerHealth(healVal);
  currentPHealth += healVal;
  writeLog(logEventPHeal, healVal, currentMHealth, currentPHealth);

  endRound();
}

let sum = 0;
for (let i = 2; i <= 6; i++) {
  sum = sum + i;
}
console.log(sum);

function printLogHandler() {
  let i = 0;
  for (const logEntry of battleLog) {
    console.log(`#${i}`);
    for (const key in logEntry) {
      console.log(key);
      console.log(logEntry[key]);
    }
    i++;
  }
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
