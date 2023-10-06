import "./styles.css";

let todos = getSavedTodos();

let deletedTodos = getDeletedTodos();

const filters = {
  searchText: "",
  hideCompleted: false,
};

renderTodos(todos, filters);

searchTodo.addEventListener("input", function (e) {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
  console.log(e.target.value);
});

addNewTodo.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!e.target.elements.text.value) {
    return;
  }
  todos.push({
    text: e.target.elements.text.value,
    completed: false,
  });

  saveTodos(todos);
  renderTodos(todos, filters);
  e.target.elements.text.value = "";
});

hideCompleted.addEventListener("change", function (e) {
  filters.hideCompleted = e.target.checked;

  renderTodos(todos, filters);

  if (e.target.checked) {
    hideCompleted.classList.add("hide-completed-label-active");
  } else if (!e.target.checked) {
    hideCompleted.classList.remove("hide-completed-label-active");
  }
});
