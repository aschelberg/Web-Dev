// Read existing todos from local storage
const getSavedTodos = function () {
  const todosJSON = localStorage.getItem("todos");
  if (todosJSON !== null) {
    return JSON.parse(todosJSON);
  } else {
    return [];
  }
};

// Read existing todos from local storage
const getDeletedTodos = function () {
  const deletedTodosJSON = localStorage.getItem("deletedTodos");
  if (deletedTodosJSON !== null) {
    return JSON.parse(deletedTodosJSON);
  } else {
    return [];
  }
};

// Save the todos to local storage
const saveTodos = function (todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Save deleted todos to local storage
const saveDeletedTodos = function (deletedTodos) {
  localStorage.setItem("deletedTodos", JSON.stringify(deletedTodos));
};

// Generate DOM structure for todo list item
// const generateTodoDOM = function (todo, index) {
//   const todoEl = document.createElement("li");
//   todoEl.classList.add("todo-list-item");
//   todoEl.textContent = todo.text;
//   const buttons = generateButtons(index);
//   todoEl.appendChild(buttons);
//   return todoEl;
// };
