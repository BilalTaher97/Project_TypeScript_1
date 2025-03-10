var Task_Form = document.getElementById('Task_Form');
document.addEventListener('DOMContentLoaded', loadAllTasks);
if (Task_Form) {
    Task_Form.addEventListener('submit', function (event) {
        event.preventDefault();
        var Title_1 = document.getElementById('title').value.trim();
        var States_1 = document.getElementById('states').value.trim();
        var StartDate_1 = document.getElementById('startdate').value.trim();
        var EndDate_1 = document.getElementById('endtdate').value.trim();
        var tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        var newId = 1;
        newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
        var _Task = {
            id: newId,
            Title: Title_1,
            States: States_1,
            StartDate: StartDate_1,
            EndDate: EndDate_1
        };
        tasks.push(_Task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        Task_Form.reset();
        displayAllTask();
    });
}
function getTasksFromStorage() {
    try {
        var storedData = localStorage.getItem("tasks");
        return storedData ? JSON.parse(storedData) : [];
    }
    catch (error) {
        console.error("Error parsing tasks from storage:", error);
        return [];
    }
}
var Table_Data = document.getElementById('_Data');
function displayAllTask() {
    Table_Data.innerHTML = '';
    var tasks = getTasksFromStorage();
    tasks.forEach(function (T) {
        var row = document.createElement('tr');
        row.innerHTML = "\n        <td>".concat(T.id, "</td>\n        <td>").concat(T.Title, "</td>\n        <td>").concat(T.States, "</td>\n        <td>").concat(T.StartDate, "</td>\n        <td>").concat(T.EndDate, "</td>\n        <td><button class=\"edit-btn\" data-id=\"").concat(T.id, "\">Edit</button></td>\n        <td><button class=\"Det_Task\" data-id=\"").concat(T.id, "\">Delete</button></td>\n        ");
        Table_Data.appendChild(row);
    });
    Delete();
}
function loadAllTasks() {
    displayAllTask();
}
function Delete() {
    document.querySelectorAll('.Det_Task').forEach(function (button) {
        button.addEventListener("click", function () {
            var task_Id = parseInt(this.getAttribute('data-id') || "0");
            var All_Tasks = getTasksFromStorage();
            All_Tasks = All_Tasks.filter(function (task) { return task.id !== task_Id; });
            localStorage.setItem('tasks', JSON.stringify(All_Tasks));
            displayAllTask();
        });
    });
}
document.addEventListener('DOMContentLoaded', displayAllTask);
