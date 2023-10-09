import "./styles.css";

const todos = getSavedTodos();

const filters = {
  searchText: "",
  hideCompleted: false,
};

// Update object value and save to local storage
const completeTodo = function (index) {
  const todo = todos.find((todo, i) => index === i);
  todo.completed = true;
  saveTodos(todos);
};

// update deletedTodos array in local storage, Needs to remove from todos
// update the object structure to include a "deleted" property and renderTodos including this when true
// get rid of the deletedTodos array when adding this property. It will not be needed
const deleteTodo = function (index) {
  let removeTodo = todos.splice(index, 1);
  deletedTodos.push(removeTodo[0]);

  saveDeletedTodos(deletedTodos);

  saveTodos(todos);
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

renderTodos(todos, filters);

searchTodo.addEventListener("input", function (e) {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

addNewTodo.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!e.target.elements.text.value) {
    return;
  }
  todos.push({
    text: e.target.elements.text.value,
    completed: false,
    isDeleted: false,
  });

  saveTodos(todos);
  renderTodos(todos, filters);
  e.target.elements.text.value = "";
});

hideCompleted.addEventListener("change", function (e) {
  filters.hideCompleted = e.target.checked;

  renderTodos(todos, filters);

  if (e.target.checked) {
    hideCompleted.classList.add("button-active");
  } else if (!e.target.checked) {
    hideCompleted.classList.remove("button-active");
  }
});

showAllTodos.addEventListener("click", () => renderTodos(todos, filters));

showDeletedTodos.addEventListener("click", () =>
  renderTodos(deletedTodos, filters),
);

showCompletedTodos.addEventListener("click", function (e) {
  const completedTodos = todos.filter(function (todo) {
    return todo.completed;
  });
  renderTodos(completedTodos, filters);
});
