# DOM Manipulatie

Het Document Object Model (DOM) zijn we inmiddels een aantal keer tegengekomen, maar tot nu toe hebben we alleen maar gelezen uit de DOM, bijvoorbeeld met `querySelector`. Om een interactieve website te maken, moeten we echter ook kunnen schrijven naar de DOM, oftewel DOM manipulatie.
In dit hoofdstuk gaan we alleen bestaande DOM attributen overschrijven, maar gaan we nog geen nieuwe elementen aanmaken of verwijderen. Dat doen we later bij de Todo sectie, waar we ook HTML templates gaan behandelen.

De code waar we nu de DOM manipulatie op willen toepassen is de navigatie.html. Deze bevat in de main tag de volgende HTML code:

```html
<main>
    <h2 class="location-title">locatie</h2>
    <img id="location-image" src="" alt="locatie">
    <nav>
        <button id="north-west">&#8598;</button>
        <button id="north">&#8593;</button>
        <button id="north-east">&#8599;</button>
        <button id="west">&#8592;</button>
        <button id="center" disabled>X</button>
        <button id="east">&#8594;</button>
        <button id="south-west">&#8601;</button>
        <button id="south">&#8595;</button>
        <button id="south-east">&#8600;</button>
    </nav>
</main>
```

Deze code geeft ons de naam van de locatie waar we nu zijn in de h2 tag, een afbeelding van die locatie in de img tag, en een aantal buttons waarmee we kunnen navigeren naar aangrenzende locaties of kunnen interacteren met de huidige locatie.
In de head van de html pagina zien we dat deze pagina de navigation-page.js script importeerd, die verantwoordelijk is voor het dynamische gedrag van deze pagina.

```html
<script type="module" src="./src/view/pages/navigation-page.js"></script>
```

Als we in de navigation-page.js kijken, zien we dat deze pagina uit twee delen bestaat, een voor de navigatie en een ander deel voor de todo sectie. We focussen hier nu op de navigatie, omdat die betrekking heeft op de html in de main section..
We zien dat de navigation-page.js een nieuwe instantie van de Navigation class aanmaakt en deze instantie initialiseert.

```javascript
import { Navigation } from "../parts/navigation.js";
import { TodoSection } from "../parts/todo-section.js";

const navigation = new Navigation();
navigation.init();

const todoSection = new TodoSection();
```

Met `new Navigation()` maken we een nieuwe instantie van de Navigation class aan, en roepen we de constructor van die class aan.
Deze constructor initialiseert alleen de properties `currentPosition` en `mapData` op null.

```javascript
export class Navigation {

    constructor() {
        this.currentPosition = null;
        this.mapData = null;
    }
...
```

Vervolgens roepen we de `init` methode van de navigation instantie aan, die verantwoordelijk is voor het initialiseren van de pagina.

```javascript
init() {
    this.initElements();
    this.getCurrentPosition()
        .then(() => {
            this.getMapDataForCurrentPosition();
        })
        .catch(error => {
            console.error('Error initializing navigation:', error);
            this.handleHttpError(error);
        });
}
```

Deze init methode roept eerst de `initElements` methode aan, die verantwoordelijk is voor het selecteren van alle elementen die we nodig hebben en het toevoegen van event listeners aan de buttons (zie code hieronder). 

```javascript
initElements() {
    this.northWestButton = document.querySelector('#north-west');
    this.northButton = document.querySelector('#north');
    this.northEastButton = document.querySelector('#north-east');
    this.westButton = document.querySelector('#west');
    this.centerButton = document.querySelector('#center');
    this.eastButton = document.querySelector('#east');
    this.southWestButton = document.querySelector('#south-west');
    this.southButton = document.querySelector('#south');
    this.southEastButton = document.querySelector('#south-east');

    this.titleElement = document.querySelector('.location-title');
    this.imageElement = document.querySelector('#location-image');

    this.addEventListeners();
}

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
```

Vervolgens haalt de `init` methode de huidige positie van de gebruiker op met `getCurrentPosition`, en dan als dat gelukt is, haalt het met `getMapDataForCurrentPosition` de map data op voor de huidige positie.

```javascript
getCurrentPosition() {
    return mapService.getCurrentPosition()
        .then(position => {
            this.currentPosition = position;
        })
        .catch(error => {
            console.error('Error fetching starting position:', error);
            this.handleHttpError(error);
        });
}

getMapDataForCurrentPosition() {
    try {
        if (!this.currentPosition) {
            throw new Error('Current position is not set. Cannot fetch map data.');
        }
        mapService.getMapData(this.currentPosition.y, this.currentPosition.x)
            .then(mapData => {
                this.mapData = mapData;
                this.render();
            })
            .catch(error => {
                console.error('Error fetching map data for current position:', error);
                this.handleHttpError(error);
            });
    } catch (error) {
        console.error('Error in getMapDataForCurrentPosition:', error);
        this.handleHttpError(error);
    }
}
```

De `getMapDataForCurrentPosition` methode maakt dat we uiteindelijk in de property `mapData` een json object hebben met alle data die nodig zijn rondom de huidige locatie van de gebruiker.
De structuur van dit json object hebben we al in een eerder hoofdstuk besproken en is als volgt:

