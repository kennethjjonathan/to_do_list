const input = document.querySelector(".input");
const task_input = document.querySelector("#task-input");
const task_list = document.querySelector(".task-list");

const list_container = localStorage.getItem("list_container");

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

    // For the task
    const listed_task = document.createElement("input");
    listed_task.classList.add("textbox");
    listed_task.type = "text";
    listed_task.value = task;
    listed_task.setAttribute("readonly", "readonly");
    
    // For the buttons container
    const list_buttons = document.createElement("div");
    list_buttons.classList.add("list-buttons");
    // For the edit button
    const edit_button = document.createElement("button");
    edit_button.classList.add("button");
    edit_button.value = "edit";
    edit_button.innerHTML = "Edit";
    // For the resolve button
    const resolve_button = document.createElement("button");
    resolve_button.classList.add("button");
    resolve_button.value = "resolve";
    resolve_button.innerHTML = "Resolve";

    // For the list container 
    const list_container = document.createElement("div");
    list_container.classList.add("list-container");

    // For the recorded tasks
    const recorded_task = document.createElement("div");
    recorded_task.classList.add("recorded-task");

    // To make the input text empty again
    task_input.value = "";

    // To append the elements
    list_buttons.appendChild(edit_button);
    list_buttons.appendChild(resolve_button);
    recorded_task.appendChild(listed_task);
    list_container.appendChild(recorded_task);
    list_container.appendChild(list_buttons);
    task_list.appendChild(list_container);

    localStorage.setItem("list_container", list_container);

    list_container = localStorage.getItem("list_container");

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
    })

})