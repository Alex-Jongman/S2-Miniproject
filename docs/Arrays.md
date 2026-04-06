# Arrays

In de vorige hoofdstukken hebben we met name met JSON objecten gewerkt, maar Arrays zijn ook een veelgebruikte datastructuur in JavaScript die we vaak nodig zijn en waar we kennis van moeten hebben van hoe we ermee kunnen werken.
We doen dit in het gedeelte van de navigate pagina waar we een lijstje willen bijhouden van de plekken die we willen bezoeken, en waar we kunnen afvinken welke plekken we al hebben bezocht. 
We hebben hier bewust ervoor gekozen om deze informatie alleen aan de client-side bij te houden, om zo de focus op de array methoden te leggen en de applicatie simpel te houden.
Het betekend wel dat met een refresh van de pagina deze informatie verloren gaat, maar dat is in dit geval niet zo erg, omdat we deze informatie toch alleen maar tijdelijk nodig hebben tijdens onze wandeling.

Omdat dit een andere feature is dan de navigatie zelf, hebben we hier een aparte class voor gemaakt, genaamd `TodoSection`, die verantwoordelijk is voor het beheren van deze lijst van plekken die we willen bezoeken, en het renderen van deze lijst in de DOM.
Deze feature heeft dan ook alleen maar betrekking op het volgende stukje van de html:

```html
<section class="todo-section">
    <h2>TODO</h2>
    <ul class="todo-list">
    </ul>

    <form id="todo-form">
        <input type="text" id="todo" name="todo" placeholder="Voeg een nieuwe taak toe..." />
        <button type="submit">Toevoegen</button>
    </form>
</section>

<template id="todo-item-template">
    <li>
        <input type="checkbox" class="location-checkbox" name="" id="" />
        <label for="" class="location-label"></label>
        <button class="delete-button">Verwijderen</button>
    </li>
</template>
```

Als we naar de constructor van de `TodoSection` klasse kijken, zien we dat we hier een lege array `todos` hebben aangemaakt.

```javascript
export class TodoSection {
    constructor() {
        this.todoForm = document.querySelector('#todo-form');
        this.todoList = document.querySelector('.todo-list');
        this.todoItemTemplate = document.querySelector('#todo-item-template');

        this.todos = [];

        this.todoForm.addEventListener('submit', this.addTodo.bind(this));
    }
...
```

De eerste functionaliteit die we voor het bijhouden van onze lijst nodig zijn is het toevoegen van een nieuw item aan onze lijst.
Deze functionaliteit hebben we geïmplementeerd in de `addTodo` methode, die wordt aangeroepen wanneer het formulier wordt ingediend. 

```javascript
addTodo(event) {
    event.preventDefault();

    const formData = new FormData(this.todoForm);
    const data = Object.fromEntries(formData.entries());

    console.log('Form data:', data);      

    // Add the new todo to the list
    this.todos = [...this.todos, {
        text: data.todo.trim(),
        id: data.todo.toLowerCase().replace(/\s+/g, '-'),
        completed: false
    }];

    // Re-render the todo list
    this.render();
}
```

Zoals eerder behandeld in het hoofdstuk over Forms, gebruiken we hier de `FormData` API om de gegevens van het formulier te verzamelen.
Ons data object heeft op dit moment alleen een `todo` property, die de tekst bevat van het todo item dat we willen toevoegen.

```json
{
    "todo": "Bezoek de Python Show    "
}
```

Zoals je in het voorbeeld hierboven kunt zien, kan deze tekst extra spaties bevatten aan het begin of het einde, dus we gebruiken de `trim()` methode om deze spaties te verwijderen voordat we het item aan onze lijst toevoegen.
We creeren hiervoor een nieuw object met een `text` property die de getrimde tekst bevat.

```json
{
    "text": data.todo.trim()
}
```

Maar we zijn straks ook een `id` property nodig, zodat we later kunnen bijhouden welk item we willen verwijderen als we op de verwijder knop klikken. Een string met spaties is hier niet zo handig voor, dus passen we een zogenaamde reguliere expressie (RegEx) toe op de tekst, waarbij we eerst de tekst omzetten naar kleine letters met `toLowerCase()`, en vervolgens alle spaties vervangen door streepjes met `replace(/\s+/g, '-')`, zodat we een string krijgen die geschikt is als id.

```json
{
    "text": data.todo.trim(),
    "id": data.todo.toLowerCase().replace(/\s+/g, '-')
}
```

