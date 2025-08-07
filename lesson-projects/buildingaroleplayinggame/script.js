let xp = 0;
let health = 100;
let gold = 50;
let currentWeaponIndex = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

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
    text: "You found the easter egg! You can pick a number between 1 and 10. If the number you choose matches one of the random numbers, you win a prize!"
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
      text.innerText = "You don't have enough gold to buy a weapon.";
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
    text.innerText = "Don't sell your only weapon!";
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
  health -= monsters[fighting].level;
  //randomizing monster health from 1 to player xp level
  monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    defeatMonster();
  }

}

function dodge() {}
