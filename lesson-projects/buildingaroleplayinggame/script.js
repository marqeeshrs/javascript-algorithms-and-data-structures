let xp = 0;
let health = 100;
let gold = 0;
let currentWeaponIndex = 3;
let fighting;
let monsterHealth;
let inventory = ["stick", "dagger", "claw hammer", "sword"];
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
    name: "Forest",
    "button text": ["Go to Store", "Go to Cave", "Fight Dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: 
      "Welcome to Dragon Repeller. You must defeat the dragon " +
      "that is preventing people from leaving the town. You are in " +
      "the town square. Where do you want to go? Use the buttons above."
  },
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
    text: "You are fighting a"
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
    text: "You have been defeated. You lose all your character stats and new weapons."
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


let currentWeapon = weapons[currentWeaponIndex];
let newWeapon;
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
  update(locations[1]);
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
  update(locations[2]);
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
  update(locations[3]);
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
  if (currentWeaponIndex < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeaponIndex++;
      goldText.innerText = gold;
      newWeapon = weapons[currentWeaponIndex].name;
      inventory.push(newWeapon);
      text.innerText = 
        "You now have a new " + newWeapon + "." +
        " In your inventory you have: " + inventory.join(", ") + ".";
    } else {
      text.innerText = 
        "You don't have enough gold to buy a weapon. Merchant says: " +
        "\"I used to be like you, once, before I took an arrow in the knee... " +
        "Err.. Come back when you have more gold!\"";
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
    text.innerText =
      "You sold your " + currentWeapon + "." +
      " In your inventory you have: " + inventory.join(", ") + ".";
    update(locations[1]);
  } else {
    text.innerText = 
    "Merchant says: \"Don't sell your only weapon, "
    + "you gobswallow!\"";
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
  update(locations[4]);
  text.innerText += " " + monsters[fighting].name + ".";
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = 'block';
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
    if (isMonsterHit()) {
    //randomizing monster health from 1 to player xp level
    monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;
    text.innerText += " You attack it with your " + weapons[currentWeaponIndex].name + ".";
    health -= getMonsterAttackValue(monsters[fighting].level);
  } else {
    counterAttack = Math.floor(Math.random() * 3) + 2; // Randomly decide amount the monster counters the player
    monsterHealth -= 0; // No damage if the attack misses
    health -= counterAttack; // Player takes counterAttack damage if the attack misses
    text.innerText += " You missed! The monster counters you for +" + counterAttack + " damage to your health.";
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
    text.innerText += " Your " + inventory[currentWeaponIndex].name + " broke!";
    inventory.pop(); // Remove the last weapon from the inventory
    currentWeapon = weapons[currentWeaponIndex].name;
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
    health += 2; // Gain a small health boost for dodging
    text.innerText += " You dodged the " + monsters[fighting].name + "'s attack! You gained 2 health.";
    healthText.innerText = health;
  } else {
    const healthLoss = Math.ceil(getMonsterAttackValue(monsters[fighting].level) * 0.2135);
    health = healthLoss;
    text.innerText += " You failed to dodge the " + monsters[fighting].name + "'s attack! You lose " + healthLoss + " health.";
    healthText.innerText = health;
  }
  if (health <= 0) {
    lose();
  }
}

function defeatMonster() {
  const goldGain = Math.floor(monsters[fighting].level * 6.7);
  const xpGain = monsters[fighting].level;
  gold += goldGain;
  xp += xpGain;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[5]);
  text.innerText = 
    "You defeated the " + monsters[fighting].name + "." +
    " You gain " + goldGain + " gold and " + xpGain + " experience points.";
}

function lose() {
  xp = 0;
  gold = 0;
  xpText.innerText = xp;
  goldText.innerText = gold;
  update(locations[6]);
}

function winGame() {
  update(locations[7]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 0;
  currentWeaponIndex = 0;
  inventory = ["stick"];
  currentWeapon = weapons[currentWeaponIndex].name;
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  update(locations[1]);
}

function easterEgg() {
  update(locations[8]);
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
    text.innerText += 
    "The masked entity says \"Congratulations! You win a prize!\"" +
    " \"Now, get out of here, ya scamp.\"" +
    " You gain 20 gold.";
    gold += 20; // Reward for winning
    goldText.innerText = gold;
    button1.innerText = "Go to Town Square";
    button1.onclick = goTown;
    button2.innerText = "Go to Cave";
    button2.onclick = goCave;
    button3.innerText = "Go to Town Square";
    button3.onclick = goTown;
  } else {
    health -= 4; // Penalty for losing
    healthText.innerText = health;
    text.innerText += "The masked entity says \"Sorry, you didn't win this time. Now, GET OUT OF HERE!\"";
    text.innerText += " It casts a painful spell returning you to the Town Square. You lose 4 health.";
    button1.innerText = "Teleported to Town Square";
    button1.onclick = goTown;
    button2.innerText = "Teleported to Town Square";
    button2.onclick = goTown;
    button3.innerText = "Teleported to Town Square";
    button3.onclick = goTown;
  }
  if (health <= 0) {
    lose();
  }
}
// Initialize the game by setting the first location to Forest
update(locations[0]);

/*
* This is a simple RPG game where the player can explore, fight monsters, and buy items.
* The player can go to the store to buy health or weapons, fight monsters in the cave
* or fight a dragon, and manage their inventory.
* The game includes a simple combat system, health management, and an inventory system.
* The player can also encounter an easter egg where they can pick a number to win a prize.
* The game ends when the player defeats the dragon or loses all health.
* The player can restart the game after losing or winning.
* The game is designed to be simple and fun, with a focus on exploration and combat.
* The player can also sell their weapons to the merchant for gold.
* The game is built using HTML, CSS, and JavaScript, and can be easily modified to add more features or change the gameplay.
* The game is a fun way to practice JavaScript programming and learn about game development concepts.
* The game can be played in a web browser and is responsive to different screen sizes.
* The game can be extended with more features, such as more monsters, items, and locations.
* The game can also be improved with better graphics and sound effects.
*/