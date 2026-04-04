# Arrays

TODO:

```javascript
export class TodoSection {
    constructor() {
        this.todoForm = document.querySelector('#todo-form');
        this.todoList = document.querySelector('.todo-list');
        this.todoItemTemplate = document.querySelector('#todo-item-template');

        this.todos = [];

        this.todoForm.addEventListener('submit', this.addTodo.bind(this));
    }
...
```

```javascript
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

removeTodoItem(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.render();
}
```