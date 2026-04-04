# Templates en dynamische rendering

TODO: Toelichten dat we in de todo-sectie een formulier hebben waarmee we nieuwe todo-items kunnen toevoegen. Toegevoeglde items willen we in de ul (unordered list) tonen. Binnen een UL hoort een lijst van li (list items) te staan, dus we willen voor elk todo item een li item maken. Het li item dat we willen toevoegen hebben we al gedefinieerd in een template, dus we kunnen dat template gebruiken om een nieuw li item te maken voor elk todo item dat we willen renderen. We kunnen dat doen door het template te klonen en vervolgens de inhoud van het gekloonde template aan te passen op basis van de gegevens van het todo item dat we willen renderen, en vervolgens het gekloonde en aangepaste template toe te voegen aan de ul in de DOM.

```html
<section class="todo-section">
    <h2>TODO</h2>
    <ul class="todo-list">
    </ul>

    <form id="todo-form">
        <input type="text" id="todo" name="todo" placeholder="Voeg een nieuwe taak toe..." />
        <button type="submit">Toevoegen</button>
    </form>
</section>

<template id="todo-item-template">
    <li>
        <input type="checkbox" class="location-checkbox" name="" id="" />
        <label for="" class="location-label"></label>
        <button class="delete-button">Verwijderen</button>
    </li>
</template>
```

In de render zien we dat we eerst de bestaande lijst leegmaken door `this.todoList.innerHTML = ''` te doen. De innerHTML property is een verleidelijke manier om de inhoud van een element te manipuleren, want in plaats van de lege string zouden we ook de gehele html code kunnen neerzetten die we willen plaatsen. Je zie dan ook vaak op het internet voorbeelden die dat doen. Maar weet dat innerHTML twee nadelen heeft. Ten eerste is het niet erg performant, omdat de browser de string opnieuw moet parsen en de DOM opnieuw moet opbouwen. Maar ten tweede is het ook nog eens onveilig, omdat als we een string gebruiken die afkomstig is van de gebruiker, dat we dan een XSS (Cross-Site Scripting) aanval kunnen krijgen, waarbij een kwaadwillende gebruiker een script kan injecteren in de string die we gebruiken, en dat script kan dan worden uitgevoerd in de context van onze website. In combinatie met bugs in de browser waar hackers weet van hebben, kan dat leiden tot ernstige beveiligingsproblemen.

```javascript
render() {
    // Clear the existing list
    this.todoList.innerHTML = '';

    console.log('Rendering todos:', this.todos);
    // Render each todo item
    this.todos.forEach(todo => {
        const todoItem = this.todoItemTemplate.content.cloneNode(true);
        const listItemElement = todoItem.querySelector('li');
        const checkboxElement = todoItem.querySelector('.location-checkbox');
        const labelElement = todoItem.querySelector('.location-label');
        const deleteButton = todoItem.querySelector('.delete-button');

        checkboxElement.addEventListener('change', () => {
            todo.completed = checkboxElement.checked;
            listItemElement.classList.toggle('completed', todo.completed);
            labelElement.style.textDecoration = todo.completed ? 'line-through' : 'none';
        });

        checkboxElement.setAttribute('name', todo.id);
        checkboxElement.setAttribute('id', todo.id);
        checkboxElement.checked = todo.completed;
        listItemElement.classList.toggle('completed', todo.completed);
        labelElement.style.textDecoration = todo.completed ? 'line-through' : 'none';

        labelElement.textContent = todo.text;
        labelElement.setAttribute('for', todo.id);

        deleteButton.addEventListener('click', () => {
            this.removeTodoItem(todo.id);
        });

        this.todoList.appendChild(todoItem);
    });
}
```

