# EventListeners

Events zijn gebeurtenissen die plaatsvinden in de browser, zoals het klikken op een knop, het invullen van een formulier, of het laden van een pagina. In de frontend ontwikkeling is het belangrijk om te kunnen reageren op deze events, zodat we interactieve en dynamische webapplicaties kunnen maken. Hiervoor gebruiken we event listeners, die ons in staat stellen om functies uit te voeren wanneer bepaalde events plaatsvinden.

Dit betekend wel dat we te maken hebben met asynchroniteit, omdat we niet altijd van tevoren kunnen weten wanneer een gebruiker een actie zal uitvoeren. Daarom is het belangrijk om te begrijpen hoe event listeners werken en hoe we ze kunnen gebruiken om onze webapplicaties interactief te maken.

## addEventListener

Een event listener zelf is een functie die wordt uitgevoerd wanneer een bepaald event plaatsvindt. We kunnen event listeners toevoegen aan DOM-elementen met behulp van de `addEventListener` methode, die beschikbaar is op elk DOM-element. Met deze methode kunnen we specificeren op welk type event we willen reageren, en welke functie we willen uitvoeren wanneer dat event plaatsvindt.

We kunnen bijvoorbeeld een click event listener toevoegen aan een knop, zodat er iets gebeurt wanneer de gebruiker op die knop klikt. Maar we zouden ook een click event listener kunnen toevoegen aan een afbeelding, zodat er iets gebeurt wanneer de gebruiker op die afbeelding klikt. Maar we zouden ook een click event listener kunnen toevoegen aan het hele document, door de event listener aan het `document` object toe te voegen, zodat er iets gebeurt wanneer de gebruiker ergens op de pagina klikt. Het is dus belangrijk om goed na te denken aan welk element we een event listener toevoegen, omdat dat bepaalt wanneer die event listener wordt getriggerd, en dat kan invloed hebben op de gebruikerservaring van onze webapplicatie. Advies is om event listeners zo specifiek mogelijk toe te voegen, zodat ze alleen worden getriggerd wanneer dat relevant is, en dat we zo voorkomen dat er onbedoelde gevolgen zijn van het triggeren van een event listener op een element waar dat niet relevant is.

De `addEventListener` methode verwacht twee argumenten: het type event waarop we willen reageren, en een callback functie die wordt uitgevoerd wanneer dat event plaatsvindt.  
Het **type event** is een string die het type event specificeert waarop we willen reageren, zoals 'click', 'submit', 'keydown', etc. Er zijn heel veel verschillende soorten standaard events waarop we kunnen reageren. Voor een volledige lijst van standaard events kunnen we de [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Events) raadplegen.  
De **callback functie** is de functie (die we vaak een handler noemen) waarvan we willen dat die wordt uitgevoerd wanneer het event plaatsvindt. Deze functie kan een anonieme functie zijn, maar het is vaak beter om een named function te gebruiken, zodat we die functie ook weer kunnen verwijderen als dat nodig is, en dat we zo voorkomen dat er event listeners blijven hangen die niet meer relevant zijn en die mogelijk fouten kunnen veroorzaken als ze worden getriggerd.

> [!IMPORTANT]
>
> Een veel gemaakte fout is om de callback functie direct aan te roepen in plaats van een referentie naar die functie mee te geven aan de `addEventListener` methode. Dit kan leiden tot onverwacht gedrag, omdat de functie dan direct wordt uitgevoerd in plaats van wanneer het event plaatsvindt. Zorg er dus altijd voor dat je een referentie naar de functie meegeeft, en niet de functie zelf aanroept.
> ```javascript
> // FOUT: De functie wordt direct aangeroepen in plaats van wanneer het event plaatsvindt.
> form.addEventListener('submit', loginHandler());
>
> // GOED: We geven een referentie naar de functie mee, zodat die wordt uitgevoerd wanneer het event plaatsvindt.
> form.addEventListener('submit', loginHandler);
> ```

## Event object

Wordt de event handler functie getriggerd, dan krijgt deze functie automatisch een event object mee als argument. Dit event object bevat allerlei informatie over het event dat heeft plaatsgevonden, zoals het type event, het element waarop het event is getriggerd, en andere relevante gegevens. We kunnen dit event object gebruiken binnen onze event handler functie om te reageren op het event dat heeft plaatsgevonden. Bijvoorbeeld, bij een form submit event kunnen we met `event.preventDefault()` voorkomen dat het formulier de pagina herlaadt bij het indienen. Maar we zouden ook kunnen checken wie het event heeft getriggerd, door bijvoorbeeld `event.target` te gebruiken, of we zouden kunnen checken welke toets er is ingedrukt bij een keydown event, door `event.key` te gebruiken.

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

