const mainTodoElem = document.querySelector(".todo-lists-elem");
const inputValue = document.getElementById("inputValue");
const addBtn = document.querySelector(".btn");

inputValue.focus();

const addCard = (todo, index) => {
  let card = `<div class="todo-item">
                <div class="main_todo_div">${todo}</div>
                <button class="delete" data-index="${index}">Delete</button>
            </div>`;

  mainTodoElem.innerHTML += card;
};

const addTodoList = () => {
  const todo = inputValue.value.trim();

  if (todo == "") {
    alert("Please add some task!!");
    return;
  }

  let localTodoLists = JSON.parse(localStorage.getItem("localTodoLists")) || [];

  // Check for duplicate
    if (localTodoLists.includes(todo)) {

        alert("This task already exists!");

        inputValue.value = "";
        inputValue.focus();

        return;
    }

  // if (!Array.isArray(localTodoLists)) {
  //   localTodoLists = [];
  // }

  localTodoLists.push(todo);

  localStorage.setItem("localTodoLists", JSON.stringify(localTodoLists));

  // console.log(localTodoLists);

  showTodoList();

  inputValue.value = "";
  inputValue.focus();
};

function addDeleteEvents() {
  const deleteButtons = document.querySelectorAll(".delete");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let localTodoLists =
        JSON.parse(localStorage.getItem("localTodoLists")) || [];

      const index = Number(button.dataset.index);

      localTodoLists.splice(index, 1);

      if (localTodoLists.length === 0) {
        localStorage.removeItem("localTodoLists");
      } else {
        localStorage.setItem("localTodoLists", JSON.stringify(localTodoLists));
      }

      showTodoList();
    });
  });
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTodoList(e);
});

const showTodoList = () => {
  let localTodoLists = JSON.parse(localStorage.getItem("localTodoLists")) || [];

  mainTodoElem.innerHTML = "";

  localTodoLists.forEach((todo, index) => {
    addCard(todo, index);
  });

  addDeleteEvents();
};

showTodoList();
