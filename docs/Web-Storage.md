# Web Storage

TODO: uitleggen dat in JavaScript bij een reload van de pagina alle variabelen en data in het geheugen verloren gaan, als ook dat we soms data van de ene pagina naar de andere willen meenemen, of data willen bewaren voor later gebruik, en dat we daarvoor gebruik kunnen maken van de Web Storage API.

TODO: Verschillende Web Storage opties opsommen, zoals localStorage, sessionStorage, en cookies. Maar dat dit ouderwetse technieken zijn die een aantal nadelen hebben, zoals beperkte opslagcapaciteit. Browsers hebben echter een nieuwere API geïntroduceerd genaamd IndexedDB, die veel krachtiger is en meer mogelijkheden biedt voor het opslaan van data aan de client-side, maar dat deze ook complexer is om te gebruiken, en dat we in deze workshop vooral zullen focussen op localStorage, omdat dat de meest eenvoudige en meest gebruikte optie is voor het opslaan van data aan de client-side.

```javascript
    fetch('./api/authentication', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        // Als de response niet ok is, controleer of het een 401 status is en redirect naar de 401 pagina, anders gooi een fout.
        if (!response.ok) {
            if (response.status === 401) {
                window.location.href = '401.html';
            }
            throw new Error('Authentication failed');
        }
        // Als de response ok is, parse de JSON en return het token.
        return response.json();
    })
    // Als het token succesvol is ontvangen, sla het JWT token op in localStorage en redirect naar de navigate pagina.
    .then((token) => {
        // Store the JWT token in localStorage or sessionStorage
        localStorage.setItem('jwtToken', token.JWT);
        window.location.href = 'navigate.html';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
```

TODO: Laten zien dat we in onze login-form.js gebruik maken van de localStorage API, en dat we het resultaat in de Dev Tools terug kunnen zien in de Application tab, onder Local Storage. En dat we daar ook data kunnen verwijderen of aanpassen, en dat dat effect heeft op onze applicatie, omdat we die data gebruiken om te bepalen of een gebruiker is ingelogd of niet, en welke plekken er al bezocht zijn. En dat we ook kunnen checken wat er gebeurt als we de pagina herladen, en dat we dan nog steeds die data hebben, omdat het is opgeslagen in localStorage, en dat dat anders zou zijn als we die data alleen in een variabele hadden opgeslagen, omdat die dan verloren zou gaan bij een reload van de pagina.

```javascript
class MapService {

    constructor() {
        this.backendUrl = './api/map';
        this.JWTToken = localStorage.getItem('jwtToken') || null; // Placeholder for JWT token if needed in the future
        this.fetchOptions = {
            headers: {
                'Authorization': `Bearer ${this.JWTToken}`
            }
        };
    }
```

TODO: Laten zien dat we in onze navigate.js de data die de login-form heeft opgeslagen gebruiken. Doorgaan op de mogelijke issue die zou kunnen ontstaan als we nu besluiten om in de login-form de key een andere naam zouden willen geven. De consequentie is dat we nu ook in de MapService class die key zouden moeten aanpassen, anders werkt onze applicatie niet meer. Dit is een voorbeeld van **tight coupling**, en dat we dit kunnen voorkomen door gebruik te maken van een constante voor die key, zodat we die op één plek kunnen aanpassen als dat nodig is, en dat we dan ook meteen de naam van die key duidelijk maken, omdat het dan een constante is met een duidelijke naam, in plaats van een string literal die overal in onze code voorkomt.
Gebruik van een service class die verantwoordelijk is voor de JWT token zou beter zijn en een **loose coupling** creëren, omdat we dan de manier waarop we de JWT token opslaan en ophalen kunnen abstraheren, en dat we dan in de toekomst makkelijk kunnen switchen naar een andere opslagmethode als dat nodig is, zonder dat we overal in onze code aanpassingen hoeven te maken. We zouden bijvoorbeeld een AuthService class kunnen maken die verantwoordelijk is voor het opslaan en ophalen van de JWT token, en dat we die class dan kunnen gebruiken in zowel de login-form als de navigate.js, zodat we daar geen directe afhankelijkheid meer hebben van localStorage, en dat we die in de toekomst makkelijk kunnen vervangen door bijvoorbeeld IndexedDB of een andere opslagmethode als dat nodig is.

