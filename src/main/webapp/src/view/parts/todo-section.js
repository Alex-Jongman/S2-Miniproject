export class TodoSection {
    constructor() {
        this.todoForm = document.querySelector('#todo-form');
        this.todoList = document.querySelector('.todo-list');
        this.todoItemTemplate = document.querySelector('#todo-item-template');

        this.todos = [];

        this.todoForm.addEventListener('submit', this.addTodo.bind(this));
    }

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

    render() {
        // Clear the existing list
        this.todoList.innerHTML = '';

        console.log('Rendering todos:', this.todos);
        // Render each todo item
        this.todos.forEach(todo => {
            const todoItem = this.todoItemTemplate.content.cloneNode(true);
            const checkboxElement = todoItem.querySelector('.location-checkbox');
            const labelElement = todoItem.querySelector('.location-label');
            const deleteButton = todoItem.querySelector('.delete-button');

            checkboxElement.addEventListener('change', () => {
                todo.completed = checkboxElement.checked;
            });

            checkboxElement.setAttribute('name', todo.id);
            checkboxElement.setAttribute('id', todo.id);
            checkboxElement.checked = todo.completed;

            labelElement.textContent = todo.text;
            labelElement.setAttribute('for', todo.id);

            deleteButton.addEventListener('click', () => {
                this.removeTodoItem(todo.id);
            });

            this.todoList.appendChild(todoItem);
        });
    }
}



