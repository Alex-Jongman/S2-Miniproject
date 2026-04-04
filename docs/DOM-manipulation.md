# DOM Manipulatie

TODO: DOM uitleggen, en wat we verstaan onder DOM manipulatie.

Simpel voorbeeld is de DOM van navigate.html, waar we focussen op het main element.
In de HTML van de main staat alle tags die de browser moet weergeven, alleen de attribuut waarden van de tags moeten dynamisch worden aangepast op basis van de locatie van de gebruiker.

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
TODO: De navigation-page.js geeft aan dat de pagina uit twee delen bestaat, een voor de navigatie en een ander deel voor de todo sectie. We focussen hier nu op de navigatie.
We zien dat de navigation-page.js een nieuwe instantie van de Navigation class aanmaakt en deze instantie initialiseert.

```javascript
import { Navigation } from "../parts/navigation.js";
import { TodoSection } from "../parts/todo-section.js";

const navigation = new Navigation();
navigation.init();

const todoSection = new TodoSection();
```

TODO: De navigation.js class gaat alleen over het main gedeelte van deze pagina.
De init roept initElements aan, die alle elementen die we nodig hebben selecteert en opslaat als properties van de class en aan elke button een event listener toevoegt.
Hierna haalt de init functie de huidige positie van de gebruiker op en vervolgens de map data voor die positie, en roept daarna de render methode aan. 

```javascript
import { mapService } from "../../service/map-service.js";

export class Navigation {

    constructor() {
        this.currentPosition = null;
        this.mapData = null;
    }

    /**
     * Handles HTTP errors by redirecting to appropriate error pages based on status code.
     * @param {Error} error - The error object containing status information.
     * @returns {boolean} - Returns true if error was handled (redirected), false otherwise.
     */
    handleHttpError(error) {
        if (error?.status === 401) {
            window.location.href = './401.html';
            return true;
        } else if (error?.status === 403) {
            window.location.href = './403.html';
            return true;
        } else {
            window.location.href = './error.html';
            return true;
        }
    }

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

    navigate(deltaY, deltaX) {
        const newX = this.currentPosition.x + deltaX;
        const newY = this.currentPosition.y + deltaY;

        // Update the current position
        this.currentPosition = { x: newX, y: newY };
        
        // send new position to the backend to update the current position
        mapService.setCurrentPosition(this.currentPosition)
            .then((newPosition) => {
                this.getMapDataForCurrentPosition();
            })
            .catch(error => {
                console.error('Error setting current position:', error);
                this.handleHttpError(error);
            });
    }

    interact() {
        let message = `Interacting with the environment at (${this.currentPosition.x}, ${this.currentPosition.y})...`;
        
        if (this.currentPosition.x == 2 && this.currentPosition.y == 1) {
            message = "Papier hier!!!";
        }
        if (this.currentPosition.x == 4 && this.currentPosition.y == 1) {
            message = "Het is hier een gekkenhuis, mijn code werkt niet meer, help!!!";
        }
        if (this.currentPosition.x == 2 && this.currentPosition.y == 2) {
            message = "Yuppie, een vlucht met de Pagode !";
        }
        alert(message);
    }

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
}
```

TODO: We proberen onze part klasse altijd een methode te geven die verantwoordelijk is voor het renderen van de pagina, dus voor de daadwerkelijke DOM manipulatie. 

In dit geval zien we dat onze render methode statements bevat die de textContent van elementen aanpassen, maar ook statements die de attributen van elementen aanpassen.
Een attribuut kun je aanpassen met de setAttribute methode, waarbij je de naam van het attribuut meegeeft en de waarde die je wilt instellen. In dit geval passen we het src attribuut van de image tag aan, zodat er een andere afbeelding wordt weergegeven afhankelijk van de locatie van de gebruiker. We passen ook het alt attribuut aan, zodat er een passende alt tekst is voor elke locatie.
Maar we kunnen ook direct de attributen van een element aanpassen, zoals we doen bij het disabled attribuut van de buttons. We kunnen dit attribuut direct aanpassen door er een boolean waarde aan toe te wijzen. In dit geval stellen we het disabled attribuut in op true of false afhankelijk van de deelmatrix van de map data, zodat alleen de knoppen worden ingeschakeld die leiden naar toegankelijke locaties.

Weet dat we voor er voor het class attribuut van een html element ook een speciale methode hebben, namelijk classList. Met deze methode kunnen we klassen toevoegen of verwijderen van een element, wat handig is voor het toepassen van CSS stijlen. In dit geval gebruiken we het niet, maar het is goed om te weten dat deze mogelijkheid er is.

## Conclusie

Wat je nu hebt gezien is hoe je de attributen van een bestaande DOM kunt aanpassen.Wat we hier niet hebben behandeld is hoe je nieuwe html elementen kunt aanmaken en toevoegen aan de DOM, danwel hoe je bestaande elementen kunt verwijderen. Dit gaan we bij de Todo sectie in combinatie met HTML templates behandelen.