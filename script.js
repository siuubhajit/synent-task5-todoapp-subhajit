
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

  tasks.push({ text: text, done: false });
  input.value = "";
  render();
}






function render() {
  list.innerHTML = "";

  for (var i = 0; i < tasks.length; i++) {
    var li = document.createElement("li");
    if (tasks[i].done) li.classList.add("done");




    var check = document.createElement("input");
    check.type = "checkbox";
    check.checked = tasks[i].done;
    check.dataset.index = i;
    check.addEventListener("change", onToggleClick);

    var label = document.createElement("span");
    label.textContent = tasks[i].text;






    var del = document.createElement("button");
    del.textContent = "✕";
    del.className = "delete-btn";
    del.dataset.index = i;
    del.addEventListener("click", onDeleteClick);

    li.appendChild(check);
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





function onToggleClick(e) {
  var idx = Number(e.target.dataset.index);
  tasks[idx].done = e.target.checked;
  render();
}