```json
{
    "metadata": {
        "name": "Locatie Naam",
        "photo": "locatie.jpg",
        "interactable": true
    },
    "deelmatrix": [
        [true, true, false],
        [false, true, true],
        [true, false, true]
    ]
}
```

Nu dat we in het bezit zijn van deze data kunnen we de `render` methode aanroepen.
De `render` methode is een methode die we ook vaak in diverse JavaScript frameworks tegen komen en die verantwoordelijk voor het aanpassen van de DOM op basis van de data die we hebben. 

```javascript
render() {
    // Debugging info
    console.log(`Rendering location at (${this.currentPosition.x}, ${this.currentPosition.y}) with map data:`, this.mapData);
    console.log(`Mapdata type: ${typeof this.mapData}, keys: ${Object.keys(this.mapData)}`);
    console.log(`Mapdata metadata:`, this.mapData.metadata);

    // Update the Title
    this.titleElement.textContent = `${this.mapData.metadata.name} (${this.currentPosition.x}, ${this.currentPosition.y})`;

    // Update the Image
    this.imageElement.setAttribute('src', `./images/${this.mapData.metadata.photo}`);
    this.imageElement.setAttribute('alt', `Location at (${this.currentPosition.x}, ${this.currentPosition.y})`);

    // Enable/Disable Navigation Buttons
    this.northWestButton.disabled = !this.mapData.deelmatrix[0][0];
    this.northButton.disabled = !this.mapData.deelmatrix[0][1];
    this.northEastButton.disabled = !this.mapData.deelmatrix[0][2];
    this.westButton.disabled = !this.mapData.deelmatrix[1][0];
    // The center button should be enabled depending on the metadata interactable property.
    this.centerButton.disabled = !this.mapData.metadata.interactable;
    this.eastButton.disabled = !this.mapData.deelmatrix[1][2];
    this.southWestButton.disabled = !this.mapData.deelmatrix[2][0];
    this.southButton.disabled = !this.mapData.deelmatrix[2][1];
    this.southEastButton.disabled = !this.mapData.deelmatrix[2][2];
}
```

In dit geval zien we dat onze render methode statements bevat die de `textContent` van elementen aanpassen, maar ook statements die de attributen van elementen aanpassen.
Een attribuut kun je aanpassen met de `setAttribute` methode, waarbij je de naam van het attribuut van de html tag meegeeft en de waarde die je wilt instellen. 
In dit geval passen we het src attribuut van de image tag aan, zodat er een andere afbeelding wordt weergegeven afhankelijk van de locatie van de gebruiker. 
We passen ook het alt attribuut aan, zodat er een passende alt tekst is voor elke locatie.
Maar we kunnen ook direct de attributen van een element aanpassen, zoals we doen bij het disabled attribuut van de buttons. We kunnen dit attribuut direct aanpassen door er een boolean waarde aan toe te wijzen. In dit geval stellen we het disabled attribuut in op true of false afhankelijk van de deelmatrix van de map data, zodat alleen de knoppen worden ingeschakeld die leiden naar toegankelijke locaties.
Merk wel op dat boolean attributen zoals disabled, checked, etc. in HTML alleen hoeven te worden toegevoegd zonder waarde (\<button disabled> in plaats van \<button disabled="true"> en \<button> voor als disabled false is) om als true te worden geïnterpreteerd, maar in JavaScript moeten we deze attributen expliciet instellen op true of false.

Als een button disabled is, betekend dit dat we deze niet aan kunnen klikken en dus dat de event handler die we eerder aan deze button hebben gekoppeld niet zal worden uitgevoerd. Als de button wel enabled is en de gebruiker erop klikt wordt de event handler uitgevoerd. In het geval van de navigatie buttons zal dit resulteren in het aanroepen van de navigate methode met de juiste deltaY en deltaX waarden voor de verplaatsing naar de nieuwe locatie. De navigate methode zal vervolgens de huidige positie van de gebruiker aan de backend updaten en daarna de map data voor de nieuwe locatie ophalen, wat uiteindelijk zal resulteren in een nieuwe render van de pagina met de data van de nieuwe locatie.
En als de center button enabled is en de gebruiker klikt erop, zal de interact methode worden aangeroepen, die een alert zal tonen met een boodschap afhankelijk van de huidige locatie van de gebruiker.

Weet dat we voor er voor het class attribuut van een html element ook een speciale methode hebben, namelijk classList. Met deze methode kunnen we klassen toevoegen of verwijderen van een element, wat handig is voor het toepassen van CSS stijlen. In dit geval gebruiken we het niet, maar het is goed om te weten dat deze mogelijkheid er is.

## Conclusie

Wat je nu hebt gezien is hoe je de attributen van een bestaande DOM kunt aanpassen.Wat we hier niet hebben behandeld is hoe je nieuwe html elementen kunt aanmaken en toevoegen aan de DOM, danwel hoe je bestaande elementen kunt verwijderen. Dit gaan we bij de Todo sectie in combinatie met HTML templates behandelen.

---

[:arrow_left: JS - Try / Catch](./Try-Catch.md) | [:house: README](./README.md) | [JS - Arrays :arrow_right:](./Arrays.md)