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
    text: "You are in the Town Square. You see a sign that says \"Store\"."
  },
  {
    name: "Store",
    "button text": ["Buy Health", "Buy Weapon", "Go to Town"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You are in the Store."
  },
  {
    name: "Cave",
    "button text": ["Fight Slime", "Fight Beast", "Go to Town"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You are in the Cave. You see some monsters."
  }
];
// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
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
    gold += 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You don't have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeaponIndex < weapons.length) {  
    if (gold >= 30) {
      gold += 30;
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

function fightDragon() {
  console.log("Fighting Dragon.");
}

function fightSlime() {
  console.log("Fighting Slime."); 
}

function fightBeast() {
  console.log("Fighting Beast.");
}

function goFight() {
  console.log("Going to fight.");
}