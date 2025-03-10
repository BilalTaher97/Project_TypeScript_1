interface Task {
    id: number;
    Title: string;
    States: string;
    StartDate: string;
    EndDate: string;
}


let Task_Form = (document.getElementById('Task_Form') as HTMLFormElement);

document.addEventListener('DOMContentLoaded',loadAllTasks);


if(Task_Form)
{

    Task_Form.addEventListener('submit',function(event:Event){
        event.preventDefault();
       

        const Title_1 = (document.getElementById('title') as HTMLInputElement).value.trim();
        const States_1 = (document.getElementById('states') as HTMLInputElement).value.trim();
        const StartDate_1 = (document.getElementById('startdate') as HTMLInputElement).value.trim();
        const EndDate_1 = (document.getElementById('endtdate') as HTMLInputElement).value.trim();

        let tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
        let newId = 1;
        newId =  tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

        let _Task : Task = {

            id:newId,
            Title:Title_1,
            States:States_1,
            StartDate:StartDate_1,
            EndDate:EndDate_1
        }
        tasks.push(_Task);
        localStorage.setItem('tasks',JSON.stringify(tasks))
        Task_Form.reset();
        displayAllTask()
    })

     

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

let Table_Data = (document.getElementById('_Data')as HTMLSelectElement);

function displayAllTask() : void
{

    Table_Data.innerHTML = '';

    let tasks: Task[] = getTasksFromStorage();
    
    tasks.forEach(T => {

        let row = document.createElement('tr');

        row.innerHTML = `
        <td>${T.id}</td>
        <td>${T.Title}</td>
        <td>${T.States}</td>
        <td>${T.StartDate}</td>
        <td>${T.EndDate}</td>
        <td><button class="edit-btn" data-id="${T.id}">Edit</button></td>
        <td><button class="Det_Task" data-id="${T.id}">Delete</button></td>
        `;

        Table_Data.appendChild(row);


    })
    
    Delete();
}


function loadAllTasks() : void
{
    displayAllTask();
}



function Delete() : void{

    document.querySelectorAll('.Det_Task').forEach(button => {
        
        button.addEventListener("click",function(this: HTMLButtonElement)
    {
        const task_Id = parseInt(this.getAttribute('data-id') || "0");
        let All_Tasks: Task[] = getTasksFromStorage();

        All_Tasks = All_Tasks.filter(task => task.id !== task_Id);
        localStorage.setItem('tasks',JSON.stringify(All_Tasks));
        displayAllTask();
    })
   
    })
}



document.addEventListener('DOMContentLoaded',displayAllTask);