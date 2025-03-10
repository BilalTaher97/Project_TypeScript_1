var TaskList = document.getElementById('_Data');
var TaskForm = document.getElementById("Task_Form");
var Update = document.getElementById("Edit_Task");
document.addEventListener("DOMContentLoaded", loadTasks);
if (TaskForm) {
    TaskForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var Title_1 = document.getElementById("title").value.trim();
        var States_1 = document.getElementById("states").value.trim();
        var StartDate_1 = document.getElementById("startdate").value;
        var EndDate_1 = document.getElementById("endtdate").value;
        var taskIdToEdit = parseInt(document.getElementById("taskId").value);
        var tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        if (taskIdToEdit) {
            var taskIndex = -1;
            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].id === taskIdToEdit) {
                    taskIndex = i;
                    break;
                }
            }
            if (taskIndex !== -1) {
                tasks[taskIndex] = {
                    id: taskIdToEdit,
                    Title: Title_1,
                    States: States_1,
                    StartDate: StartDate_1,
                    EndDate: EndDate_1
                };
                localStorage.setItem("tasks", JSON.stringify(tasks));
                displayTasks();
                TaskForm.reset();
                document.getElementById("taskId").value = '';
                // console.log("taskIdToEdit:", taskIdToEdit);
                // console.log("Existing IDs:", tasks.map(t => t.id));
            }
            else {
                console.log("Task not found!");
            }
        }
        else {
            var newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
            var newTask = {
                id: newId,
                Title: Title_1,
                States: States_1,
                StartDate: StartDate_1,
                EndDate: EndDate_1
            };
            tasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
            TaskForm.reset();
        }
    });
}
function loadTasks() {
    displayTasks();
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
function displayTasks() {
    TaskList.innerHTML = "";
    var tasks = getTasksFromStorage();
    tasks.forEach(function (T) {
        var row = document.createElement("tr");
        row.innerHTML = "\n            <td>".concat(T.id, "</td>\n            <td>").concat(T.Title, "</td>\n            <td>").concat(T.States, "</td>\n            <td>").concat(T.StartDate, "</td>\n            <td>").concat(T.EndDate, "</td>\n            <td><button class=\"edit-btn\" data-id=\"").concat(T.id, "\">Edit</button></td>\n            <td><button class=\"Det_Task\" data-id=\"").concat(T.id, "\">Delete</button></td>\n        ");
        TaskList.appendChild(row);
    });
    attachEventListeners(); // ✅ استدعاء إعادة تعيين الأحداث بعد كل تحديث للجدول
    document.querySelectorAll(".edit-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            var taskId = parseInt(this.getAttribute("data-id") || "0");
            console.log(taskId);
            var tasks = getTasksFromStorage();
            var filteredTasks = tasks.filter(function (task) { return task.id === taskId; });
            if (filteredTasks.length > 0) {
                var taskToEdit = filteredTasks[0];
                document.getElementById("title").value = taskToEdit.Title;
                document.getElementById("states").value = taskToEdit.States;
                document.getElementById("startdate").value = taskToEdit.StartDate;
                document.getElementById("endtdate").value = taskToEdit.EndDate;
                document.getElementById("taskId").value = taskToEdit.id.toString();
            }
            else {
                console.log("Task not found!");
            }
        });
    });
}
function attachEventListeners() {
    document.querySelectorAll(".Det_Task").forEach(function (button) {
        button.addEventListener("click", function () {
            var taskId = parseInt(this.getAttribute("data-id") || "0");
            console.log("Deleting task with ID:", taskId);
            var tasks = getTasksFromStorage();
            tasks = tasks.filter(function (task) { return task.id !== taskId; });
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
        });
    });
}
document.addEventListener("DOMContentLoaded", displayTasks);
