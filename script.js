const input = document.getElementById("input");
const ul_tasks = document.getElementById("ul-tasks");
const select = document.getElementById("select-task");
const btn_add = document.getElementById("btn-add");
var btn_edit = document.getElementById("btn-edit");
btn_edit.style.display = "none";
var edit_index = 0;

var json_tasks = [];
RenderTasks();

function AddTask() {
  const task = input.value.trim();
  if (task === "") return;

  const ii = { name: task, done: false };
  const str = localStorage.getItem("task-list");
  json_tasks = JSON.parse(str);
  if (json_tasks === null) json_tasks = [];
  json_tasks.push(ii);
  localStorage.setItem("task-list", JSON.stringify(json_tasks));
  input.value = "";
  RenderTasks();
}

function ToggleDone(index) {
  json_tasks[index].done = !json_tasks[index].done;
  localStorage.setItem("task-list", JSON.stringify(json_tasks));
  RenderTasks();
}
function DeleteTask(Element, index) {
  json_tasks.splice(index, 1);
  localStorage.setItem("task-list", JSON.stringify(json_tasks));
  RenderTasks();
}
function RenderTasks() {
  btn_edit.style.display = "none";
  btn_add.style.display = "inline";
  input.value = "";
  const str = localStorage.getItem("task-list");

  if (str === "") {
    return;
  } else {
    ul_tasks.innerHTML = "";
    json_tasks = JSON.parse(str);
    for (let i = 0; i < json_tasks.length; i++) {
      const li = document.createElement("li");
      const name = json_tasks[i].name;
      const done_status = json_tasks[i].done;
      if (
        done_status &&
        (select.value == "all" || select.value == "completed")
      ) {
        li.innerHTML = `<span class="task done" onclick="ToggleDone(${i})">${name}</span><span class="edit" onclick="EditTask(${i})">✎</span><span class="delete" onclick="DeleteTask(this,${i})">🗑</span>`;
        ul_tasks.appendChild(li);
      } else if (
        !done_status &&
        (select.value == "all" || select.value == "pending")
      ) {
        li.innerHTML = `<span class="task" onclick="ToggleDone(${i})">${name}</span><span class="edit" onclick="EditTask(${i})">✎</span><span class="delete" onclick="DeleteTask(this,${i})">🗑</span>`;
        ul_tasks.appendChild(li);
      }
    }
  }
}

function EditTask(index) {
  btn_edit.style.display = "inline";
  btn_add.style.display = "none";
  input.value = json_tasks[index].name;
  edit_index = index;
}
function EndEdit() {
  btn_edit.style.display = "none";
  btn_add.style.display = "inline";
  var text = input.value.trim();
  if (text === "") return;
  json_tasks[edit_index].name = text;
  localStorage.setItem("task-list", JSON.stringify(json_tasks));
  RenderTasks();
  input.value = "";
}
