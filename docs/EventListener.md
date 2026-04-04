# EventListeners

TODO: De frontend wordt gekenmerkt door asynchroniteit. We kunnen niet altijd van tevoren weten wanneer een gebruiker een actie zal uitvoeren, zoals het klikken op een knop of het invullen van een formulier. Om hierop te kunnen reageren, gebruiken we event listeners. De addEventListener methode verwacht twee argumenten: het type event waarop we willen reageren (zoals 'click' of 'submit'), en een callback functie die wordt uitgevoerd wanneer dat event plaatsvindt. Deze callback functie wordt ook wel een event handler genoemd.
Erop letten dat je bij de addEventListener de referentie naar de functie meegeeft, en niet de functie zelf aanroept.
Er wordt automatisch een event object meegegeven aan de event listener functie, waarin allerlei informatie staat over het event dat heeft plaatsgevonden.
In het geval van een form submit event, kunnen we bijvoorbeeld met `event.preventDefault()` voorkomen dat het formulier de pagina herlaadt bij het indienen.
Maar we zouden ook kunnen checken wie het event heeft getriggerd, door bijvoorbeeld `event.target` te gebruiken, of we zouden kunnen checken welke toets er is ingedrukt bij een keydown event, door `event.key` te gebruiken.


```javascript
function loginHandler(event) {
    // Voorkom dat het formulier de pagina herlaadt bij het indienen.
    event.preventDefault();
    ...
}

const form = document.querySelector('#kassa-form');
form.addEventListener('submit', loginHandler);
```

```html
<form id="kassa-form">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required>
    <br>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>
    <br>
    <button type="submit">Login</button>
</form>
```

> [!WARNING]
>
> Events zijn erg lastig om te debuggen, omdat ze asynchroon zijn en het soms moeilijk is om te achterhalen wanneer en waarom een event wordt getriggerd. Dit wordt nog vervelender als de instantie die de event listener heeft toegevoegd niet meer bestaat op het moment dat het event wordt getriggerd, omdat dat kan leiden tot fouten die moeilijk te begrijpen zijn. Het is daarom belangrijk om event listeners ook weer te verwijderen als ze niet meer nodig zijn, bijvoorbeeld door gebruik te maken van de `removeEventListener` methode, zodat we voorkomen dat er event listeners blijven hangen die niet meer relevant zijn en die mogelijk fouten kunnen veroorzaken als ze worden getriggerd. De `removeEventListener` methode verwacht echter dezelfde argumenten als de `addEventListener` methode, en dat kan soms lastig zijn, zeker als we gebruik maken van anonieme functies als event handlers, omdat we die dan niet kunnen verwijderen, omdat we geen referentie hebben naar die functie. Het is daarom aan te raden om altijd een named function te gebruiken als event handler, zodat we die functie ook weer kunnen verwijderen als dat nodig is, en dat we zo voorkomen dat er event listeners blijven hangen die niet meer relevant zijn en die mogelijk fouten kunnen veroorzaken als ze worden getriggerd.

In de navigation.js hebben we een methode `addEventListeners` die wordt aangeroepen in de constructor van de Navigation class, en die verantwoordelijk is voor het toevoegen van event listeners aan de navigatie knoppen. We hebben ook een methode `removeEventListeners` die we zouden kunnen aanroepen als we de navigation part willen verwijderen.

De code lijkt in eerste instantie wel ok, maar als we goed kijken zien we dat we bij het toevoegen van de event listeners gebruik maken van anonieme functies als event handlers.
Dat we een anonieme functie gebruiken is te zien aan de `() => this.navigate(-1, -1)` syntax, waarbij we een arrow function gebruiken om een functie te definiëren zonder een naam. Dit is op zich prima, maar het probleem is dat we diezelfde anonieme functies ook weer gebruiken bij het verwijderen van de event listeners, maar dat dat niet werkt, omdat die anonieme functies niet dezelfde referentie hebben, en dat we daardoor niet in staat zijn om de event listeners te verwijderen. Dit kan leiden tot fouten als de navigation part wordt verwijderd, omdat de event listeners dan nog steeds actief zijn en kunnen worden getriggerd, terwijl de navigation part al is verwijderd, wat kan leiden tot fouten die moeilijk te begrijpen zijn. Het is daarom aan te raden om altijd een named function te gebruiken als event handler, zodat we die functie ook weer kunnen verwijderen als dat nodig is, en dat we zo voorkomen dat er event listeners blijven hangen die niet meer relevant zijn en die mogelijk fouten kunnen veroorzaken als ze worden getriggerd.

```javascript
addEventListeners() {
    this.northWestButton.addEventListener('click', () => this.navigate(-1, -1));
    this.northButton.addEventListener('click', () => this.navigate(-1, 0));
    this.northEastButton.addEventListener('click', () => this.navigate(-1, 1));
    this.westButton.addEventListener('click', () => this.navigate(0, -1));
    this.centerButton.addEventListener('click', () => this.interact());
    this.eastButton.addEventListener('click', () => this.navigate(0, 1));
    this.southWestButton.addEventListener('click', () => this.navigate(1, -1));
    this.southButton.addEventListener('click', () => this.navigate(1, 0));
    this.southEastButton.addEventListener('click', () => this.navigate(1, 1));
}

removeEventListeners() {
    this.northWestButton.removeEventListener('click', () => this.navigate(-1, -1));
    this.northButton.removeEventListener('click', () => this.navigate(-1, 0));
    this.northEastButton.removeEventListener('click', () => this.navigate(-1, 1));
    this.westButton.removeEventListener('click', () => this.navigate(0, -1));
    this.centerButton.removeEventListener('click', () => this.interact());
    this.eastButton.removeEventListener('click', () => this.navigate(0, 1));
    this.southWestButton.removeEventListener('click', () => this.navigate(1, -1));
    this.southButton.removeEventListener('click', () => this.navigate(1, 0));
    this.southEastButton.removeEventListener('click', () => this.navigate(1, 1));
}
```

TODO: bind omdat we in the addTodo gebruik maken van `this`, en onze methode die we meegeven aan de addEventListener geen arrow function is, moeten we de methode binden met .bind(this). Anders zou `this` binnen de addTodo methode niet verwijzen naar de instantie van de TodoSection class, maar naar het element waarop het event is getriggerd, wat niet is wat we willen. Door `this.addTodo.bind(this)` te gebruiken, zorgen we ervoor dat `this` binnen de addTodo methode altijd verwijst naar de instantie van de TodoSection class, ongeacht hoe de methode wordt aangeroepen.

```javascript
export class TodoSection {
    constructor() {
        this.todoForm = document.querySelector('#todo-form');
        this.todoList = document.querySelector('.todo-list');
        this.todoItemTemplate = document.querySelector('#todo-item-template');

        this.todos = [];

        this.todoForm.addEventListener('submit', this.addTodo.bind(this));
    }

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