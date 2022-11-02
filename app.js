
const form = document.querySelector('#new-task');
const input = document.querySelector('#new-task-input');
const list_el = document.querySelector('#tasks');

eventListeners();

function eventListeners() {
    form.addEventListener('submit', addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    list_el.addEventListener("click", toDoActions);
}

function addTodo(e) {
    e.preventDefault();

    const new_todo = input.value;
    if (!new_todo) {
        alert("Please fill out the task")
        return;
    } else {
        addIt(new_todo);
    }
    input.value = "";

}

function addIt(new_todo) {
    addTodoUI(new_todo);
    addTodoStorage(new_todo);
}

function clear() {

    let todos = getTodosFromStorage();
    todos = "";
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodoUI(new_todo) {
    //Buttons

    const todo_edit = document.createElement("input");
    todo_edit.classList.add("edit");
    todo_edit.type = "button";
    todo_edit.value = "edit";

    const todo_delete = document.createElement("input");
    todo_delete.classList.add("delete");
    todo_delete.type = "button";
    todo_delete.value = "delete";

    const todo_actions = document.createElement("div");
    todo_actions.classList.add("actions");

    todo_actions.appendChild(todo_edit);
    todo_actions.appendChild(todo_delete);

    //Text

    const todo_input = document.createElement("input");
    todo_input.classList.add("text");
    todo_input.value = new_todo;
    todo_input.setAttribute("readonly", "readonly");

    const todo_content = document.createElement("div");

    todo_content.classList.add("content");
    todo_content.appendChild(todo_input);

    //Merge

    const todo = document.createElement("div");
    todo.classList.add("todo");

    todo.appendChild(todo_content);
    todo.appendChild(todo_actions);

    list_el.appendChild(todo);


}

function toDoActions(e) {
    if (e.target.className === "delete") {
        deleteToDo(e);
    }
    else if (e.target.className === "edit") {
        editToDo(e);
    }
}

function deleteToDo(e) {

    e.target.parentElement.parentElement.remove();
    const text = e.target.parentElement.parentElement.children[0].children[0].value;

    let todos = getTodosFromStorage();

    todos.forEach(function (todo, index) {

        if (todo == text) {
            todos.splice(index, 1);
        }

    })
    localStorage.setItem("todos", JSON.stringify(todos));
    document.location.reload();
}

function editToDo(e) {

    if (e.target.value === "edit") {
        task_input = e.target.parentElement.parentElement.children[0].children[0];
        task_input.removeAttribute("readonly", "readonly");
        task_input.focus();
        old = task_input.value;
        e.target.value = "save";

    } else if (e.target.value === "save") {

        task_input.setAttribute("readonly", "readonly");


        text = task_input.value;

        let todos = getTodosFromStorage();
        for (let index = 0; index < localStorage.getItem("todos").length; index++) {
            if (todos[index] == old) {
                todos[index] = text;
                break;
            }

        }



        e.target.value = "edit";
        localStorage.setItem("todos", JSON.stringify(todos));


    }

}

function getTodosFromStorage() {

    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;

}
function addTodoStorage(new_todo) {
    let todos = getTodosFromStorage();

    todos.push(new_todo);

    localStorage.setItem("todos", JSON.stringify(todos));

}

function loadAllTodosToUI() {
    let todos = getTodosFromStorage();

    todos.forEach(function (todo) {
        addTodoUI(todo);
    })
}
// innerHTML ??