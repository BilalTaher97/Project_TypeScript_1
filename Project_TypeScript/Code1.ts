interface Task {
    id: number;
    Title: string;
    States: string;
    StartDate: string;
    EndDate: string;
}

let TaskList = document.getElementById('_Data') as HTMLTableSectionElement;
let TaskForm = document.getElementById("Task_Form") as HTMLFormElement;
let Update = document.getElementById("Edit_Task");
document.addEventListener("DOMContentLoaded", loadTasks);

if (TaskForm) {
    TaskForm.addEventListener("submit", function (event: Event) {
        event.preventDefault();

        const Title_1 = (document.getElementById("title") as HTMLInputElement).value.trim();
        const States_1 = (document.getElementById("states") as HTMLInputElement).value.trim();
        const StartDate_1 = (document.getElementById("startdate") as HTMLInputElement).value;
        const EndDate_1 = (document.getElementById("endtdate") as HTMLInputElement).value;

        const taskIdToEdit = parseInt((document.getElementById("taskId") as HTMLInputElement).value); 

        let tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');

        if (taskIdToEdit) {
     
            let taskIndex = -1;
            for (let i = 0; i < tasks.length; i++) {
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
            
                (document.getElementById("taskId") as HTMLInputElement).value = '';
                // console.log("taskIdToEdit:", taskIdToEdit);
                // console.log("Existing IDs:", tasks.map(t => t.id));
            } else {
                console.log("Task not found!");
            }
        } else {
     
            let newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
            const newTask: Task = {
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


function loadTasks(): void {
    displayTasks();
}

function getTasksFromStorage(): Task[] {
    try {
        const storedData = localStorage.getItem("tasks");
        return storedData ? JSON.parse(storedData) as Task[] : [];
    } catch (error) {
        console.error("Error parsing tasks from storage:", error);
        return [];
    }
}

function displayTasks(): void {
    TaskList.innerHTML = "";  

    const tasks: Task[] = getTasksFromStorage();

    tasks.forEach((T) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${T.id}</td>
            <td>${T.Title}</td>
            <td>${T.States}</td>
            <td>${T.StartDate}</td>
            <td>${T.EndDate}</td>
            <td><button class="edit-btn" data-id="${T.id}">Edit</button></td>
            <td><button class="Det_Task" data-id="${T.id}">Delete</button></td>
        `;
        TaskList.appendChild(row);
    });

    attachEventListeners(); // ✅ استدعاء إعادة تعيين الأحداث بعد كل تحديث للجدول

    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", function(this: HTMLButtonElement) {
            const taskId = parseInt(this.getAttribute("data-id") || "0");
            console.log(taskId);
    
            const tasks: Task[] = getTasksFromStorage();
            const filteredTasks = tasks.filter(task => task.id === taskId);
    
            if (filteredTasks.length > 0) {
                const taskToEdit = filteredTasks[0]; 
    
                (document.getElementById("title") as HTMLInputElement).value = taskToEdit.Title;
                (document.getElementById("states") as HTMLInputElement).value = taskToEdit.States;
                (document.getElementById("startdate") as HTMLInputElement).value = taskToEdit.StartDate;
                (document.getElementById("endtdate") as HTMLInputElement).value = taskToEdit.EndDate;
    
                (document.getElementById("taskId") as HTMLInputElement).value = taskToEdit.id.toString();
            } else {
                console.log("Task not found!");
            }
        });
    });
}


function attachEventListeners() {
    document.querySelectorAll(".Det_Task").forEach(button => {
        button.addEventListener("click", function(this: HTMLButtonElement) {
            const taskId = parseInt(this.getAttribute("data-id") || "0");
            console.log("Deleting task with ID:", taskId);

            let tasks: Task[] = getTasksFromStorage();
            tasks = tasks.filter(task => task.id !== taskId);

            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks(); 
        });
    });
}

document.addEventListener("DOMContentLoaded", displayTasks); 


