const todoInput = document.getElementById("todoInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const filterBtn = document.getElementById("filterBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const todoTable = document.getElementById("todoTable");

let todos = [];

function renderTodos(filter = false) {
  todoTable.innerHTML = "";

  const filtered = filter ? todos.filter(t => !t.completed) : todos;

  if (filtered.length === 0) {
    todoTable.innerHTML = `<tr><td colspan="4">No task found</td></tr>`;
    return;
  }

  filtered.forEach((todo, index) => {
    const row = document.createElement("tr");

    const taskCell = document.createElement("td");
    taskCell.textContent = todo.task;
    if (todo.completed) taskCell.classList.add("status-done");

    const dateCell = document.createElement("td");
    dateCell.textContent = todo.date;

    const statusCell = document.createElement("td");
    statusCell.textContent = todo.completed ? "Done" : "Pending";

    const actionsCell = document.createElement("td");
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "✓";
    toggleBtn.onclick = () => {
      todos[index].completed = !todos[index].completed;
      renderTodos();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.onclick = () => {
      todos.splice(index, 1);
      renderTodos();
    };

    actionsCell.appendChild(toggleBtn);
    actionsCell.appendChild(deleteBtn);

    row.appendChild(taskCell);
    row.appendChild(dateCell);
    row.appendChild(statusCell);
    row.appendChild(actionsCell);

    todoTable.appendChild(row);
  });
}

addBtn.onclick = () => {
  const task = todoInput.value.trim();
  const date = dateInput.value;

  if (!task || !date) {
    alert("Please enter both task and date.");
    return;
  }

  todos.push({ task, date, completed: false });
  todoInput.value = "";
  dateInput.value = "";
  renderTodos();
};

filterBtn.onclick = () => renderTodos(true);
deleteAllBtn.onclick = () => {
  if (confirm("Delete all tasks?")) {
    todos = [];
    renderTodos();
  }
};

renderTodos();
