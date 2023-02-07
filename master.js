let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];

if (window.localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};

tasksDiv.addEventListener("click", function (e) {
  if (e.target.classList.contains("del")) {
    removeTaskFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("task")) {
    changeStatueOfTask(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
  if (e.target.classList.contains("comp_all")) {
    changeAllStatue();
    document.querySelectorAll(".task").forEach(function (task) {
      task.classList.add("done");
    });
  }

  if (e.target.classList.contains("del_all")) {
    window.localStorage.removeItem("tasks");
    arrayOfTasks = [];
    tasksDiv.innerHTML = "Designed By Youssef Elewa";
  }
});

function addTaskToArray(taskText) {
  let task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arrayOfTasks.push(task);
  addTaskToPageFrom(arrayOfTasks);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addTaskToPageFrom(arrayOfTasks) {
  tasksDiv.innerHTML = "";

  let remote = document.createElement("div");
  remote.classList.add("remote");

  let completeAll = document.createElement("span");
  completeAll.classList.add("comp_all");
  completeAll.textContent = `Complete All`;
  remote.appendChild(completeAll);

  let deleteAll = document.createElement("span");
  deleteAll.classList.add("del_all");
  deleteAll.textContent = `Clear`;
  remote.appendChild(deleteAll);

  tasksDiv.append(remote);

  arrayOfTasks.forEach(function (task) {
    let div = document.createElement("div");
    div.classList.add("task");
    if (task.completed) {
      div.classList.add("done");
    }
    div.setAttribute("data-id", task.id);
    div.textContent = `${task.title}`;
    let span = document.createElement("span");
    span.classList.add("del");
    span.textContent = `Delete`;
    div.appendChild(span);
    tasksDiv.appendChild(div);
  });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addTaskToPageFrom(tasks);
  }
}

function removeTaskFromLocalStorage(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => taskId != task.id);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function changeStatueOfTask(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      if (arrayOfTasks[i].completed == false) {
        arrayOfTasks[i].completed = true;
      } else {
        arrayOfTasks[i].completed = false;
      }
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}

function changeAllStatue() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
      arrayOfTasks[i].completed = true;
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}
