
var STORAGE_KEY = "todo-tasks-csv";

var tasks = loadTasks();

var input = document.getElementById("taskInput");
var addBtn = document.getElementById("addBtn");
var list = document.getElementById("taskList");
var counter = document.getElementById("counter");
var clearDoneBtn = document.getElementById("clearDoneBtn");




addBtn.addEventListener("click", addTask);
clearDoneBtn.addEventListener("click", clearCompleted);




input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") addTask();
});

render();

function addTask() {
  var text = input.value.trim();
  if (!text) {
    return;
  }




  tasks.push({ id: Date.now(), text: text, done: false });
  input.value = "";
  render();
  saveTasks();
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

  var remaining = tasks.filter(function (t) { return !t.done; }).length;
  counter.textContent = remaining + (remaining === 1 ? " task left" : " tasks left");
}

function clearCompleted() {
  tasks = tasks.filter(function (t) { return !t.done; });
  render();
  saveTasks();
}

function onDeleteClick(e) {
  var idx = Number(e.target.dataset.index);
  tasks.splice(idx, 1);
  render();
  saveTasks();
}

function onToggleClick(e) {
  var idx = Number(e.target.dataset.index);
  tasks[idx].done = e.target.checked;
  render();
  saveTasks();
}








function csvEscape(value) {
  var str = String(value);
  if (/[",\n]/.test(str)) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

function tasksToCSV(list) {
  var rows = ["id,text,done"];
  list.forEach(function (t) {
    rows.push([t.id, csvEscape(t.text), t.done].join(","));
  });
  return rows.join("\n");
}

function csvToTasks(csv) {
  var lines = csv.split("\n").filter(function (l) { return l.trim().length; });
  lines.shift(); 

  return lines.map(function (line) {
    var fields = parseCSVLine(line);
    return {
      id: Number(fields[0]),
      text: fields[1],
      done: fields[2] === "true"
    };
  });
}




function parseCSVLine(line) {
  var fields = [];
  var current = "";
  var inQuotes = false;

  for (var i = 0; i < line.length; i++) {
    var ch = line[i];


    if (inQuotes) {
      
      if (ch === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } 
      else if (ch === '"') {
        inQuotes = false;
      } 
      else {
        current += ch;
      }
    } 
    else if (ch === '"') {
      inQuotes = true;
    } 
    else if (ch === ",") {
      fields.push(current);
      current = "";
    } 
    else {
      current += ch;
    }
  }

  fields.push(current);
  return fields;
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, tasksToCSV(tasks));
}






function loadTasks() {
  var raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  return csvToTasks(raw);
}
