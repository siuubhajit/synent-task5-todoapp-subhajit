# To-Do List Web App

A small task manager built with plain HTML, CSS, and JavaScript. No framework,
no build step, no dependencies.

## Features

- Add a task (Enter key or the Add button)
- Delete a task
- Mark a task complete (strikethrough)
- Remaining-task counter and a "Clear completed" action
- Filter view: All / Active / Completed
- Tasks persist across refresh via `localStorage`, stored as CSV

## Storage format

Tasks are kept in `localStorage` under the key `todo-tasks-csv` as a CSV
string:

```
id,text,done
1732200000000,Buy groceries,false
1732200004321,Finish assignment,true
```

Task text is quoted (with doubled internal quotes) whenever it contains a
comma, quote, or newline, so ordinary CSV escaping rules apply if you want to
edit the stored value by hand in devtools.

## Files

```
.
├── index.html
├── style.css
├── script.js
└── README.md
```

## Running it

Open `index.html` in a browser — that's it.
