# Try / Catch

TODO: Zijn de catch al bij de Promises tegen gekomen, maar dat try/catch ook gewoon in gewone JavaScript code gebruikt kan worden, en dat het eigenlijk heel erg handig is om fouten af te handelen, omdat je dan niet zomaar een fout krijgt in de console die je misschien niet begrijpt, maar dat je die fout zelf kunt afhandelen en er iets mee kunt doen, zoals een foutmelding tonen aan de gebruiker of een fallback uitvoeren. En dat je bij het gebruik van async/await nog steeds try/catch moet gebruiken om fouten af te handelen, omdat async/await eigenlijk gewoon syntactische suiker is voor Promises, dus onder de motorkap werkt het nog steeds met Promises, en dat je dus nog steeds te maken hebt met dezelfde asynchrone aard van JavaScript en de manier waarop het omgaat met asynchrone operaties.

TODO: Throw toelichten

```javascript
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