```javascript
function loginHandler(event) {
    // Voorkom dat het formulier de pagina herlaadt bij het indienen.
    event.preventDefault();
    ...
}

const form = document.querySelector('#kassa-form');
form.addEventListener('submit', loginHandler);
```

## removeEventListener

Events zijn erg lastig om te debuggen, omdat ze asynchroon zijn en het soms moeilijk is om te achterhalen wanneer en waarom een event wordt getriggerd. Dit wordt nog vervelender als de instantie die de event listener heeft toegevoegd niet meer bestaat op het moment dat het event wordt getriggerd, omdat dat kan leiden tot fouten die moeilijk te begrijpen zijn. Het is daarom belangrijk om event listeners ook weer te verwijderen als ze niet meer nodig zijn, bijvoorbeeld door gebruik te maken van de `removeEventListener` methode, zodat we voorkomen dat er event listeners blijven hangen die niet meer relevant zijn en die mogelijk fouten kunnen veroorzaken als ze worden getriggerd. De `removeEventListener` methode verwacht echter dezelfde argumenten als de `addEventListener` methode, en dat kan soms lastig zijn, zeker als we gebruik maken van anonieme functies als event handlers, omdat we die dan niet kunnen verwijderen, omdat we geen referentie hebben naar die functie. Het is daarom aan te raden om altijd een named function te gebruiken als event handler, zodat we die functie ook weer kunnen verwijderen als dat nodig is, en dat we zo voorkomen dat er event listeners blijven hangen die niet meer relevant zijn en die mogelijk fouten kunnen veroorzaken als ze worden getriggerd.

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

## bind

In de frontend ontwikkeling wordt het steeds gebruikelijker om te werken met classes. Hier zien we vaak code die een event listener toevoegt en een methode van die class als event handler gebruikt. Als deze methode gebruik maakt van `this`, wat verwijst naar de instantie van de class, dan moeten we hier ermee rekening houden dat `this` binnen die methode niet automatisch verwijst naar de instantie van de class wanneer die methode wordt gebruikt als event handler, omdat de context van `this` binnen een event handler anders is dan binnen een normale methode. Om ervoor te zorgen dat `this` binnen de event handler verwijst naar de instantie van de class, moeten we de methode binden aan de juiste context met behulp van de `bind` methode.
Het binden van een methode aan de juiste context zorgt ervoor dat `this` binnen die methode altijd verwijst naar de instantie van de class, ongeacht hoe die methode wordt aangeroepen. Het binden zelf doen we door bij de addEventListener de callback functie uit te breiden met `.bind(this)`, waarbij `this` verwijst naar de instantie van de class. Hierdoor zorgen we ervoor dat `this` binnen de event handler altijd verwijst naar de instantie van de class, ongeacht hoe die methode wordt aangeroepen.

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

Een uitzondering hierop is wanneer we gebruik maken van arrow functions als event handlers, omdat deze automatisch binden aan de context waarin ze zijn gedefinieerd, en dat betekent dat `this` binnen een arrow function altijd verwijst naar de context waarin die arrow function is gedefinieerd, ongeacht hoe die functie wordt aangeroepen. Hierdoor hoeven we in dat geval geen gebruik te maken van de `bind` methode, omdat de arrow function al automatisch gebonden is aan de juiste context.

## Legacy JS

Als je op het internet naar voorbeelden zoekt van hoe je met events kunt werken in JavaScript, dan zul je waarschijnlijk veel voorbeelden vinden van de zogenaamde "legacy" manier van werken met events.
In dat soort voorbeelden zie je vaak in de HTML code dat er gebruik wordt gemaakt van `onclick` of `onsubmit` attributen, waarbij er in die attributen een functie wordt aangeroepen wanneer het event plaatsvindt. 

```html
<form id="kassa-form" onsubmit="loginHandler(event)">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required>
    <br>
    <label for="password">Password:</label>
    ...
```

En in de JavaScript code zie je dan dat er functies worden gedefinieerd die worden aangeroepen wanneer die events plaatsvinden. Deze manier van werken is verouderd en wordt niet meer aanbevolen, omdat het leidt tot minder gestructureerde code, en omdat het moeilijker is om meerdere event handlers toe te voegen aan hetzelfde element, of om event handlers te verwijderen als dat nodig is. Het gebruik van `addEventListener` is de moderne en aanbevolen manier om te werken met events in JavaScript, omdat het ons in staat stelt om op een gestructureerde manier event handlers toe te voegen en te verwijderen, en omdat het ons in staat stelt om meerdere event handlers toe te voegen aan hetzelfde element zonder dat ze elkaar overschrijven.

---

[:arrow_left: JS - QuerySelector](./Queryselector.md) | [:house: README](./README.md) | [JS - Forms :arrow_right:](./Reading-Forms.md)