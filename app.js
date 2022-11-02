// Global Değişkenler
const form = document.querySelector('#new-task');
const input = document.querySelector('#new-task-input');
const list_el = document.querySelector('#tasks');

counter = 0;

eventListeners();

function eventListeners() {
    form.addEventListener('submit', checkToDo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    list_el.addEventListener("click", toDoActions);
}


//ToDo ekleme
function checkToDo(e) {
    e.preventDefault();

    const new_todo = input.value;

    //ToDo text dolu mu kontrolü
    if (!new_todo) {
        alert("Please fill out the task")
        return;
    } else {
        addToDo(new_todo);
    }

    //ToDo eklendikten sonra text inputu temizlemek
    input.value = "";

}

// ToDo ekleme
function addToDo(new_todo) {
    addTodoUI(new_todo);
    addTodoStorage(new_todo);
}

function addTodoUI(new_todo) {
    //Görsel Olarak ToDo ekleme


    //Butonlar

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

    //Birleştir

    const todo = document.createElement("div");
    todo.classList.add("todo");
    todo.setAttribute("id", counter);
    todo.appendChild(todo_content);
    todo.appendChild(todo_actions);


    //list_el 'e ekle (görünmesi için gereken adım)
    list_el.appendChild(todo);
    counter++;

}

//ToDo buttonlarının görevleri
function toDoActions(e) {
    if (e.target.className === "delete") {
        deleteToDo(e);
    }
    else if (e.target.className === "edit") {
        editToDo(e);
    }
}


//ToDo silme
function deleteToDo(e) {
    //ToDo 'yu görsel olarak sil
    e.target.parentElement.parentElement.remove();


    const willBeDelete = e.target.parentElement.parentElement.id.id;

    let todos = getTodosFromStorage();

    //ToDo yu Localden sil
    todos.splice(willBeDelete, 1);

    localStorage.setItem("todos", JSON.stringify(todos));

    //Counterin sıfırlanıp idlerin tekrar atanması için reload 
    //sadece daha iyi bir yol bulana kadar :)
    document.location.reload();
}


//ToDo Düzenle
function editToDo(e) {
    //Buton switch mantığı ile kullanılıyor

    if (e.target.value === "edit") {
        //Görsel olarak düzenle
        task_input = e.target.parentElement.parentElement.children[0].children[0];
        task_input.removeAttribute("readonly", "readonly");
        task_input.focus();
        old = task_input.value;
        e.target.value = "save";

    } else if (e.target.value === "save") {
        //düzenleme bitti local storage kaydet

        task_input.setAttribute("readonly", "readonly");
        const willBeEdit = e.target.parentElement.parentElement.id;

        text = task_input.value;

        let todos = getTodosFromStorage();

        todos[willBeEdit] = text;



        e.target.value = "edit";
        localStorage.setItem("todos", JSON.stringify(todos));


    }

}


//local storage de bulunan ToDo ları varsa al yoksa boş array oluştur
function getTodosFromStorage() {

    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;

}

//ToDo ları storage ekle
function addTodoStorage(new_todo) {
    let todos = getTodosFromStorage();

    todos.push(new_todo);

    localStorage.setItem("todos", JSON.stringify(todos));

}

//ToDo ları görsel olarak ekle
function loadAllTodosToUI() {
    let todos = getTodosFromStorage();

    todos.forEach(function (todo) {
        addTodoUI(todo);
    })
}
