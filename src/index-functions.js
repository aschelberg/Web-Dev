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
const saveDeletedTodos = function (deletedTodos, todos) {
  localStorage.setItem("deletedTodos", JSON.stringify(deletedTodos));
};

// Generate the DOM structure for a todo item
// const generateTodoDOM

// Update object value and save to local storage
const completeTodo = function (index) {
  const todo = todos.find((todo, i) => index === i);
  todo.completed = true;
  saveTodos(todos);
};

// update deletedTodos array in local storage, Needs to remove from todos
const deleteTodo = function (index) {
  const removeTodo = todos.splice(index, 1);
  deletedTodos.push(removeTodo);
  saveDeletedTodos(deletedTodos);
  renderTodos(todos, filters);
};

// generate individual button for list item
const generateButton = function (icon) {
  const button = document.createElement("button");
  button.classList.add("todo-list-item-button");
  button.innerHTML = icon;

  return button;
};

// generates both buttons and adds to new todo list item
const generateButtons = function (index) {
  const buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("todo-list-item-icons");
  const completeButton = generateButton(completeIcon);
  const deleteButton = generateButton(deleteIcon);

  completeButton.addEventListener("click", function () {
    completeTodo(index);
  });
  deleteButton.addEventListener("click", function () {
    deleteTodo(index);
  });

  buttonWrapper.appendChild(completeButton);
  buttonWrapper.appendChild(deleteButton);

  return buttonWrapper;
};

// Generate DOM structure for todo list item
const generateTodoDOM = function (todo, index) {
  const todoEl = document.createElement("li");
  todoEl.classList.add("todo-list-item");
  todoEl.textContent = todo.text;
  const buttons = generateButtons(index);
  todoEl.appendChild(buttons);
  return todoEl;
};

// Render todos based on filters
const renderTodos = function (todos, filters) {
  const filteredTodos = todos.filter(function (todo) {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  document.querySelector(".todo-list").innerHTML = "";

  filteredTodos.forEach(function (todo, index) {
    document
      .querySelector(".todo-list")
      .appendChild(generateTodoDOM(todo, index));
  });
};
