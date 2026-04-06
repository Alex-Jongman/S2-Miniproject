# Try / Catch

In JavaScript kun je fouten afhandelen met behulp van `try` en `catch`. Dit is een manier om te voorkomen dat je programma crasht wanneer er een fout optreedt, en in plaats daarvan de fout op een gecontroleerde manier af te handelen.

```javascript
try {
    // Code die mogelijk een fout kan veroorzaken
} catch (error) {
    // Code om de fout af te handelen
}
```

De `catch` zijn we ook al bij de Promises tegengekomen, waar de `catch` methode wordt gebruikt om fouten af te handelen die zijn opgetreden in een van de voorgaande `then` blokken. 

```javascript
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => {
        // Verwerk de data
    })
    .catch(error => {
        // Afhandeling van eventuele fouten
        console.error('Error fetching data:', error);
    });
```

Het `catch` blok ontvangt een argument, vaak `error` genoemd van het type [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error), dat informatie bevat over de fout die is opgetreden. Je kunt deze informatie gebruiken om te bepalen hoe je de fout wilt afhandelen, bijvoorbeeld door een foutmelding te loggen of een gebruikersvriendelijke boodschap weer te geven.

De error kan veroorzaakt worden door run time errors zoals het proberen te lezen van een property van `undefined`, of door expliciet een fout te gooien met `throw`, zoals in het geval van onze `getMapDataForCurrentPosition` methode, waar we controleren of `currentPosition` is ingesteld voordat we proberen map data op te halen, en als dat niet het geval is, gooien we een nieuwe error met een duidelijke boodschap. Zoals je in de code hieronder kunt zien maken we een nieuwe Error instantie aan met `new Error('Current position is not set. Cannot fetch map data.')`, en deze error wordt vervolgens gegooid met `throw`, waardoor de uitvoering van de code in het `try` blok wordt gestopt en de controle wordt overgedragen aan het `catch` blok, waar we de fout kunnen afhandelen, bijvoorbeeld door een foutmelding te loggen of een gebruikersvriendelijke boodschap weer te geven.

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

Je zou binnen het `catch` blok ook met behulp van bijvoorbeeld een `switch` statement kunnen controleren op het type fout dat is opgetreden, wat handig kan zijn voor de verschillende type HttpErrors die we hebben, en daar vervolgens adequate actie op ondernemen.
In sommige gevallen willen we echter dat ongeacht of er wel of niet een fout is opgetreden, er toch nog bepaalde code wordt uitgevoerd, bijvoorbeeld om resources vrij te geven of om een bepaalde status bij te werken. Goed voorbeeld zou hier het clearen van een Interval kunnen zijn. In dat geval kunnen we een `finally` blok gebruiken, dat altijd wordt uitgevoerd nadat het `try` en eventuele `catch` blokken zijn uitgevoerd.

```javascript
try {
    // Code die mogelijk een fout kan veroorzaken
} catch (error) {
    // Code om de fout af te handelen
} finally {
    // Code die altijd wordt uitgevoerd, ongeacht of er een fout is opgetreden of niet
}
```

---

[:arrow_left: JS - Object-Oriented Programming](./JS-OOP.md) | [:house: README](./README.md) | [JS - DOM Manipulation :arrow_right:](./DOM-manipulation.md)