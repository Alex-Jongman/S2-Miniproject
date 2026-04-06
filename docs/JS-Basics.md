# JS Basics

In dit hoofdstuk zullen we de basisprincipes van JavaScript behandelen, waaronder variabelen, datatypes, control flow en functies. Deze concepten vormen de fundering van het programmeren in JavaScript en zijn essentieel voor het begrijpen van meer geavanceerde onderwerpen die we later zullen behandelen.
Maar voordat we in de details duiken, is het belangrijk om een duidelijk begrip te hebben van het verschil tussen frontend en backend ontwikkeling, en hoe JavaScript zich verhoudt tot andere talen zoals Java in ons project.

## Frontend vs Backend 

In ons project maken we gebruik van Java in de backend en JavaScript in de frontend. De frontend bestanden staan hijbij in een `webapp` directory.
Als we onze applicatie deployen, worden de Java bestanden eerst gecompileerd tot bytecode (.class bestanden) die we in de `target` directory kunnen vinden. De bytecode wordt vervolgens samen met onze webapp bestanden verpakt in een .war bestand dat we kunnen deployen naar een server.
De server zal het .war bestand uitpakken en onze site hosten. Wanneer een gebruiker onze site bezoekt, zal de server de benodigde frontend bestanden (HTML, CSS, JavaScript) naar de browser van de gebruiker sturen, waar de JavaScript code wordt uitgevoerd door de JavaScript-engine van de browser.
Als de JavaScript code in de frontend een verzoek doet aan de backend, door een REST API aan te roepen, zal de server de benodigde Java code uitvoeren om het verzoek te verwerken en een response terugsturen naar de frontend, waar de JavaScript code de response kan verwerken en de gebruikersinterface kan bijwerken op basis van de ontvangen data.


> [!NOTE]
>
> Backend code draait op de server terwijl frontend code in de browser van de gebruiker draait.

JavaScript is op dit moment naast WASM (WebAssembly) de enige programmeertaal die native wordt ondersteund in webbrowsers. WASM is een relatief nieuwe technologie die het mogelijk maakt om code geschreven in andere talen, zoals C++ of Rust, te compileren naar een formaat dat in de browser kan worden uitgevoerd. Hoewel WASM veelbelovend is en in sommige gevallen betere prestaties kan bieden dan JavaScript, is JavaScript nog steeds de meest gebruikte taal voor frontend ontwikkeling vanwege zijn flexibiliteit, brede ondersteuning en rijke ecosysteem van bibliotheken en frameworks.

Belangrijke kenmerk van JavaScript is dat JavaScript een **Interpreted language** is, wat betekent dat de code direct wordt uitgevoerd door de JavaScript-engine van de browser zonder dat er een aparte compilatiestap nodig is. Dit maakt dat we pas op het moment van uitvoering kunnen ontdekken of er fouten (dus ook syntaxfouten) in onze code zitten, wat kan leiden tot runtime errors als we niet goed opletten. Daarom is het belangrijk om onze code zorgvuldig te schrijven en te testen om ervoor te zorgen dat deze correct werkt.

Er zijn wel tools zoals linters (ESLint is een populaire keuze) die ons kunnen helpen om fouten in onze code te identificeren voordat we deze uitvoeren, maar dit vereist dat we deze tools eerst moeten installeren en configureren voordat we ze kunnen gebruiken in ons ontwikkelproces. We hebben ervoor gekozen om dit nu niet te doen, omdat we ons in deze workshop willen richten op de basisprincipes van JavaScript zonder al te veel extra tools en configuraties toe te voegen, maar het is zeker iets om in gedachten te houden voor toekomstige projecten.

## Variabelen en datatypes

In JavaScript kunnen we variabelen declareren met `var`, `let` of `const`. 

> [!NOTE]
>
> Het gebruik van `var` wordt tegenwoordig afgeraden vanwege problemen met de scope, dus we zullen ons richten op `let` en `const`.

- `let` wordt gebruikt voor variabelen die kunnen worden herassigned, maar niet opnieuw gedeclareerd binnen dezelfde scope.
- `const` wordt gebruikt voor variabelen die niet kunnen worden herassigned of opnieuw gedeclareerd binnen dezelfde scope. Het is belangrijk op te merken dat `const` alleen de binding van de variabele beschermt, niet de inhoud ervan. Dus als we een object of array declareren met `const`, kunnen we nog steeds de eigenschappen van dat object of de elementen van die array wijzigen, maar we kunnen de variabele zelf niet herassignen naar een ander object of array.

JavaScript heeft verschillende datatypes, waaronder:

- Primitives: `string`, `number`, `boolean`, `null`, `undefined`,
- Complex types: `object`, `array`, `function`

In tegenstelling tot sommige andere talen, zoals Java, C# of TypeScript heeft JavaScript geen statische types, wat betekent dat we niet hoeven te specificeren welk type een variabele is bij het declareren ervan. Dit kan leiden tot flexibiliteit, maar ook tot fouten als we niet goed opletten, omdat we bijvoorbeeld een string kunnen toewijzen aan een variabele die we later als een number willen gebruiken, wat kan leiden tot onverwachte resultaten of fouten in onze code.

Voorbeeld van variabelen en datatypes in JavaScript:

```javascript
const name = 'Peter'; // string
let age = 60; // number
let isStudent = false; // boolean
let person = { name: 'Gerald', age: 58 }; // object
let numbers = [1, 2, 3, 4, 5]; // array
const greet = function() { // function
    console.log('Hello!');
};
```

Voorbeeld van dynamische typing in JavaScript:

```javascript
let number = 10; // number
number = "ten"; // Dit is toegestaan, maar kan leiden tot fouten als we later proberen te rekenen met 'number'

const number1 = 5;
const number2 = '5';
let result = number1 + number2; // Dit zal resulteren in "55" 
// omdat JavaScript de number2 string zal converteren naar een string en de twee zal concatenaten in plaats van optellen.
```

> [!NOTE]
>
> Dynamische typing betekent dat het type van een variabele pas op het moment van uitvoering wordt bepaald.

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

---

## Functies

Functies zijn blokken van code die we kunnen hergebruiken. We kunnen functies declareren met het `function` keyword, of we kunnen ze definiëren als function expressions of arrow functions.

```javascript
// Function declaration
function greet(name) {
    return `Hello, ${name}!`;
}
greet('Alice'); // "Hello, Alice!"
```

```javascript
// Function expression
const greet = function(name) {
    return `Hello, ${name}!`;
}
greet('Bob'); // "Hello, Bob!"
```

```javascript
// Arrow function
const greet = (name) => {
    return `Hello, ${name}!`;
}
greet('Dave'); // "Hello, Dave!"
```

> [!NOTE]
>
> JavaScript is een taal die zowel Object-Oriented Programming (OOP) als Functioneel Programmeren (FP) ondersteunt. In OOP noemen we functies vaak "methodes" wanneer ze deel uitmaken van een object, terwijl in FP functies worden behandeld als first-class citizens, wat betekent dat ze kunnen worden toegewezen aan variabelen, doorgegeven als argumenten aan andere functies, en zelfs kunnen worden geretourneerd door andere functies.

---

[:arrow_left: HTML - Forms](./Forms.md) | [:house: README](./README.md) | [JS - Import/Export & File Structure :arrow_right:](./Import-Export.md)