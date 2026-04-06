# Semantische HTML

Semantische HTML is het gebruik van HTML-elementen die de betekenis van de inhoud duidelijk maken, zowel voor ontwikkelaars als voor browsers en assistieve technologieën. Het helpt bij het verbeteren van de toegankelijkheid (Accessibility), Search Engine Optimization (SEO) en onderhoudbaarheid van webpagina's.

Semantische HTML-elementen zijn dus niet alleen bedoeld om de structuur van een webpagina te definiëren, maar ook om de betekenis van de inhoud over te brengen. Voorbeelden van semantische HTML-elementen zijn `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, en `<footer>`.

Voorbeelden van HTML-elementen die niet semantisch zijn, zijn `<div>` en `<span>`, die vaak worden gebruikt voor stylingdoeleinden, maar geen specifieke betekenis hebben. 

> [!IMPORTANT]
>
> Het is dan ook belangrijk om de `<div>` en `<span>` elementen alleen te gebruiken wanneer er geen geschikt semantisch element beschikbaar is, en om altijd te streven naar het gebruik van semantische HTML-elementen waar mogelijk.

> [!NOTE]
> 
> Voor een overzicht van alle HTML Elementen en hun betekenis, zie de [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements).

Als we kijken naar de HTML-code van onze startpagina, de kassa, zien we dat deze geen enkele `div` of `span` bevat, maar alleen semantische elementen zoals `<header>`, `<main>`, en `<footer>`. Dit is een goed voorbeeld van het gebruik van semantische HTML, omdat het de structuur en betekenis van de inhoud duidelijk maakt voor zowel ontwikkelaars als browsers en assistieve technologieën.

```html
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
```

---

[:house: README](./README.md) | [CSS - Grid :arrow_right:](./Grid.md)
