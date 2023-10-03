import "./styles.css";

const completeIcon = `
  <svg
  class="svg-check"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="currentColor"
  >
  <path
  fill-rule="evenodd"
  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
  />
  </svg>
`;

const deleteIcon = `
  <svg
  class="svg-delete"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  class="w-6 h-6"
  >
  <path
  stroke-linecap="round"
  stroke-linejoin="round"
  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
  />
  </svg>
`;

const todos = [
  {
    text: "Grocery Shop",
    completed: false,
  },
  {
    text: "Get Oil Changed",
    completed: false,
  },
  {
    text: "Vet Appointment",
    completed: false,
  },
  {
    text: "Birthday Present",
    completed: false,
  },
];

const filters = {
  searchText: "",
  hideCompleted: false,
};

const generateButton = function (icon) {
  const button = document.createElement("button");
  button.classList.add("todo-list-item-button");
  button.innerHTML = icon;

  return button;
};

const generateButtons = function () {
  const buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("todo-list-item-icons");
  const completeButton = generateButton(completeIcon);
  const deleteButton = generateButton(deleteIcon);

  buttonWrapper.appendChild(completeButton);
  buttonWrapper.appendChild(deleteButton);

  return buttonWrapper;
};

const renderTodos = function (todos, filters) {
  document.querySelector(".todo-list").innerHTML = "";

  todos.forEach(function (todo, index) {
    const todoEl = document.createElement("li");
    todoEl.classList.add("todo-list-item");
    todoEl.textContent = todo.text;
    const buttons = generateButtons(index);
    todoEl.appendChild(buttons);
    document.querySelector(".todo-list").appendChild(todoEl);
  });
};

renderTodos(todos, filters);

document
  .querySelector(".todo-commands")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    todos.push({
      text: e.target.elements.text.value,
      completed: false,
    });
    renderTodos(todos, filters);
    e.target.elements.text.value = "";
  });
