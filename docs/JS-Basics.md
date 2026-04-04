# JS Basics

TODO:
- Variabelen- Datatypes
- Functies
- Control flow (if/else, switch, loops)

## Variabelen en datatypes

In JavaScript kunnen we variabelen declareren met `var`, `let` of `const`. 
Het gebruik van `var` wordt tegenwoordig afgeraden vanwege problemen met de scope, dus we zullen ons richten op `let` en `const`.

- `let` wordt gebruikt voor variabelen die kunnen worden herassigned, maar niet opnieuw gedeclareerd binnen dezelfde scope.
- `const` wordt gebruikt voor variabelen die niet kunnen worden herassigned of opnieuw gedeclareerd binnen dezelfde scope. Het is belangrijk op te merken dat `const` alleen de binding van de variabele beschermt, niet de inhoud ervan. Dus als we een object of array declareren met `const`, kunnen we nog steeds de eigenschappen van dat object of de elementen van die array wijzigen, maar we kunnen de variabele zelf niet herassignen naar een ander object of array.

JavaScript heeft verschillende datatypes, waaronder:

- Primitives: `string`, `number`, `boolean`, `null`, `undefined`,
- Complex types: `object`, `array`, `function`

In tegenstelling tot sommige andere talen, zoals Java of C#, heeft JavaScript geen statische types, wat betekent dat we niet hoeven te specificeren welk type een variabele is bij het declareren ervan. Dit kan leiden tot flexibiliteit, maar ook tot fouten als we niet goed opletten, omdat we bijvoorbeeld een string kunnen toewijzen aan een variabele die we later als een number willen gebruiken, wat kan leiden tot onverwachte resultaten of fouten in onze code.

```javascript
const name = 'Peter'; // string
let age = 60; // number
let isStudent = false; // boolean
let person = { name: 'Gerald', age: 58 }; // object
let numbers = [1, 2, 3, 4, 5]; // 
const greet = function() { // function
    console.log('Hello!');
};

let number = 10;
number = "ten"; // Dit is toegestaan, maar kan leiden tot fouten als we later proberen te rekenen met 'number'
```

## Functies

Functies zijn blokken van code die we kunnen hergebruiken. We kunnen functies declareren met het `function` keyword, of we kunnen ze definiëren als function expressions of arrow functions.

```javascript
// Function declaration
function greet(name) {
    return `Hello, ${name}!`;
}
greet('Alice'); // "Hello, Alice!"

// Function expression
const greet = function(name) {
    return `Hello, ${name}!`;
}
greet('Bob'); // "Hello, Bob!"

// Arrow function
const greet = (name) => {
    return `Hello, ${name}!`;
}
greet('Dave'); // "Hello, Dave!"
```

## Control flow

Control flow statements bepalen de volgorde waarin code wordt uitgevoerd. We hebben `if/else` statements, `switch` statements en loops zoals `for`, `while` en `do...while`.

```javascript
// If/else statement
const age = 20;
if (age < 18) {
    console.log('You are a minor.');
} else if (age >= 18 && age < 65) {
    console.log('You are an adult.');
} else {
    console.log('You are a senior.');
}
```

In tegenstelling tot andere talen kent JavaScript niet alleen de `==` operator voor vergelijking, maar ook de `===` operator, die bekend staat als de "strict equality" operator. Het verschil tussen deze twee is dat `==` een losse vergelijking uitvoert, waarbij het probeert de waarden te converteren naar een gemeenschappelijk type voordat het ze vergelijkt, terwijl `===` een strikte vergelijking uitvoert, waarbij het zowel de waarde als het type vergelijkt zonder enige conversie. Het gebruik van `===` wordt over het algemeen aanbevolen om onverwachte resultaten te voorkomen die kunnen optreden bij het gebruik van `==`, vooral wanneer we werken met verschillende datatypes.

```javascript
const a = 5;
const b = '5';
console.log(a == b); // true, omdat '5' wordt geconverteerd naar 5
console.log(a === b); // false, omdat 5 (number) niet gelijk is aan '5' (string)
```

Switch statements zijn een andere manier om control flow te beheren, vooral wanneer we meerdere voorwaarden hebben die we willen controleren. Ze kunnen vaak leesbaarder zijn dan een reeks van `if/else if` statements.

```javascript
// Switch statement
const day = 'Monday';
switch (day) {
    case 'Monday':
        console.log('Start of the week!');
        break;
    case 'Friday':
        console.log('End of the week!');
        break;
    default:
        console.log('Midweek day.');
}
```

Loops zijn handig voor het herhalen van een blok code meerdere keren. We hebben verschillende soorten loops, zoals `for`, `while` en `do...while`.

```javascript
// For loop
for (let i = 0; i < 5; i++) {
    console.log(i);
} 

// While loop
let i = 0;
while (i < 5) {
    console.log(i); 
    i++;
}

// do...while
let i = 0;
do {
    console.log(i);
    i++;
} while (i < 5);
```
