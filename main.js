const input = document.querySelector(".input");
const task_input = document.querySelector("#task-input");
const task_list = document.querySelector(".task-list");


const LOCAL_STORAGE_LIST_KEY = "task.list";

let taskList = JSON.parse(localStorage.getItem("task.list")) || [];

if (taskList != [])
{
    for (let i = 0; i < taskList.length; i++)
    {
        render(taskList[i]);
    }
}

input.addEventListener("submit", (e) =>
{
    // Prevent page reload after submit
    e.preventDefault();

    const task = task_input.value;

    if (task == "")
    {
        alert("Please put in a task");
        return;
    }

    taskList.push(task);

    console.log(taskList);

    task_input.value = "";

    render(task);
    save();

})

function save()
{
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(taskList));
}

function render(task)
{
    const listed_task = document.createElement("input");
    listed_task.classList.add("textbox");
    listed_task.type = "text";
    listed_task.id = "put-task";
    listed_task.value = task;
    listed_task.setAttribute("readonly", "readonly");
    
    const edit_button = document.createElement("button");
    edit_button.classList.add("button");
    edit_button.value = "edit";
    edit_button.id = "edit-task";
    edit_button.innerHTML = "Edit";
    
    const resolve_button = document.createElement("button");
    resolve_button.classList.add("button");
    resolve_button.value = "resolve";
    resolve_button.id = "resolve-task";
    resolve_button.innerHTML = "Resolve";
    
    const list_buttons = document.createElement("div");
    list_buttons.classList.add("list-buttons");
    list_buttons.appendChild(edit_button);
    list_buttons.appendChild(resolve_button);
    
    const recorded_task = document.createElement("div");
    recorded_task.classList.add("recorded-task");
    recorded_task.appendChild(listed_task);
    
    const list_container = document.createElement("div");
    list_container.classList.add("list-container");
    list_container.appendChild(recorded_task);
    list_container.appendChild(list_buttons);
    task_list.appendChild(list_container);

    edit_button.addEventListener("click", () =>
    {
        if (edit_button.innerHTML == "Edit")
        {
            listed_task.removeAttribute("readonly");
            listed_task.focus();
            edit_button.innerHTML = "Save";
        }
        else if (edit_button.innerHTML == "Save")
        {
            listed_task.setAttribute("readonly", "readonly");
            edit_button.innerHTML = "Edit";
        }
    })
        
    resolve_button.addEventListener("click", () =>
    {
        task_list.removeChild(list_container);
        const toDelete = JSON.parse(localStorage.getItem("task.list"));
        for (let i = 0; i < toDelete.length; i++)
        {
                if (task == toDelete[i])
                {
                    toDelete.splice(i, 1);
                    break;
                }
        }
        localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(toDelete));
    })
}