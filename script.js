// in-memory task list for now — persistence comes later
var tasks = [];

var input = document.getElementById("taskInput");
var addBtn = document.getElementById("addBtn");
var list = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

function addTask() {
  var text = input.value.trim();
  if (!text) {
    return;
  }

  tasks.push({ text: text });
  input.value = "";
  render();
}

function render() {
  list.innerHTML = "";

  for (var i = 0; i < tasks.length; i++) {
    var li = document.createElement("li");
    li.textContent = tasks[i].text;
    list.appendChild(li);
  }
}
