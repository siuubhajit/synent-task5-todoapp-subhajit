
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

    var label = document.createElement("span");
    label.textContent = tasks[i].text;



    var del = document.createElement("button");
    del.textContent = "✕";
    del.className = "delete-btn";
    del.dataset.index = i;
    del.addEventListener("click", onDeleteClick);


    li.appendChild(label);
    li.appendChild(del);
    list.appendChild(li);
  }
}



function onDeleteClick(e) {
  var idx = Number(e.target.dataset.index);
  tasks.splice(idx, 1);
  render();
}