> [!NOTE]
>
> [Reguliere expressies](https://en.wikipedia.org/wiki/Regular_expression) zijn een krachtig hulpmiddel voor het manipuleren van strings die je in veel programmeertalen tegenkomt, waaronder JavaScript. 
> Ze bieden een manier om patronen in strings te definiëren en te zoeken, en kunnen worden gebruikt voor taken zoals validatie, zoeken en vervangen van tekst, en het extraheren van specifieke informatie uit strings. Reguliere expressies kunnen complex zijn, maar ze zijn ook zeer krachtig.
> En we adviseren dan ook om je hier meer in te verdiepen, want het is een vaardigheid die je vaak nodig zult hebben als ontwikkelaar.
> Er zijn meerdere tutorials zoals deze [RegExOne](https://regexone.com/) die je kunnen helpen om de basis van reguliere expressies onder de knie te krijgen.

Uiteindelijk willen we ook nog een `completed` property toevoegen, zodat we kunnen bijhouden welke items al zijn voltooid, en deze standaard op `false` zetten, omdat een nieuw item nog niet voltooid is.

```json
{
    "text": data.todo.trim(),
    "id": data.todo.toLowerCase().replace(/\s+/g, '-'),
    "completed": false
}
```

We zouden dit object aan een tijdelijk in een variabele kunnen bewaren, voordat we het toevoegen aan onze `todos` array.

```javascript
const newTodoItem = {
    text: data.todo.trim(),
    id: data.todo.toLowerCase().replace(/\s+/g, '-'),
    completed: false
};
```

Dit object willen we vervolgens toevoegen aan onze `todos` array, zodat we een lijst hebben van alle todo items die we willen bezoeken, en de status van elk item kunnen bijhouden.
We zouden hiervoor de `push()` methode kunnen gebruiken, maar hier raden we van af omdat deze methode geen zogenaamde [`pure function`](https://www.freecodecamp.org/news/what-is-a-pure-function-in-javascript-acb887375dfe/) is, wat betekend dat het de originele array wijzigt, en dat kan leiden tot bugs in onze applicatie als we niet goed opletten.
In plaats daarvan maken we een nieuwe array aan met behulp van de [spread operator `...`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax), waarbij we eerst alle bestaande items uit de `todos` array kopiëren, en vervolgens ons nieuwe item toevoegen.

```javascript
this.todos = [...this.todos, newTodoItem];
```

Als we nu de stap van de tijdelijke variabele overslaan, kunnen we dit ook in één keer doen zonder de tijdelijke variabele, door het object direct in de array te plaatsen.

```javascript
this.todos = [...this.todos, {
    text: data.todo.trim(),
    id: data.todo.toLowerCase().replace(/\s+/g, '-'),
    completed: false
}];
```

Nu we een nieuwe todo lijst hebben kan onze applicatie de render methode aanroepen om de nieuwe lijst te renderen in de DOM, zodat we het nieuwe item ook daadwerkelijk kunnen zien in onze applicatie.

Een andere functionaliteit die we nodig zijn is het verwijderen van een item uit onze lijst, wanneer we op de verwijder knop klikken. Deze functionaliteit hebben we geïmplementeerd in de `removeTodoItem` methode, die wordt aangeroepen wanneer we op de verwijder knop klikken.
We zouden dit kunnen doen door met een loop door onze `todos` array te gaan, en het item te vinden dat we willen verwijderen, en vervolgens dat item uit de array te verwijderen. 

```javascript
removeTodoItem(id) {
    for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].id === id) {
            this.todos.splice(i, 1);
            break;
        }
    }
```

Hier gebruiken we de `splice()` methode om het item uit de array te verwijderen.
In plaats van de `for` loop zouden we ook de array methode `forEach()` kunnen gebruiken, maar dat is niet zo handig, omdat we dan niet zomaar kunnen stoppen met de loop wanneer we het item hebben gevonden, en dat kan leiden tot onnodige iteraties door de rest van de array, wat niet erg performant is.
Dus we hebben een oplossing, maar deze oplossing is helaas geen pure function, omdat het de originele array wijzigt, en dat kan leiden tot bugs in onze applicatie als we niet goed opletten.

Een betere oplossing is om de `filter()` methode te gebruiken, waarmee we een nieuwe array kunnen maken die alleen de items bevat die we willen behouden, en het item dat we willen verwijderen niet bevat.

```javascript
removeTodoItem(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.render();
}
```

Deze filter methode bevat een annonieme functie (`(todo) => todo.id !== id`) die wordt aangeroepen voor elk item in de `todos` array. De functie retourneert `true` voor elk item dat aan de conditie voldoet (in dit geval, elk item waarvan de `id` niet gelijk is aan de `id` van het item dat we willen verwijderen), en retourneert `false` voor het item dat we willen verwijderen. De `filter()` methode maakt vervolgens een nieuwe array aan die alleen de items bevat waarvoor de functie `true` retourneert, en wij wijzen deze nieuwe array toe aan `this.todos`, waardoor we effectief het item hebben verwijderd uit onze lijst.

JavaScript biedt nog veel meer krachtige array methoden die we kunnen gebruiken om te werken met arrays, zoals [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [`reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce), [`find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find), [`some()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some), [`every()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every), en nog veel meer. We raden je aan om deze methoden te verkennen en te leren hoe je ze kunt gebruiken, omdat ze je kunnen helpen om efficiënter en eleganter te werken met arrays in JavaScript.

---

[:arrow_left: JS - DOM manipulatie](./DOM-manipulation.md) | [:house: README](./README.md) | [HTML - Templates / JS - Dynamische rendering :arrow_right:](./Arrays.md)