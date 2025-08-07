let xp = 0;
let health = 100;
let gold = 50;
let currentWeaponIndex = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
let counterAttack = 0;

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  {name: "stick", power: 5},
  {name: "dagger", power: 30},
  {name: "claw hammer", power: 50},
  {name: "sword", power: 100}
];
const monsters = [
  {name: "Slime", level: 2, health: 15},
  {name: "Fanged Beast", level: 8, health: 60},
  {name: "Dragon", level: 20, health: 300}
];

const locations = [
  {
    name: "Town",
    "button text": ["Go to Store", "Go to Cave", "Fight Dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the Town, standing in the Town's Square. You see a sign that says \"Store, this way\" and \"Cave, that way\"."
  },
  {
    name: "Store",
    "button text": ["Buy 10 Health (10 Gold)", "Buy Weapon (30 Gold)", "Go to Town Square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You are in the Store."
  },
  {
    name: "Cave",
    "button text": ["Fight Slime", "Fight Fanged Beast", "Go to Town"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You are in the Cave. You see some monsters."
  }, 
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a " + monsters[fighting].name + "."
  },
  {
    name: "kill monster",
    "button text": ["Go to Town", "Go to Town", "Go to Town"],
    "button functions": [goTown, goTown, easterEgg],
    text: "The monster screams in pain, falling to the ground. You gain experience points and find gold."
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You have been defeated. You lose all your gold and experience points."
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "Congratulations! You have defeated the Dragon. YOU WIN!"
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to Town?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You fall through a sink hole! You slide down a dirt tunnel and hard-land into a granite seat. Across from you sits a masked entity. It says, \"Pick a number between 0 and 10. If you pick the right number, you win a prize!\""
  }
];
// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = 'none';
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
  /*
  button1.innerText= "Go to Store";
  button2.innerText= "Go to Cave";
  button3.innerText= "Fight Dragon";
  button1.onclick = goStore;
  button2.onclick = goCave;
  button3.onclick = fightDragon;
  text.innerText = "You are in the Town Square. You see a sign that says \"Store\".";
  */
}

function goStore() {
  update(locations[1]);
  /*
  button1.innerText = "Buy Health";
  button2.innerText = "Buy Weapon";
  button3.innerText = "Go to Town";
  button1.onclick = buyHealth;
  button2.onclick = buyWeapon;
  button3.onclick = goTown;
  text.innerText = "You enter the Store.";
  */
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You don't have enough gold to buy health. Merchant says: \"Come back when you have more gold!\"";
  }
}

function buyWeapon() {
  if (currentWeaponIndex < weapons.length) {  
    if (gold >= 30) {
      gold -= 30;
      currentWeaponIndex++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeaponIndex];
      text.innerText = "You now have a new " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText = " In your inventory you have: " + inventory + ".";
    } else {
      text.innerText = "You don't have enough gold to buy a weapon. Merchant says: \"I used to be like you, once, before I took an arrow in the knee... Err.. Come back when you have more gold!\"";
    }
  } else {
    text.innerText = "You have already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon;
    currentWeapon = inventory.shift(); //Remove the first weapon from the inventory
    text.innerText = "You sold your " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Merchant says: \"Don't sell your only weapon, you gobswallow!\"";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();

}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display ='block';
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeaponIndex].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    //randomizing monster health from 1 to player xp level
    monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;
  } else {
    counterAttack = Math.floor(Math.random(0, 2) * 3) - 2; // Randomly decide amount the monster counters the player
    monsterHealth -= 0; // No damage if the attack misses
    health -= counterAttack; // Player takes counterAttack damage if the attack misses
    text.innerText += " You missed! Monster counters you for " + counterAttack + " damage to your health.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " broke!";
    currentWeaponIndex--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  return hit > 0 ? hit : 0; // Ensure the attack value is not negative
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20; // 80% chance to hit, or always hit if health is below 20
}

function dodge() {
  text.innerText = "You attempt to dodge the attack!";
  if (Math.random() < 0.5) {  // 50% chance to dodge
    text.innerText += " You dodged the " + monsters[fighting].name + " attack!";
    health += 2; // Gain a small health boost for dodging
    healthText.innerText = health;
  } else {
    text.innerText += " You failed to dodge the " + monsters[fighting].name + " attack!";
    health -= Math.ceil(getMonsterAttackValue(monsters[fighting].level) * 0.2135);
    healthText.innerText = health;
  }
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
  text.innerText = "You defeated the " + monsters[fighting].name + ". You gain " + gold + " gold and " + xp + " experience points.";
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeaponIndex = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Congratulations! You win a prize!";
    gold += 20; // Reward for winning
    goldText.innerText = gold;
  } else {
    text.innerText += "Sorry, you didn't win this time. Now, GET OUT OF HERE!";
  }
  goTown();
}