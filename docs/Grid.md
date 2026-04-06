# CSS - Grid

Als we goed naar de HTML van onze startpagina kijken, dan valt op dat de `<footer>` boven de `<main>` staat, terwijl we die in onze visuele weergave juist onder de `<main>` zouden verwachten. Dit komt omdat de volgorde van elementen in de HTML niet per se overeen hoeft te komen met de volgorde van elementen in de visuele weergave.

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="stylesheet" href="index.css" />

  <title>HUfteling</title>

  <script type="module" src="./src/view/pages/kassa-page.js"></script>
</head>

<body>
  <header>
    <h1>De HUfteling</h1>
  </header>
  <footer>
    <p>&copy; 2026 HU-S2.</p>
  </footer>
  <main>
    <img id="kassa" src="./images/kassa.jpg" alt="kassa">
    <form id="kassa-form">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
      <br>
      <button type="submit">Login</button>
    </form>
  </main>
</body>

</html>
```

De HTML gaat alleen over de content en structuur van de pagina, terwijl de CSS bepaalt hoe die content en structuur eruit zien. In dit geval kunnen we met CSS Grid de elementen op de juiste plek zetten, ongeacht hun volgorde in de HTML.

In de `<head>` van onze HTML file kijken, zien we dat deze naar een CSS file verwijst genaamd `index.css`. 

## Selectoren

De CSS file bestaat uit een of meerdere **"selectors"** die definiëren welke HTML elementen ze targeten en hoe ze die elementen willen stylen.

Een selector kan een HTML **tag** zijn, zoals `header`, `main`, of `footer`, maar kan ook een **class** zijn die we aan een element hebben toegekend. In dat geval staat er in de HTML een `class` attribuut bij het element, bijvoorbeeld `<section class="voorwoord">`, en in de CSS kunnen we die class targeten met `.voorwoord { ... }` (let op de punt die in de CSS bij een class staat).
Alternatief kunnen we ook een **id** gebruiken, bijvoorbeeld `<img id="kassa" src="./images/kassa.jpg" alt="kassa">`, en in de CSS kunnen we die id targeten met `#kassa { ... }` (let op het hekje dat in de CSS bij een id staat).

> [!WARNING]
>
> Wees bedacht bij het gebruik van id's in HTML, omdat deze uniek zouden moeten zijn binnen een pagina (maar de browser geeft geen foutmelding als dat niet zo is). Het is vaak beter om classes te gebruiken voor styling, omdat deze herbruikbaar zijn.

Verder kunnen we de selector ook combineren, bijvoorbeeld `main img { ... }` om alle `img` elementen binnen het `main` element te targeten. En kunnen we ook nog gebruik maken van **pseudo-selectors**, zoals `main img:hover { ... }` om de styling van een `img` element binnen `main` te veranderen wanneer er met de muis overheen wordt gegaan.

## Grid-template-areas

Om onze site te stylen maken we gebruik van CSS Grid, een krachtige tool voor het maken van complexe layouts. Met CSS Grid kunnen we een grid opmaak maken van onze HTML pagina, waarbij we de verschillende elementen in onze HTML pagina kunnen plaatsen in verschillende gebieden van de grid.

> [!NOTE]
>
> CSS Grid is een relatief nieuwe technologie, waardoor veel voorbeelden en tutorials op het internet nog gebruik maken van oudere technieken zoals floats of flexbox. Het is belangrijk om te zoeken naar recente bronnen die CSS Grid gebruiken, zodat je de meest up-to-date informatie krijgt.

Om een grid opmaak te maken van onze HTML pagina, moeten we eerst de `display` property van het element dat we willen stylen op `grid` zetten. In ons geval willen we de hele pagina in een grid opmaken, dus zetten we `display: grid;` op het `body` element.

```css
body {
    display: grid;
    height: 100vh;
    ...
```

Voor de grid opmaak van onze HTML pagina gebruiken we de `grid-area-template` property. 
Deze property verwacht een of meerdere strings die de layout van onze grid definiëren. Elke string vertegenwoordigt een rij in de grid, en binnen elke string kunnen we namen toekennen aan de verschillende gebieden van de grid. In ons geval hebben we drie gebieden: `header`, `main`, en `footer`, die we in een enkele kolom plaatsen. Maar we hadden deze ook `kop`, `hoofd` en `voet` kunnen noemen, want het zijn geen sectoren, maar gebieden die we met css gaan benoemen.

```css
body {
    display: grid;
    height: 100vh;
    grid-template-areas:
        "header"
        "main"
        "footer";
    grid-template-rows: 4rem 1fr 3rem;;
}
```

Als we meer dan een kolom zouden willen, dan zouden we in de `grid-template-areas` property meerdere namen per rij kunnen opgeven zoals we dat bij de navigatie.css hebben gedaan:

```css
    grid-template-areas:
        "header  header  header  header"
        "main    main    main    aside"
        "footer  footer  footer  footer";
```

De grid-template-areas property is een handige manier om de layout van onze grid te definiëren, omdat het ons ook al meteen een visuele representatie geeft van hoe onze grid eruit zal zien. In dit geval zien we dat we een grid hebben met drie rijen en één kolom, waarbij de `header` in de eerste rij staat, de `main` in de tweede rij, en de `footer` in de derde rij.

Met de `grid-template-rows` property kunnen we de hoogte van de verschillende rijen in onze grid bepalen. In dit geval geven we de `header` een vaste hoogte van `4rem`, de `main` krijgt een flexibele hoogte van `1fr` (wat betekent dat het de resterende ruimte inneemt), en de `footer` krijgt een vaste hoogte van `3rem`.

De `grid-template-columns` property kunnen we gebruiken om de breedte van de verschillende kolommen in onze grid te bepalen, maar omdat we in dit geval maar één kolom hebben, hoeven we deze niet te specificeren.

## Grid-area

Wat we nu nog moeten doen, is de verschillende elementen in onze HTML pagina toewijzen aan de juiste gebieden in onze grid. Dit doen we met de `grid-area` property. 

```css
...

header {
    grid-area: header;
    ...
}

footer {
    grid-area: footer;
    ...
}

main {
    grid-area: main;
    ...
}

...
```

## Conclusie

Wees je ervan bewust dat je ook grids binnen grids kunt maken, waardoor je niet een hele pagina in één grid hoeft te plaatsen, maar ook alleen een gedeelte van de pagina.

Samen met de `@media` of `@container` query kunnen we ook verschillende grid layouts maken voor verschillende schermgroottes of container groottes om zo een **responsive design** (layout voor verschillende devices) realiseren. 
Dit maakt Grid een zeer krachtige tool voor het maken van complexe layouts.

---

[:arrow_left: Semantische HTML](./Semantische_html.md) | [:house: README](./README.md) | [CSS - Grid :arrow_right:](./Grid.md)
