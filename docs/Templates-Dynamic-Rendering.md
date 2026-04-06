# HTML - Templates & JS - Dynamische rendering

In dit hoofdstuk gaan we aan de hand van het todo-lijstje demonsteren hoe we met behulp van HTML templates en JavaScript dynamisch content kunnen renderen in de DOM, en dus nieuwe elementen kunnen toevoegen aan de pagina of verwijderen.

Hiervoor kijken we eerst naar onze HTML, en in dit geval naar de `ul` (unordered list) waar we onze todo items in willen tonen.

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

Zoals we kunnen zien bevat de `ul` op dit moment nog geen `li` list items. Als we wel een item in onze `ul` zouden willen tonen dan zou de HTML er ongeveer zo uitzien:

```html
<ul class="todo-list">
    <li>
        <input type="checkbox" class="location-checkbox" name="villa-volta" id="villa-volta" />
        <label for="villa-volta" class="location-label">Villa Volta</label>
        <button class="delete-button">Verwijderen</button>
    </li>
</ul>
```

En laat nou dit toevallig de exacte structuur zijn van de code die we in ons `template` element we hebben staan die we ook in de HTML hebben gedefinieerd. En zoals je wellicht hebt opgemerkt wordt deze template zelf door de browser niet gerenderd.
Een `template` element is een soort blauwdruk voor een stuk HTML code dat we later in onze JavaScript kunnen gebruiken om nieuwe elementen te maken die we vervolgens aan de DOM kunnen toevoegen.
Wat onze JavaScript code nu moet doen is:

- het template element the selecteren, 
- de inhoud van dat template element te klonen, en 
- vervolgens de juiste waarden in dat gekloonde template te zetten, zoals de tekst van het label en de name en id van de checkbox, en 
- daarna kunnen we dat gekloonde template toevoegen aan onze `ul` zodat het zichtbaar wordt op de pagina.

Het selecteren van de template is een actie die we al in de constructor van onze `TodoSection` class hebben gedaan.

```javascript
this.todoList = document.querySelector('.todo-list');
this.todoItemTemplate = document.querySelector('#todo-item-template');
```

Net zo als het selecteren van de `ul` element, dat we straks nodig hebben om de gekloonde templates aan toe te voegen.

Het stappen die we boven hebben beschreven zijn verder allemaal stappen die deel uitmaken van onze `render` methode.
We zouden hier ervoor kunnen kiezen om chirurgisch alleen de delen van de DOM te updaten die in onze lijst veranderen, maar dat vraagt om een hoop extra code (iets wat we in S3 met behulp van een library gaan doen). In plaats daarvan kiezen we ervoor om bij elke render de hele lijst opnieuw te renderen. Dat is een stuk simpeler, en voor onze doeleinden is het ook performant genoeg, omdat we maar een klein aantal items in onze lijst hebben. In een echte applicatie met veel data zou dit echter niet de beste aanpak zijn, omdat het onnodig veel werk is voor de browser om de hele lijst opnieuw te renderen, terwijl er misschien maar één item is veranderd.

Omdat we de gehele lijst opnieuw renderen, moeten we voorkomen dat we bij elke render de nieuwe lijst aan de bestaande lijst toevoegen, waardoor we dus een steeds langere lijst zouden krijgen. Daarom moeten we bij elke render eerst de bestaande lijst leegmaken voordat we de nieuwe lijst toevoegen. Dat doen we door `this.todoList.innerHTML = ''` te doen, waarmee we de inhoud van de `ul` leegmaken.

> [!WARNING]
>
> De innerHTML property is een verleidelijke manier om de inhoud van een element te manipuleren, want in plaats van de lege string zouden we ook de gehele html code kunnen neerzetten die we willen plaatsen. Je zie dan ook vaak op het internet voorbeelden die dat doen. Maar weet dat innerHTML twee nadelen heeft. Ten eerste is het niet erg performant, omdat de browser de string opnieuw moet parsen en de DOM opnieuw moet opbouwen. Maar ten tweede is het ook nog eens onveilig, omdat als we een string gebruiken die afkomstig is van de gebruiker, dat we dan een XSS (Cross-Site Scripting) aanval kunnen krijgen, waarbij een kwaadwillende gebruiker een script kan injecteren in de string die we gebruiken, en dat script kan dan worden uitgevoerd in de context van onze website. In combinatie met bugs in de browser waar hackers weet van hebben, kan dat leiden tot ernstige beveiligingsproblemen.

Nu dat de inhoud van de `ul` is geleegd, kunnen we de items in onze `todos` array gaan renderen. We kunnen door deze array heen lopen met behulp van een `forEach` loop.
Voor elk item in de array beginnen we de loop door eerst de inhoud van de template te clonen en het resultaat in een variabele op te slaan. De `true` parameter die we meegeven aan de `cloneNode` methode zorgt ervoor dat we een diepe clone maken van het template, wat betekent dat we niet alleen het `template` element zelf klonen, maar ook alle elementen die binnenin het `template` element staan, zoals de `li`, `input`, `label` en `button` elementen. Als we deze parameter niet mee zouden geven, dan zouden we alleen het `template` element zelf klonen, en zouden de elementen binnenin het template niet worden gekloond, waardoor we dus geen nieuwe elementen zouden hebben om aan de DOM toe te voegen.

```javascript
const todoItem = this.todoItemTemplate.content.cloneNode(true);
```

Het todoItem dat we nu hebben is van het type HTMLElement, wat inhoudt dat we er een `querySelector` op kunnen uitvoeren om de elementen binnenin het gekloonde template te selecteren, zodat we die vervolgens kunnen aanpassen met de juiste waarden.
Hoe we attributen en waarden van een bestaand element kunnen aanpassen hebben al eerder gezien in de hoofdstukken over DOM manipulatie, maar hier is het nog eens handig om te laten zien hoe we dat kunnen doen in combinatie met een template.

```javascript
render() {
    // Clear the existing list
    this.todoList.innerHTML = '';

    console.log('Rendering todos:', this.todos);
    // Render each todo item
    this.todos.forEach(todo => {
        const todoItem = this.todoItemTemplate.content.cloneNode(true);
        const listItemElement = todoItem.querySelector('li');
        const checkboxElement = todoItem.querySelector('.location-checkbox');
        const labelElement = todoItem.querySelector('.location-label');
        const deleteButton = todoItem.querySelector('.delete-button');

        checkboxElement.addEventListener('change', () => {
            todo.completed = checkboxElement.checked;
            listItemElement.classList.toggle('completed', todo.completed);
            labelElement.style.textDecoration = todo.completed ? 'line-through' : 'none';
        });

        checkboxElement.setAttribute('name', todo.id);
        checkboxElement.setAttribute('id', todo.id);
        checkboxElement.checked = todo.completed;
        listItemElement.classList.toggle('completed', todo.completed);
        labelElement.style.textDecoration = todo.completed ? 'line-through' : 'none';

        labelElement.textContent = todo.text;
        labelElement.setAttribute('for', todo.id);

        deleteButton.addEventListener('click', () => {
            this.removeTodoItem(todo.id);
        });

        this.todoList.appendChild(todoItem);
    });
}
```

De laatste stap die we voor elk item in de array moeten doen is het gekloonde template toevoegen aan de `ul` in de DOM, zodat het zichtbaar wordt op de pagina. Dat doen we met `this.todoList.appendChild(todoItem)`, waarmee we het gekloonde template als kind element toevoegen aan de `ul` element dat we eerder hebben geselecteerd.

---

[:arrow_left: JS - Arrays](./Arrays.md) | [:house: README](./README.md)