/*
console.log("Let's build a pyramid using JavaScript basics: ");
console.log("    #    ");
console.log("   ###   ");
console.log("  #####  ");
console.log(" ####### ");
console.log("#########");


let character = "Hello";
console.log(character);
character = "World";
console.log(character);
let secondCharacter;
secondCharacter = "Test";
console.log(secondCharacter);
secondCharacter = character;
let profession = "teacher";
let age;
console.log(profession);
console.log(age);

let count = 8;
console.log(count +1);
let rows = [];
rows = ["Naomi", "Quincy", "CamperChan"];
console.log(rows[0]);
rows[2] = 10;
console.log(rows);
rows[2] = rows[rows.length - 1];
rows = ["Naomi", "Quincy", "CamperChan"];
let cities = ["London", "New York", "Mumbai"];
console.log(cities);
cities[cities.length - 1] = "Mexico City";
console.log(cities);
*/

const character = "#";
const count = 8;
const rows = [];

function padRow(rowNumber, rowCount) {
  return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber);
}

/*
function addTwoNumbers (num1, num2) {
    return num1 + num2;
}

const sum = addTwoNumbers(5, 10);
console.log(sum)


const call = padRow();
console.log(call); */

//TODO: use a different kind of loop
/*for (let i = 1; i < count; i ++) {
    rows.push(padRow(i, count))
}*/



while (row.length <= count) {
  rows.push(padRow(rows.length + 1, count));

}

let  result = ""

for (const row of rows) {
    result = result + row + "\n";
}

console.log(result);