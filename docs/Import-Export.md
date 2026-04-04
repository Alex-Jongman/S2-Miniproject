# Import & Export / File structuur

Doordat we in onze HTML de JavaScript met het attribuut `type="module"` hebben gemarkeerd, kunnen we gebruik maken van de moderne JavaScript functionaliteiten voor het importeren en exporteren van code tussen verschillende bestanden. Dit stelt ons in staat om onze code op te splitsen in kleinere, beter beheersbare stukken, wat de leesbaarheid en onderhoudbaarheid van onze codebase aanzienlijk verbetert.

```html
...
 <script type="module" src="./src/view/pages/kassa-page.js"></script>
 ...
 ```

We zouden ook alles in een enkele JavaScript file kunnen plaatsen, maar dat zou al snel onoverzichtelijk worden. Door onze code op te splitsen in verschillende bestanden kunnen we logische groepen van functionaliteit creëren en deze gemakkelijk terugvinden.

Voor de opsplitsing van onze frontend code bestaan er geen vaste regels, maar een handige aanpak is om een mappenstructuur te creëren die de verschillende onderdelen van onze applicatie logisch groepeert. Waarbij we voor nu adviseren om de volgende mappenstructuur voor de frontend code aan te houden:

```text
src
├── services
├── view
│   ├── pages
│   └── parts
```

## Pages

Zoals eerder aangegeven dient elke HTML pagina precies één JavaScript file te importern. Om flexibel en toekomstbestendig te zijn, is het handig dat elke html file zijn eigen JavaScript file heeft, ook al delen sommige pagina's nu nog dezelfde functionaliteit. Op deze manier kunnen we in de toekomst gemakkelijk verschillende functionaliteiten toevoegen aan verschillende pagina's zonder dat we een grote centrale JavaScript file hoeven te onderhouden.
Deze JavaScript file per pagina plaatsen we in de map `src/view/pages`.

Veel functionaliteit zal deze JavaScript file echter niet bevatten. De functionaliteiten van een pagina plaatsen we namelijk in aparte JavaScript files die we in de map `src/view/parts` plaatsen. De JavaScript page file importeert vervolgens de benodigde functionaliteiten vanuit de `parts` map en initialiseert deze.
Hierdoor bereiken we dat code die door meerdere pagina's gedeeld wordt niet in de JavaScript file van een specifieke pagina staat, maar in aparte files in de `parts` map, die door meerdere pagina's geïmporteerd kunnen worden.

We gebruiken hiervoor het `import` statement, waarmee we of een gehele file kunnen importeren of specifieke functies, klassen, of variabelen uit een file kunnen importeren. 

```javascript
// Importing specific functions from a file
import { className, functionName, variableName } from './path/to/file.js';
// Importing an entire file (which should have a default export)
import './path/to/file.js';
```

> [!NOTE]
> 
> Elke pagina kent een eigen JavaScript file die we met de ending `-page.js` aanduiden. Elke page JavaScript file importeert vervolgens minimaal één part JavaScript file. 


## Parts

Als we naar de User Interface kijken, zien we vaak vlakken of onderdelen. Elk van deze vlakken of onderdelen kunnen we zien als een "part" van onze applicatie. In onze applicatie hebben we bijvoorbeeld een navigatie onderdeel, een interactie onderdeel, en een lijstje met plekken die we willen bezoeken. Elk van deze onderdelen kunnen we implementeren in aparte JavaScript files in de `src/view/parts` map.
